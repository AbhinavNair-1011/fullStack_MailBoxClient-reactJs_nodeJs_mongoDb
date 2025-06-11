import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { replyMail } from "../mailSlice";

const ReplyForm = ({ recipient, subject ,onSuccess,setReplySuccess  }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setReplySuccess(null);

    try {
      await dispatch(
        replyMail({ recipient, subject: `Re: ${subject}`, body })
      ).unwrap();
      setReplySuccess("Reply sent successfully!");
      setBody("");
onSuccess(false)

   
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 mt-6">
      <h3 className="text-xl font-bold mb-4">Reply</h3>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-3 mb-4"
          rows="6"
          placeholder="Write your reply..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reply"}
        </button>
      </form>
    </div>
  );
};

export default ReplyForm;
