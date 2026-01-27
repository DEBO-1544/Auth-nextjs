"use client"
import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React from 'react'


const Componet = () => {
const [isdone,setisdone]=useState("loading")
const router=useRouter()
const [message,setmessage]=useState("")
const searchParams = useSearchParams();

  const token = searchParams.get("token");
   useEffect(()=>{
       async function Verifiction(){
        try {
            const res=await axios.get(`/controller/emailverify?token=${token}`)
              setisdone("success")
             setTimeout(() => {
                router.push("/login")
             }, 3000);
             console.log(res)
        } catch (error:any) {
             console.log(error.message)
             setmessage(error.message)
             setisdone("error")   
             setTimeout(() => {
                router.push("/login")
             }, 3000);         
        }
       }

   Verifiction()
   },[])


  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-zinc-300'>
       {
        isdone==="loading" &&<div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800">
        Verifying your email...
      </h2>
      <p className="text-gray-600 mt-2">
        Please wait while we complete verification.
      </p>

      <div className="mt-6 flex justify-center">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    </div>
       }
       {
        isdone==="success" && <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
      <h2 className="text-2xl font-semibold text-green-600">
        ✅ Email Verified
      </h2>
      <p className="text-gray-700 mt-3">
        Your email has been verified successfully.
      </p>
      <p className="text-gray-500 mt-2">
        Redirecting to login page...
      </p>
    </div>
       }
       {
        isdone==="error"&&<div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-2xl font-semibold text-red-600">
        ❌ Verification Failed
      </h2>
      <p className="text-gray-700 mt-3">{message}</p>

      <a
        href="/login"
        className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
       Redirect to Login
      </a>
    </div>
       }
    </div>
  )
}

export default Componet