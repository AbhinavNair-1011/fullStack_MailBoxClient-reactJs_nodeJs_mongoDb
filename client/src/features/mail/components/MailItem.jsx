 import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const MailItem = ({ mail ,type}) => { 
  const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);


  const handleClick = () => {
    navigate(`/inbox/${mail._id}`);
  };

  const isSender = user.email === mail.senderEmail;
  const isRecipient = user.email === mail.recipient;

  const isUnread = (isRecipient && !mail.isReadByRecipient) 
                || (isSender && !mail.isReadBySender);

   const addressLabel = type === "sent" ? "To" : "From";
  const addressEmail = type === "sent" ? mail.recipient : mail.senderEmail;

  return (
    <div
      className={`rounded-xl shadow-sm mb-4 hover:shadow-md transition-all duration-200 border-l-4 cursor-pointer group 
        ${isUnread ? 'bg-blue-50 border-blue-500' : 'bg-white border-transparent'}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-3">
          <div className={`rounded-full h-10 w-10 flex items-center justify-center transition-colors
            ${isUnread ? 'bg-blue-200 text-blue-900' : 'bg-blue-100 text-blue-800'} group-hover:bg-blue-200`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <h3 className={`font-semibold text-lg transition-colors 
            ${isUnread ? 'text-gray-900' : 'text-gray-800'} group-hover:text-blue-600`}>
            {mail.subject}
          </h3>

          {isUnread && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
              New
            </span>
          )}

          {mail.replies && mail.replies.length > 0 && (
            <span className="ml-1 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
              {mail.replies.length} Replies
            </span>
          )}
        </div>

        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
          {new Date(mail.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>

      <div className="flex justify-between pl-2">
             <p className="text-gray-600 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="font-medium text-gray-700 pr-1">{addressLabel}:</span> {addressEmail}
        </p>

        <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
          <span>View mail</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MailItem;
