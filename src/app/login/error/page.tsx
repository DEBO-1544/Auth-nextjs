"use client"
import Link from 'next/link'
import axios from 'axios'
import { useEffect,useState } from 'react'
const Errorpage = () => {
    
  return (
         <div className=' w-full h-screen flex items-center justify-center bg-zinc-800'>
            <div className='flex flex-col items-center justify-center gap-2  font-semibold text-4xl text-zinc-300 text-shadow-md/20'>
                <b>Something went wrong ,While Signing You In Please Try Again</b>
                <Link href="/signup"><button className='text-zinc-800 bg-zinc-300 px-4 py-2 rounded-lg'>Signup</button></Link>
                <label htmlFor="login">Already have an account?</label>
                <Link href="/login"><button className='text-zinc-800 bg-zinc-300 px-4 py-2 rounded-lg'>Login</button></Link>
            </div>
         </div>
  )
}

export default Errorpage