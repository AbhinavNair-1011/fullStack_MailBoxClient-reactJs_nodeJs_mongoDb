import api from '../../app/axios';

export const sendMail = (mailData) => api.post('/api/mail/send', mailData);
