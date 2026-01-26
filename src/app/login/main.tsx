"use client";
import React from 'react';
import LeftPanel from './side';
import LoginForm from './loginfrom';
import {useState} from "react"
import Loading from './loading';
const LoginPage = () => {
    const [loading,setloading]=useState(false)
  return (
    <main className="font-display bg-[#f6f7f8] dark:bg-[#101922] text-[#111418] dark:text-white antialiased">
     {
      loading ? <Loading/>: <div className="relative flex h-screen w-full overflow-hidden">
        {/* Component 1: Visual Left */}
        <LeftPanel />
        
        {/* Component 2: Auth Right */}
        <LoginForm  loading={setloading} />
      </div>
     }
    </main>
  );
};

export default LoginPage;