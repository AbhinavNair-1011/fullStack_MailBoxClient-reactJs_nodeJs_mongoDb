import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg">
        <h3 className="text-2xl font-semibold mb-8 text-blue-300">
          Mail Client
        </h3>
        <nav className="flex-grow">
          <ul className="space-y-3">
            <li>
              <Link
           to="/dashboard"
                className="block px-4 py-2 rounded-md text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/inbox"
             className="block px-4 py-2 rounded-md text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                Inbox
              </Link>
            </li>
            <li>
              <Link
                to="/sent"
                className="block px-4 py-2 rounded-md text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                Sent Mail
              </Link>
            </li>
            <li>
              <Link
                to="/compose"
                className="block px-4 py-2 rounded-md text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                Compose
              </Link>
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

      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center z-10">
          <h1 className="text-xl font-semibold text-gray-800">Your Mailbox</h1>
          <span className="text-gray-600 text-sm">Hello, User!</span>
        </header>

        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
