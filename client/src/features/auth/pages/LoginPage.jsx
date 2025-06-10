import React from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="
      flex flex-col items-center justify-center min-h-screen p-5
      bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
       overflow-hidden relative
    ">
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-white/5"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-white/15"></div>
      
      <div className="
        w-full max-w-md
        bg-white/10 backdrop-blur-md
        rounded-2xl shadow-2xl
        border border-white/20
        p-8 sm:p-10
        relative z-10
      ">
        <LoginForm />
      </div>

      <p className="
        mt-6 text-lg
        text-white/90 hover:text-white
        transition-colors duration-200
        bg-white/10 backdrop-blur-sm
        px-4 py-2 rounded-full
        relative z-10
      ">
        Don't have an account?{' '}
        <Link 
          to="/register" 
          className="
            font-bold 
            text-white hover:text-blue-100
            underline underline-offset-4
          "
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;