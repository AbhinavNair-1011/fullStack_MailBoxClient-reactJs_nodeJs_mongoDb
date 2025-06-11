import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import mailReducer from "../features/mail/mailSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    mail:mailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});