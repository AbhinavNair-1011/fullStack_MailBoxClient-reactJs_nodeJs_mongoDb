import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMailId } from "../mailSlice";
import ReplyForm from "../components/ReplyForm";
import socket from "../../../socket/socket";

const MailDetailPage = () => {
  const { mailId } = useParams();
  const dispatch = useDispatch();
  const selectedMail = useSelector((state) => state.mail.selectedMail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replySuccess, setReplySuccess] = useState(null);
  const navigate = useNavigate();

  socket.on("mail:reply", () => {
    dispatch(fetchMailId(mailId));
  });
  const loadMail = async () => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(fetchMailId(mailId)).unwrap();
    } catch (err) {
      setError(err?.message || "Failed to load mail");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMail();
  }, [dispatch, mailId]);

  const handleReplyClick = useCallback(() => {
    setShowReplyForm((prev) => !prev);
  }, []);

  const backHandler = useCallback(() => {
    navigate("/inbox");
  }, [navigate]);

  if (!selectedMail) {
    return null;
  }

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 relative">
      <p
        className="pb-6 underline text-blue-400 cursor-pointer"
        onClick={backHandler}
      >
        Back
      </p>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
              <p className="mb-1 sm:mb-0">
                <span className="font-medium">From:</span>{" "}
                {selectedMail.senderEmail}
              </p>
              <p className="text-gray-500">
                {new Date(selectedMail.createdAt).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-md font-semibold text-gray-900">
                {`Subject : ${selectedMail.subject}`}
              </h1>

              <div className="flex items-center space-x-2">
                {selectedMail.replies && selectedMail.replies.length > 0 && (
                  <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
                    {selectedMail.replies.length} Replies
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="px-5 py-6">
            <div
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: selectedMail.body }}
            />
          </div>
          {selectedMail.replies && selectedMail.replies.length > 0 && (
            <div className="mt-6 border-t pt-4 max-h-[550px] overflow-scroll">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Replies
              </h3>
              <div className="space-y-4">
                {selectedMail.replies.map((reply, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded p-4 bg-gray-50 shadow-sm"
                  >
                    <div className="text-sm text-gray-500 flex justify-between">
                      <span>
                        <strong>From:</strong> {reply.senderEmail}
                      </span>
                      <span>
                        {new Date(reply.createdAt).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap mb-2">
                      {reply.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={handleReplyClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              {showReplyForm ? "Cancel Reply" : "Reply"}
              <svg
                className={`ml-2 h-4 w-4 transform ${
                  showReplyForm ? "rotate-180" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

  <div
  className={`overflow-hidden transition-all duration-300 ${
    showReplyForm
      ? "max-h-[700px] opacity-100 mt-6"
      : "max-h-0 opacity-0"
  }`}
>
  <ReplyForm
    mailId={mailId}
    onSuccess={setShowReplyForm}
    setReplySuccess={setReplySuccess}
    loadMail={loadMail}
  />
</div>
      </div>
      {replySuccess && (
        <p className="text-green-500 mb-2 text-center">{replySuccess}</p>
      )}
    </div>
  );
};

export default MailDetailPage;
