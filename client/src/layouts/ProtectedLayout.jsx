import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import socket from "../socket/socket";
import { NavLink } from "react-router-dom";
const ProtectedLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    socket.disconnect();
    navigate("/login");
  };
  const inbox = useSelector((state) => state.mail.inbox);
  const unreadCount = inbox.filter((mail) => !mail.isReadByRecipient).length;
  const { user } = useSelector((state) => state.auth);

  const navClass = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg sticky top-0 h-screen">
        <h3 className="text-2xl font-semibold mb-8 text-blue-300">
          Mail Client
        </h3>
        <nav className="flex-grow">
          <ul className="space-y-6 text-lg">
            <li>
              <NavLink to="/compose" className={navClass}>
                Compose
              </NavLink>
            </li>
            <li>
              <NavLink to="/inbox" className={navClass}>
                Inbox
              </NavLink>
            </li>
            <li>
              <NavLink to="/sent" className={navClass}>
                Sent Mail
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
          <h1 className="text-xl font-semibold text-gray-800">Your Mailbox</h1>
          <div className="flex items-center gap-4">
            <button className="relative text-xl">
          
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-[10px] min-w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-medium">{user?.username || user?.email}</p>

                <p className="text-xs text-gray-500">Welcome back</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
