import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearInboxNotifications,
  clearSentNotifications,
  removeNotification,
} from "../features/notification/notificationSlice";
import { logoutUser } from "../features/auth/authSlice";
import socket from "../socket/socket";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import SocketListener from "../socket/SocketListener";

const ProtectedLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notifications } = useSelector((state) => state.notification);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleNotificationClick = (notification) => {
    dispatch(removeNotification(notification.id));

    if (
      notification.type === "mail:new" ||
      notification.type === "mail:reply"
    ) {
      navigate(`/${notification.mailId}`);
    }

    setShowNotifications(false);
  };
  const handleLogout = async () => {
    await dispatch(logoutUser());
    socket.disconnect();
    setShowSidebar(false);
    navigate("/login");
  };
  const inbox = useSelector((state) => state.mail.inbox);
  const { user } = useSelector((state) => state.auth);

  const navClass = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const inboxBadge = notifications.filter((n) => n.target === "inbox").length;

  const sentBadge = notifications.filter((n) => n.target === "sent").length;
  return (
    <>
      <SocketListener />
      <div className="flex min-h-screen bg-gray-100 font-sans ">
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}
        <aside
          className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg transform
transition-transform duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"} `}
        >
          <h3 className="text-2xl font-semibold mb-8 text-blue-300">
            Mail Box Client
          </h3>
          <nav className="flex-grow">
            <ul className="space-y-6 text-lg">
              <li>
                <NavLink
                  to="/compose"
                  className={navClass}
                  onClick={() => {
                    setShowSidebar(false);
                  }}
                >
                  Compose
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/inbox"
                  className={navClass}
                  onClick={() => {
                    dispatch(clearInboxNotifications());
                    setShowSidebar(false);
                  }}
                >
                  <div className="flex justify-between w-full">
                    <span> Inbox</span>

                    {inboxBadge > 0 && (
                      <span className="bg-red-500 text-white rounded-full px-2 text-xs">
                        {inboxBadge}
                      </span>
                    )}
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sent"
                  className={navClass}
                  onClick={() => {
                    dispatch(clearSentNotifications());
                    setShowSidebar(false);
                  }}
                >
                  <div className="flex justify-between w-full">
                    <span>Sent </span>

                    {sentBadge > 0 && (
                      <span className="bg-blue-600 text-white rounded-full px-2 text-xs">
                        {sentBadge}
                      </span>
                    )}
                  </div>
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="mt-auto pt-6 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-h-0">
          <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(true)}
                className="md:hidden flex flex-col justify-center gap-1.5 p-2 rounded hover:bg-gray-100 transition"
              >
                <div className="w-6 h-0.5 bg-gray-800 rounded-full"></div>
                <div className="w-6 h-0.5 bg-gray-800 rounded-full"></div>
                <div className="w-6 h-0.5 bg-gray-800 rounded-full"></div>
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  Your Mailbox
                </h1>
                <span className="text-gray-600 text-sm break-all">
                  {user?.email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications((prev) => !prev)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
                    />
                  </svg>

                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 rounded-xl bg-white shadow-xl border z-50">
                    <div className="p-1 font-semibold ml-2">Notifications</div>

                    {notifications.length === 0 ? (
                      <div className="p-5 text-sm text-gray-500">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className="w-full text-left p-4 hover:bg-gray-50 border-b"
                        >
                          <p className="font-semibold">
                            {notification.type === "mail:new"
                              ? " New Mail"
                              : " New Reply"}
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            {notification.senderEmail}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {notification.subject}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            {new Date(
                              notification.createdAt,
                            ).toLocaleTimeString()}
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-0 md:p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedLayout;
