import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import AuthRoute from './routes/AuthRoute';
import ProtectedRoute from './routes/ProtectedRoute';

import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';

import ComposeMailPage from './features/mail/pages/ComposeMailPage';
import InboxPage from './features/mail/pages/InboxPage';
import MailDetailPage from './features/mail/pages/MailDetailsPage'; 

const Dashboardtemp = () => (
  <div className="p-8 bg-white rounded-lg shadow-md text-center">
    <h2 className="text-3xl font-semibold text-gray-800">Welcome to your Mailbox Dashboard</h2>
    <p className="mt-4 text-gray-600">This is a protected area. You are logged in.</p>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboardtemp />} />
              <Route path="/dashboard" element={<Dashboardtemp />} />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/inbox/:mailId" element={<MailDetailPage />} />

              <Route path="/compose" element={<ComposeMailPage />} />
            </Route>
          </Route>

          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h1 className="text-4xl text-gray-700">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
