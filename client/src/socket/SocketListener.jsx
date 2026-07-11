import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import socket from "./socket";

import { fetchInboxMails, fetchMailId, fetchSentMails } from "../features/mail/mailSlice";

import {
  addNotification,
} from "../features/notification/notificationSlice";

const SocketListener = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleNewMail = ({ target, mail }) => {
      if (target !== "inbox") return;

      if (location.pathname.startsWith("/inbox")) {
        dispatch(fetchInboxMails());
        return;
      }

      dispatch(
        addNotification({
          id: mail._id,
          type: "mail:new",
          target:"inbox",
          mailId: mail._id,
          senderEmail: mail.senderEmail,
          subject: mail.subject,
          createdAt: Date.now(),
        }),
      );
    };

    const handleReply = ({ target, mail }) => {
      if (target === "inbox") {
        const isViewingMail = location.pathname === `/${mail._id}`;

        if (isViewingMail) {
          dispatch(fetchMailId(mail._id));
          return;
        }

          dispatch(
        addNotification({
          id: mail._id,
          type: "mail:new",
          target:"inbox",
          mailId: mail._id,
          senderEmail: mail.senderEmail,
          subject: mail.subject,
          createdAt: Date.now(),
        }),
      );

        return;
      }

      if (target === "sent") {
        const isViewingMail = location.pathname === `/${mail._id}`;

        if (isViewingMail) {
          dispatch(fetchMailId(mail._id));
          return;
        }

        dispatch(
          addNotification({
            id: mail._id,
            type: "mail:reply",
            mailId: mail._id,
            target:"sent",
            senderEmail: mail.senderEmail,
            subject: mail.subject,
            createdAt: Date.now(),
          }),
        );
      }
    };

    socket.on("mail:new", handleNewMail);
    socket.on("mail:reply", handleReply);

    return () => {
      socket.off("mail:new", handleNewMail);
      socket.off("mail:reply", handleReply);
    };
  }, [dispatch, location.pathname]);

  return null;
};

export default SocketListener;
