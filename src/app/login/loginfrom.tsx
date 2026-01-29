"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react";
import { useState } from 'react';
import axios from 'axios';

import { toast } from 'sonner';
interface dform {
  email: string,
  password: string
}
const LoginForm = ({ loading }:any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errormsg, seterrormsg] = useState("")
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<dform>();
   let errd=""
  const onsubmit: SubmitHandler<dform> = async (data) => {
    try {
      // iserror("") // Clear previous error
      loading(true)
      const response = await axios.post("/controller/login", data)
      loading(false)
      router.push("/")
      toast.success(`Login Successfully`, {position:"top-right",
         style:{
          backgroundColor:"#FFFFFF",
          color:"#22C55E",
          
        }
      })
      
      console.log(response)
    } catch (err: any) {
      loading(false)
      console.log(err.response.data.message)
      toast.error(err.response.data.message, {position:"top-right",
        style:{
          backgroundColor:"#FFFFFF",
          color:"#EF4444",
          
        }
        
      })
        seterrormsg(err.response.data.message)

    }
  }

        
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  return (
    <div className="w-full lg:w-1/2 flex flex-col h-full bg-white dark:bg-[#101922] overflow-y-auto">
      <div className="flex flex-1 flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-[440px] flex flex-col gap-8">

          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">

              <span className="text-lg font-bold tracking-tight dark:text-white text-shadow-xl/20">CODE-VITA</span>
            </div>
            <h1 className="text-[#111418] dark:text-white text-3xl font-black tracking-[-0.033em]">Welcome back</h1>
            <p className="text-[#617589] dark:text-slate-400 text-base">Please enter your details to sign in.</p>
          </div>
          {/* Social Logins */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 h-12 rounded-lg border border-[#dbe0e6] dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"></path><path d="M12.24 24.0008C15.4765 24.0008 18.2059 22.9382 20.19 21.1039L16.323 18.1056C15.2498 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.24 24.0008Z" fill="#34A853"></path><path d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.5166C-0.18551 10.0056 -0.18551 14.0004 1.5166 17.3912L5.50253 14.3003Z" fill="#FBBC05"></path><path d="M12.24 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.24 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50253 9.70575C6.45064 6.86173 9.10947 4.74966 12.24 4.74966Z" fill="#EA4335"></path></svg>
                <span className="text-[#111418] dark:text-white font-medium text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 h-12 rounded-lg border border-[#dbe0e6] dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <svg className="w-5 h-5 dark:fill-white fill-[#111418]" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24.02-1.44.62-2.2.44-3.26-.79-2.75-3.19-2.3-8.58 2.04-8.87 1.25-.09 2.22.65 2.94.62.9-.03 2.19-.87 3.73-.7 1.63.18 2.87 1.05 3.65 2.17-3.14 1.87-2.61 5.76.63 7.15zM15.32 4.09c.75-1.41 2.57-2.18 4.29-2.09.28 1.83-1.15 3.77-2.66 4.35-1.07.41-2.68-.17-3.16-1.55.51-.25 1.03-.49 1.53-.71z"></path></svg>
                <span className="text-[#111418] dark:text-white font-medium text-sm">Apple</span>
              </button>
            </div>
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[#dbe0e6] dark:border-slate-700"></div>
              <span className="flex-shrink-0 mx-4 text-sm text-[#617589] dark:text-slate-500">Or continue with email</span>
              <div className="flex-grow border-t border-[#dbe0e6] dark:border-slate-700"></div>
            </div>
          </div>
          {errormsg && (
            <div className='flex flex-wrap items-center justify-center p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'>
              <p className='text-red-600 dark:text-red-400 font-semibold text-sm text-center'>
                {errormsg}
              </p>
            </div>
          )}
          {/* Input Form */}
          <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[#111418] dark:text-slate-200 text-sm font-medium">Email Address</label>
              <input {...register("email", {
                required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                maxLength: { value: 50, message: "Email must be at most 50 characters long" },
                minLength: { value: 5, message: "Email must be at least 5 characters long" }
              })} aria-invalid={errors.email ? true : false} className="w-full rounded-lg text-[#111418] dark:text-white border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 h-12 px-[15px] focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all" placeholder="name@example.com" type="email" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#111418] dark:text-slate-200 text-sm font-medium">Password</label>
              <div className="relative flex items-center">
                <input {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  },
                  maxLength: {
                    value: 16,
                    message: "Password must be at most 16 characters long"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character"
                  }
                })} aria-invalid={errors.password ? true : false}


                  className="w-full rounded-lg text-[#111418] dark:text-white border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 h-12 px-[15px] pr-12 focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all" placeholder="Enter your password" type={showPassword ? "text" : "password"} />
                <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                  <span onClick={togglePasswordVisibility} className=" material-symbols-outlined text-[#617589] cursor-pointer hover:text-[#137fec] text-[20px]">{showPassword ? <Eye /> : <EyeOff />
                  }</span>
                </div>

              </div>

             
               <div className="flex  justify-end">
               
                <Link className="text-[#137fec] text-sm font-medium hover:underline  " href="/login/forgot-password">Forgot password?</Link>
              </div>
              <div className='flex  justify-start items-center flex-wrap'>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
            </div>
          
            <input type="submit" value="Log in" className=" cursor-pointer active:scale-95 transition-all flex w-full items-center justify-center rounded-lg h-12 bg-[#137fec] text-white text-base font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.99]" />
          </form>

          {/* Footer */}
          <div className="flex justify-center items-center gap-2">
            <p className="text-[#617589] text-sm">Don't have an account?</p>
            <Link className="text-[#111418] dark:text-white text-sm font-semibold hover:text-[#137fec] transition-colors cursor-pointer active:scale-95 " href="/signup">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="py-6 text-center">
        <p className="text-xs text-[#617589]"><Link href="/">Home</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;