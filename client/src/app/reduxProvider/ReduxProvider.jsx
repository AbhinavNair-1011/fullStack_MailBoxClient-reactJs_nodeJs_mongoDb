import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import mailReducer from "../../features/mail/mailSlice";
import notificationReducer from "../../features/notification/notificationSlice"
import { Provider } from "react-redux";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    mail: mailReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default function ReduxProvider({ children }) {
  return <Provider store={store}> {children}</Provider>;
}
