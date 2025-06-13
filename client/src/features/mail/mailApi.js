import api from '../../app/axios';

export const getInboxMails = () => api.get('/api/mail/inbox');
export const fetchMailById = (id) => api.get(`/api/mail/inbox/${id}`);
export const sendMail = (data) => api.post('/api/mail/send', data);
export const SendreplyMail = (mailId,replyData) => api.post(`/api/mail/${mailId}/reply`, {replyData});
export const getSentMails =  () => api.get('/api/mail/sent');