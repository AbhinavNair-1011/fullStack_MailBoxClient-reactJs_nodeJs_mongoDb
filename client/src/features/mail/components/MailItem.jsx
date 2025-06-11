import React from 'react';
import { useNavigate } from 'react-router-dom';

const MailItem = ({ mail }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/inbox/${mail._id}`);
  };

  return (
    <div
      className="bg-white rounded shadow p-4 mb-3 hover:bg-blue-50 cursor-pointer transition"
      onClick={handleClick}
    >
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-lg text-gray-800">{mail.subject}</h3>
        <span className="text-sm text-gray-500">{new Date(mail.createdAt).toLocaleString()}</span>
      </div>

      <p className="text-sm text-gray-600 mb-2">From: {mail.senderEmail}</p>
      <p className="text-blue-600 font-medium">Click to view mail</p>
    </div>
  );
};

export default MailItem;
