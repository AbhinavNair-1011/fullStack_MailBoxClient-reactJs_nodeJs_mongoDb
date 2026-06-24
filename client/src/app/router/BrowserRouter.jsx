import  { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import PublicRoute from "../../routes/PublicRoute"
import PublicLayout from "../../layouts/PublicLayout"
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import ProtectedRoute from "../../routes/ProtectedRoute";
import ProtectedLayout from "../../layouts/ProtectedLayout";
import InboxPage from "../../features/mail/pages/InboxPage";
import MailDetailPage from "../../features/mail/pages/MailDetailsPage";
import SentMailsPage from "../../features/mail/pages/SentMailPage";
import ComposeMailPage from "../../features/mail/pages/ComposeMailPage";

// const Dashboardtemp = () => (
//   <div className="p-8 bg-white rounded-lg shadow-md text-center">
//     <h2 className="text-3xl font-semibold text-gray-800">Welcome to your Mailbox Dashboard</h2>
//     <p className="mt-4 text-gray-600">This is a protected area. You are logged in.</p>
//   </div>
// );
const router= createBrowserRouter([
    {
    path:"/",
    element:<Navigate to="/login"/>

},
{
    element: <PublicRoute> <PublicLayout/> </PublicRoute>,    
    children:[

        {
            path:"/login",
            element:<LoginPage/>
        },
        {
            path:"/register",
            element:<RegisterPage/>
        }

    ]

},{
    element:<ProtectedRoute> <ProtectedLayout/> </ProtectedRoute>,
    children:[
       
        {
            path:"/inbox",
            element:<InboxPage/>
        },
        {
            path:"/inbox/:mailId",
            element:<MailDetailPage/>
        },
        {
            path:"/sent",
            element:<SentMailsPage/>
        },
        {
            path:"/compose",
            element:<ComposeMailPage/>
        }
    ]
}

])

function BrowserProvider ({children}){
return <RouterProvider router={router}> {children}</RouterProvider>
}
export default BrowserProvider