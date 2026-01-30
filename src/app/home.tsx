
"use client"
import axios from "axios"
import { Spinner } from "@/components/ui/spinner";
import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

export default function Home() {
  const [button,isbutton]=useState(true)
  
  const router=useRouter()
  const logout=async()=>{
         try{
          isbutton(false)
          const res=await axios.post("/controller/logout",{
            withCredentials:true
          })
           toast.success("Logout Successfully", {position:"top-right",
             style:{
              backgroundColor:"#FFFFFF",
              color:"#22C55E",
              
            }
          }
           )
          if(res.data.success){
            router.replace("/login")
          }
         

          isbutton(true)
         }catch(error:any){
            toast.error(error?.response?.data?.message)
            isbutton(true)
         }
  }
  const[user,isuser]=useState("")
  useEffect(()=>{
  const fetchUser = async () => {
    try {
      // 1. Await the response
      const response = await axios.post("/controller/userinfo");
      
      // 2. Axios data is nested in the .data property
     
      isuser(response.data.data.fullname)
    } catch (error) {
      // 3. Optional: Use a more subtle UI than alert()
      console.log("Error fetching user:", error);
    }
  };

  fetchUser();
}, []);
 

  return (
    
    <div>
      <main className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 font-sans text-slate-200 min-h-screen relative overflow-hidden">
  {/* Animated background effects */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
  </div>

  <div className="relative z-10 flex flex-col gap-6 items-start justify-start py-20 mx-12 max-w-4xl">
    {/* Welcome heading with gradient */}
    <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in font-serif">
      Welcome {user}
    </div>
    
    <div className="text-xl text-zinc-400 font-light -mt-2">
      To Your Dashboard
    </div>

    {/* Subheading with subtle glow */}
    <div className="mt-8 text-4xl text-zinc-100 font-serif relative">
      <span className="relative">
        Let's Start Your Journey
        <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </span>
    </div>

    {/* Premium button */}
    <div className="mt-8 flex justify-start w-full">
      {button ? (
        <button
          onClick={logout}
          className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl 
                     font-medium text-white shadow-lg shadow-blue-500/30
                     hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105
                     active:scale-95 transition-all duration-300 ease-out
                     overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Logout
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          {/* Shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </button>
      ) : (
        <div className="px-8 py-3 bg-gradient-to-r from-blue-600/50 to-blue-500/50 rounded-xl 
                        font-medium text-white shadow-lg
                        flex gap-3 justify-center items-center cursor-not-allowed">
          <span>Processing</span>
          <Spinner />
        </div>
      )}
    </div>

    {/* Optional: Add feature cards */}
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <div className="p-6 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">Quick Start</h3>
        <p className="text-sm text-zinc-400">Get started in minutes</p>
      </div>

      <div className="p-6 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">Secure</h3>
        <p className="text-sm text-zinc-400">Your data is protected</p>
      </div>

      <div className="p-6 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10">
        <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">Premium</h3>
        <p className="text-sm text-zinc-400">Exclusive features</p>
      </div>
    </div>
  </div>
</main>
     </div>
  );
}
