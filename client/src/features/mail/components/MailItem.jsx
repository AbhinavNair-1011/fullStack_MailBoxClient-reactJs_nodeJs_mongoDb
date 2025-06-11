import React from 'react';
import { useNavigate } from 'react-router-dom';

const MailItem = ({ mail }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/inbox/${mail._id}`);
  };

  return (
  <div
  className="bg-white rounded-xl shadow-sm  mb-4 hover:shadow-md transition-all duration-200 border-l-4 border-transparent hover:border-blue-500 cursor-pointer group"
  onClick={handleClick}
>
  <div className="flex justify-between items-start mb-2">
    <div className="flex items-center space-x-3">
      <div className="bg-blue-100 text-blue-800 rounded-full h-10 w-10 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      </div>
      <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
        {mail.subject}
      </h3>
    </div>
    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
      {new Date(mail.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </span>
  </div>

  <div className="flex justify-between pl-2 "> 
    <p className="text-gray-600 mb-2 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span className="font-medium text-gray-700p pr-1">From:</span> {mail.senderEmail}
    </p>
    
    {mail.previewText && (
      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
        {mail.previewText}
      </p>
    )}

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
