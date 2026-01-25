"use client";
import React from 'react';
import LeftPanel from './left';
import SignUpForm from './right';

const SignUpPage = () => {
  return (
    <main className="bg-[#f6f7f8] dark:bg-[#101922] h-screen w-full overflow-hidden">
      <div className="flex h-full w-full flex-row">
        {/* Component 1: Left */}
        <LeftPanel />
        
        {/* Component 2: Right (Form) */}
        <SignUpForm />
      </div>
    </main>
  );
};

export default SignUpPage;