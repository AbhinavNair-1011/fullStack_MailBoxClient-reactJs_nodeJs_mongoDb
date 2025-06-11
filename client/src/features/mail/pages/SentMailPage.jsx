import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSentMails } from '../mailSlice';
import MailItem from '../components/MailItem';

const SentMailsPage = () => {
  const dispatch = useDispatch();
  const sent = useSelector(state => state.mail.sent);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSentMails = async () => {
      setLoading(true);
      setError(null);
      try {
        await dispatch(fetchSentMails()).unwrap();
      } catch (err) {
        setError(err?.message || 'Failed to load sent mails');
      } finally {
        setLoading(false);
      }
    };

    loadSentMails();
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📤 Sent Mails</h1>

      {loading && <p>Loading sent mails...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {sent.length === 0 && !loading && !error ? (
          <div className="text-center text-gray-600 text-lg mt-10">
            No sent mails found.
          </div>
        ) : (
          sent.map((mail) => <MailItem key={mail._id} mail={mail} />)
        )}
      </div>
    </div>
  );
};

export default SentMailsPage;
