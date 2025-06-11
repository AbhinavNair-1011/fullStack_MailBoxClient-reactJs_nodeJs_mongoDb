import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMailId } from '../mailSlice';
import ReplyForm from '../components/ReplyForm';  

const MailDetailPage = () => {
  const { mailId } = useParams();
  const dispatch = useDispatch();
  const selectedMail = useSelector(state => state.mail.selectedMail);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMail = async () => {
      setLoading(true);
      setError(null);
      try {
        await dispatch(fetchMailId(mailId)).unwrap();
      } catch (err) {
        setError(err?.message || 'Failed to load mail');
      } finally {
        setLoading(false);
      }
    };

    loadMail();
  }, [dispatch, mailId]);

  if (loading) return <p>Loading mail...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!selectedMail) return null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-2">{selectedMail.subject}</h1>
        <p className="text-sm text-gray-600 mb-4">
          From: {selectedMail.senderEmail} | Sent: {new Date(selectedMail.createdAt).toLocaleString()}
        </p>

        <div 
          className="prose prose-sm max-w-none text-gray-700" 
          dangerouslySetInnerHTML={{ __html: selectedMail.body }} 
        />
      </div>

      <ReplyForm recipient={selectedMail.senderEmail} subject={selectedMail.subject} />
    </div>
  );
};

export default MailDetailPage;
