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
    <li
      onClick={handleClick}
      className={`cursor-pointer rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 mb-3
      ${isUnread ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-white"}`}
    >
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center font-semibold text-white
              ${isUnread ? "bg-blue-600" : "bg-gray-500"}`}
            >
              {addressEmail.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{`${type==='sent'? "To : ": "From : "}${addressEmail}`}</p>

                {isUnread && (
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                )}
              </div>

              <h3 className="mt-1 font-bold text-gray-800">{mail.subject}</h3>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">
              {new Date(mail.updatedAt).toLocaleString()}
            </p>

            {mail.replies.length > 0 && (
              <span className="inline-block mt-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {mail.replies.length}
              </span>
            )}
          </div>
        </div>

        <p
          className="mt-4 text-sm text-gray-600 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: preview }}
        ></p>
      </div>
    </li>
  );
};

export default MailItem;
