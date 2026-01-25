"use client";
import React from 'react';
import LeftPanel from './side';
import LoginForm from './loginfrom';

const LoginPage = () => {
  return (
    <main className="font-display bg-[#f6f7f8] dark:bg-[#101922] text-[#111418] dark:text-white antialiased">
      <div className="relative flex h-screen w-full overflow-hidden">
        {/* Component 1: Visual Left */}
        <LeftPanel />
        
        {/* Component 2: Auth Right */}
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;