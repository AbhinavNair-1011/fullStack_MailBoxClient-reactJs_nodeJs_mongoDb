import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInboxMails } from '../mailSlice';
import MailItem from '../components/MailItem';

const InboxPage = () => {
  const dispatch = useDispatch();
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📥 Inbox</h1>

      {loading && <p>Loading mails...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {inbox.length === 0 && !loading && !error ? (
          <div className="text-center text-gray-600 text-lg mt-10">
            No mails found.
          </div>
        ) : (
          inbox.map((mail) => <MailItem key={mail._id} mail={mail} />)
        )}
      </div>
    </div>
  );
};

export default InboxPage;
