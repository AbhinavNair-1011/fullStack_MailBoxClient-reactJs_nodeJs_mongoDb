import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MailItem = ({ mail, type }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleClick = () => {
    navigate(`/${mail._id}`);
  };

  const isSender = user.email === mail.senderEmail;
  const isRecipient = user.email === mail.recipient;

  const isUnread =
    (isRecipient && !mail.isReadByRecipient) ||
    (isSender && !mail.isReadBySender);

  const addressEmail = type === "sent" ? mail.recipient : mail.senderEmail;

  const preview =
    mail.body.length > 90 ? mail.body.slice(0, 90) + "..." : mail.body;

  return (
<div
  onClick={handleClick}
  className={`mb-3 cursor-pointer rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg
  ${isUnread ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-white"}`}
>
  <div className="p-3 sm:p-4">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
        <div
          className={`flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full font-semibold text-white
          ${isUnread ? "bg-blue-600" : "bg-gray-500"}`}
        >
          {addressEmail.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="break-all text-sm sm:text-base font-semibold text-gray-900">
              {`${type === "sent" ? "To : " : "From : "}${addressEmail}`}
            </p>

            {isUnread && (
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600"></span>
            )}
          </div>

          <h3 className="mt-1 break-words text-sm sm:text-base font-bold text-gray-800">
            {mail.subject}
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 sm:block sm:text-right shrink-0">
        <p className="text-[11px] sm:text-xs text-gray-500 whitespace-nowrap">
          {new Date(mail.updatedAt).toLocaleString()}
        </p>

        <div className="mt-0 sm:mt-2 flex flex-wrap justify-start sm:justify-end gap-2">
          {mail.replies.length > 0 && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {mail.replies.length}
            </span>
          )}

          {mail.replies?.length > 0 && isUnread && (
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
              New Reply
            </span>
          )}
        </div>
      </div>
    </div>

    <p
      className="mt-4 line-clamp-2 break-words text-sm text-gray-600"
      dangerouslySetInnerHTML={{ __html: preview }}
    />
  </div>
</div>
  );
};

export default MailItem;
