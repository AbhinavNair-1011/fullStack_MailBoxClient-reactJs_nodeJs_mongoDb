import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMailId } from '../mailSlice';
import ReplyForm from '../components/ReplyForm';

const MailDetailPage = () => {
  const { mailId } = useParams();
  const dispatch = useDispatch();
  const selectedMail = useSelector(state => state.mail.selectedMail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replySuccess, setReplySuccess] = useState(null);

  const navigate= useNavigate()

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

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const backHandler=()=>{
      navigate("/inbox")
  }

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
        <p className="text-red-700 font-medium">{error}</p>
      </div>
    </div>
  );

  if (!selectedMail) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <p className='pb-6 underline text-blue-400 cursor-pointer'
            onClick={backHandler}> Back</p>

      <div className="max-w-2xl mx-auto space-y-6">
              {replySuccess && <p className="text-green-500 mb-2">{replySuccess}</p>}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">{selectedMail.subject}</h1>
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
              <p className="mb-1 sm:mb-0">
                <span className="font-medium">From:</span> {selectedMail.senderEmail}
              </p>
              <p className="text-gray-500">
                {new Date(selectedMail.createdAt).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="px-5 py-6">
            <div 
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: selectedMail.body }} 
            />
          </div>

          <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
            <button 
              onClick={handleReplyClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              {showReplyForm ? 'Cancel Reply' : 'Reply'}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`ml-2 h-4 w-4 transition-transform duration-200 ${showReplyForm ? 'rotate-180' : ''}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showReplyForm ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <ReplyForm 
              recipient={selectedMail.senderEmail} 
              subject={`${selectedMail.subject}`}
              onSuccess={setShowReplyForm}
              setReplySuccess={setReplySuccess}
            />
        </div>
      </div>
    </div>
  );
};

export default MailDetailPage;