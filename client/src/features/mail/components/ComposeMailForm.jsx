import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import 'react-quill/dist/quill.snow.css';

const ComposeMailForm = ({ onSubmit, isLoading }) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [error,setError] = useState('')
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user);
  const myEmail = user?.email;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (recipient.trim().toLowerCase() === myEmail.trim().toLowerCase()) {
      setError("Cannot send mail to ur own id")
      return;
    }

    const result = await onSubmit({ recipient, subject, body });

    if (result === true) {
      setRecipient("");
      setSubject("");
      setBody("");
      navigate('/sent');
    } 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Compose New Mail</h2>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Recipient</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="email@example.com"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
         {error && <p className='text-[11px] text-red-500 pl-3'>{error}</p>}
      </div>
     

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Subject</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="What's this about?"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
          <ReactQuill 
            value={body} 
            onChange={setBody} 
            theme="snow"
            className="border-none h-[270px]"
            placeholder="Write your message here..."
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </div>
    </form>
  );
};

export default ComposeMailForm;
