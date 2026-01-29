"use client"
import {toast} from "sonner"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState,useEffect } from "react"

import axios from "axios"
import {Spinner} from "@/components/ui/spinner"
import { useRouter } from "next/navigation"

const Component_em_verfiction = () => {
//  const searchParams = useSearchParams()
   const [loading,setLoading]=useState(false)
   const [error,setError]=useState(false)
   const [isdisable,isDisable]=useState(true)
   const router = useRouter()
  
  useEffect(() => {
    
      const is=setTimeout(() => {
      isDisable(false)
    }, 120000);
    
  }, []);
  async function ResendEmail(){
    try{
       
      setLoading(true)
      const response = await axios.get(`/controller/resend`)
      toast.success("Email Resend Successfully",{position:"top-right",
        style:{
            backgroundColor:"#FFFFFF",
          color:"#22C55E",
        }
      }
      )
      setLoading(false)
      setTimeout(() => {
        isDisable(false)
      }, 120000);
      console.log(response.data)
    }catch(error:any){
      console.log(error)
      setLoading(false)
      setError(true)
      
      setTimeout(() => {
        router.push("/login")
      }, 4000);
    }
  }

  return (
    <div className=" min-h-screen w-full flex items-center justify-center bg-zinc-300">
       <div>
          <Card className=" bg-white ">
            <CardHeader>
              <h1>{error?<div className=" text-red-500 text-shadow-md/10">
                 Something Went Wrong  While Resending!
              </div>:""}</h1>
              <CardTitle className=" text-2xl font-bold text-blue-500 text-shadow-md/10">Verify Email</CardTitle>
              <CardDescription className=" text-blue-500 text-[16px] font-sans text-shadow-md/10  ">Verify your email In 10 Minutes to complete your registration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className=" text-[16px] font-semibold text-blue-500 text-shadow-md/10">Check your email for a verification link,Wait 2min to resend</p>
            </CardContent>
            <CardFooter className=" ">
             {
              loading?(
                <CardAction className=" px-10 py-2 bg-yellow-300  rounded-lg cursor-pointer
                  active:opacity-45 active:scale-95 hover:bg-yellow-400
                  transition-all duration-300 ease-in-out mt-5
                  flex gap-2 justify-center items-center text-neutral-600
                 ">
                  Processing <Spinner/>
                 </CardAction>
              ):(
                <CardAction><button disabled={isdisable ? true : false}
                  onClick={ResendEmail}
                 className="shadow-xl/10 font-medium text-neutral-600 bg-yellow-300  py-2 px-3 rounded-xl  cursor-pointer active:scale-95 hover:opacity-60 disabled:opacity-70 disabled:cursor-not-allowed"
                >Resend Verification Email</button></CardAction>
              )
             }
            </CardFooter>
          </Card>
       </div>
    </div>
  )
}

export default Component_em_verfiction