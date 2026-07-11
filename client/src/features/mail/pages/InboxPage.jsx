import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInboxMails } from "../mailSlice";
import MailItem from "../components/MailItem";
import { Navigate, useNavigate } from "react-router-dom";
import { clearInboxNotifications } from "../../notification/notificationSlice";

const InboxPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const inbox = useSelector((state) => state.mail.inbox);

  const unreadCount = inbox.filter((mail) => !mail.isReadByRecipient).length;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(clearInboxNotifications());
  }, []);

  useEffect(() => {
    const loadInbox = async () => {
      setLoading(true);
      setError(null);
      try {
        await dispatch(fetchInboxMails()).unwrap();
      } catch (err) {
        setError(err?.message || "No Emails to show");
      } finally {
        setLoading(false);
      }
    };

    loadInbox();
  }, [dispatch]);

  const composeClickHandler = () => {
    navigate("/compose");
  };
return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-4">
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
             Inbox
          </h1>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            {inbox.length} {inbox.length === 1 ? "mail" : "mails"}
          </span>
        </div>

        <button
          onClick={composeClickHandler}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>

          <span>Compose</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 shadow-sm">
          <div className="flex items-center">
            <svg
              className="mr-3 h-5 w-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>

            <p className="font-medium text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        {inbox.length === 0 && !loading && !error ? (
          <div className="flex flex-col items-center px-6 py-14 sm:py-20">
            <div className="rounded-full bg-gray-100 p-5">
              <svg
                className="h-12 w-12 text-gray-400 sm:h-16 sm:w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10z"
                />
              </svg>
            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900">
              No mail found
            </h3>

            <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
              Your inbox is empty. New messages will appear here when someone
              sends you a mail.
            </p>

            <button
              onClick={composeClickHandler}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Compose Mail
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {inbox.map((mail) => (
              <MailItem key={mail._id} mail={mail} type="inbox" />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default InboxPage;
