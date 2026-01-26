"use client";
import React from 'react';
import LeftPanel from './left';
import SignUpForm from './right';
import Loading from './loading';
import { useState } from 'react';
const SignUpPage = () => {
  const [loading,setLoading]=useState(false)
  return (
    <main className="bg-[#f6f7f8] dark:bg-[#101922] h-screen w-full overflow-hidden">
      {
        loading?<Loading/>:<div className="flex h-full w-full flex-row">
        {/* Component 1: Left */}
        <LeftPanel />
        
        {/* Component 2: Right (Form) */}
        <SignUpForm  LoadingState={setLoading} />
      </div>
      }
    </main>
  );
};

export default SignUpPage;