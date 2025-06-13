import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInboxMails } from '../mailSlice';
import MailItem from '../components/MailItem';
import { Navigate, useNavigate } from 'react-router-dom';

const InboxPage = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  
  const inbox = useSelector((state) => state.mail.inbox);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInbox = async () => {
      setLoading(true);
      setError(null);
      try {
        await dispatch(fetchInboxMails()).unwrap();  
      } catch (err) {
        setError(err?.message || 'No Emails to show');
      } finally {
        setLoading(false);
      }
    };

    loadInbox();
  }, [dispatch]);

const composeClickHandler=()=>{
  navigate("/compose")
}
  return (
<div className=" p-3 bg-gradient-to-br from-gray-50 to-gray-100">
  <div className="max-w-6xl mx-auto">
    <div className="flex items-end justify-between mb-8">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold text-gray-800">📬 Inbox</h1>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {inbox.length} {inbox.length === 1 ? 'mail' : 'mails'}
        </span>
      </div>
      <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        <span onClick={composeClickHandler}>Compose</span>
      </button>
    </div>


    {error && (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    )}


    <div className="bg-white rounded-xl shadow-sm overflow-hidden p-3 sm:w-full">
      {inbox.length === 0 && !loading && !error ? (
        <div className="text-center py-16">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No mail found</h3>
          <p className="mt-1 text-gray-500">Your inbox is empty. Try composing a new mail!</p>
          <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            New Mail
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {inbox.map((mail) => (
            <MailItem key={mail._id} mail={mail} type="inbox" />
            
          ))}
        </ul>
      )}
    </div>
  </div>
</div>
  );
};

export default InboxPage;
