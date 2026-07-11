import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { replyMail } from "../mailSlice";
import { useNavigate } from "react-router-dom";

const ReplyForm = ({ mailId, onSuccess, setReplySuccess,loadMail }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReplySuccess(null);

    try {
      await dispatch(replyMail({ mailId, body })).unwrap();
      console.log("done")
      setReplySuccess("Reply sent successfully!");
      setBody("");
      onSuccess(false);
     loadMail()
    } catch (err) {
      console.log(err)
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="mb-5 flex items-center justify-between">
    <h3 className="text-lg font-semibold text-gray-900">Reply</h3>
  </div>

  {error && (
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
      {error}
    </div>
  )}

  <form onSubmit={handleSubmit} className="space-y-4">
    <textarea
      rows={6}
      placeholder="Write your reply..."
      value={body}
      onChange={(e) => setBody(e.target.value)}
      className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 p-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
    />

    <div className="flex justify-end">
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Reply"}
      </button>
    </div>
  </form>
</div>
  );
};

export default memo(ReplyForm);
