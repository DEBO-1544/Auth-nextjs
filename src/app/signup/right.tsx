"use client";
import React from 'react';
import Link from 'next/link';
import axios from 'axios';

import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Eye, EyeOff } from 'lucide-react';
import Loading from './loading';

interface IFormInput {
    fullname: string
    email: string
    password: string
}

interface SignUpFormProps {
    LoadingState: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm = ({ LoadingState }: SignUpFormProps) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [errormsg, seterrormsg] = useState("")
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            LoadingState(true);
            const response = await axios.post("/controller/signup", data);
            console.log(response.data);
           
            router.push(`/signup/email/verify?email=${data.email}`);
        } catch (error: any) {
            console.log(error.response?.data);
            seterrormsg(error.response?.data.message)
          alert(error.response?.data.message)
        } finally {
            LoadingState(false);
        }
    }
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (


        <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto bg-background-light dark:bg-background-dark px-4 sm:px-12 lg:px-20 xl:px-32 py-10">
            <div className="w-full max-w-[480px] flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-[#111418] dark:text-[#f0f2f4] text-[32px] font-bold leading-tight tracking-tight">Create your account</h1>
                    <p className="text-[#637588] dark:text-[#9ba8b8] text-base">Start your 30-day free trial. No credit card required.</p>
                </div>

                <button className=" cursor-pointer active:scale-95 transition-all flex w-full items-center justify-center gap-3 rounded-xl border border-[#dbe0e6] dark:border-[#2a3845] bg-white dark:bg-[#1a2632] px-4 py-3.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                    </svg>
                    <span className="text-[#111418] dark:text-[#f0f2f4] font-medium text-sm ">Sign up with Google</span>
                </button>

                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-[#dbe0e6] dark:border-[#2a3845]"></div>
                    <span className="flex-shrink-0 mx-4 text-[#637588] dark:text-[#9ba8b8] text-sm">or sign up with email</span>
                    <div className="flex-grow border-t border-[#dbe0e6] dark:border-[#2a3845]"></div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)

                } className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#111418] dark:text-[#f0f2f4]">Full Name</label>
                        <input {...register("fullname", { required: "Full name is required", maxLength: { value: 20, message: "Max 20 characters" } })} aria-invalid={errors.fullname ? true : false}
                            className="w-full rounded-xl border border-[#dbe0e6] dark:border-[#2a3845] bg-white dark:bg-[#1a2632] px-4 py-3 focus:ring-1 focus:ring-[#137fec] outline-none dark:text-slate-200 text-zinc-700" placeholder="John Doe" type="text" />
                        {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#111418] dark:text-[#f0f2f4]">Email</label>
                        <input {...register("email", {
                            required: "Email is required",
                            maxLength: { value: 50, message: "Max 50 characters" },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format"
                            }
                        })} aria-invalid={errors.email ? true : false} className="w-full rounded-xl border border-[#dbe0e6] dark:border-[#2a3845] bg-white dark:bg-[#1a2632] px-4 py-3 focus:ring-1 focus:ring-[#137fec] outline-none dark:text-slate-200 text-zinc-700" placeholder="name@company.com" type="email" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#111418] dark:text-[#f0f2f4]">Password</label>
                        <div className="relative">
                            <input {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "Minimum 8 characters" },
                                maxLength: { value: 16, message: "Maximum 16 characters" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Must include uppercase, lowercase, number and special char"
                                }
                            })} aria-invalid={errors.password ? true : false} className="w-full rounded-xl border border-[#dbe0e6] dark:border-[#2a3845] bg-white dark:bg-[#1a2632] px-4 py-3 pr-10 focus:ring-1 focus:ring-[#137fec] 
                            outline-none dark:text-slate-200 text-zinc-700" placeholder="Password" type={showPassword ? "text" : "password"} />
                            <button onClick={togglePasswordVisibility} type="button" className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <span className="material-symbols-outlined text-[20px]">{showPassword ? <Eye /> : <EyeOff />}</span>
                            </button>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>
                    </div>

                    <input type="submit" value="Create Account" className="cursor-pointer active:scale-95  mt-4 w-full rounded-xl bg-[#137fec] px-8 py-3.5 text-sm font-bold text-white hover:bg-[#0b5ed7] transition-all shadow-sm" />
                </form>

                <div className="flex items-center justify-center gap-1.5 text-sm">
                    <p className="text-[#637588] dark:text-[#9ba8b8]">Already have an account?</p>
                    <Link href="/login" className="font-semibold text-[#137fec] hover:underline cursor-pointer" >Log in</Link>
                </div>
            </div>
            {errormsg && <p className="text-red-500 text-xs mt-1">{errormsg}</p>}
        </div>



    )
};

export default SignUpForm;