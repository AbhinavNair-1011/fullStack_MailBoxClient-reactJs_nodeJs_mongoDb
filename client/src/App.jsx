import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/reduxProvider/ReduxProvider";

import AuthRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

import AuthLayout from "./layouts/PublicLayout";
import MainLayout from "./layouts/ProtectedLayout";

import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";

import ComposeMailPage from "./features/mail/pages/ComposeMailPage";
import InboxPage from "./features/mail/pages/InboxPage";
import MailDetailPage from "./features/mail/pages/MailDetailsPage";
import SentMailsPage from "./features/mail/pages/SentMailPage";
import BrowserProvider from "./app/router/BrowserRouter";

function App() {
  return <BrowserProvider />;
}

export default App;
