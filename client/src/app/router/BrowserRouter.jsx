import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import PublicRoute from "../../routes/PublicRoute";
import ProtectedRoute from "../../routes/ProtectedRoute";

import PublicLayout from "../../layouts/PublicLayout";
import ProtectedLayout from "../../layouts/ProtectedLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMe } from "../../features/auth/authSlice";
import socket from "../../socket/socket";

const LoginPage = lazy(() => import("../../features/auth/pages/LoginPage"));
const RegisterPage = lazy(
  () => import("../../features/auth/pages/RegisterPage"),
);
const InboxPage = lazy(() => import("../../features/mail/pages/InboxPage"));
const MailDetailPage = lazy(
  () => import("../../features/mail/pages/MailDetailsPage"),
);
const SentMailsPage = lazy(
  () => import("../../features/mail/pages/SentMailPage"),
);
const ComposeMailPage = lazy(
  () => import("../../features/mail/pages/ComposeMailPage"),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    element: (
      <PublicRoute>
        <PublicLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <ProtectedLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/:mailId",
        element: <MailDetailPage />,
      },
      {
        path: "/inbox",
        element: <InboxPage />,
      },

      {
        path: "/sent",
        element: <SentMailsPage />,
      },
      {
        path: "/compose",
        element: <ComposeMailPage />,
      },
    ],
  },
]);

function BrowserProvider() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [user]);

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">Loading</div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default BrowserProvider;
