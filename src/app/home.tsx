
"use client"
import axios from "axios"
import { Spinner } from "@/components/ui/spinner";
import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [button,isbutton]=useState(true)
  const router=useRouter()
  const logout=async()=>{
         try{
          isbutton(false)
          const res=await axios.post("/controller/logout")
          router.push("/signup")
          console.log(res)

          isbutton(true)
         }catch(error:any){
            alert(error?.response?.data?.message)
            isbutton(true)
         }
  }
  const[user,isuser]=useState("")
   useEffect(() => {
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
      <main className=" bg-neutral-900 font-sans text-slate-200 min-h-screen  ">
       
                 
             <div className="flex flex-col gap-2 items-start justify-start py-20 mx-12">
                  <div className=" text-5xl  text-zinc-200  text-shadow-md/20  font-serif">
                    Welcome {user} To Home Page
                  </div>
                  <div className=" mx-5 my-3 text-4xl  text-zinc-200  text-shadow-md/20  font-serif">
                    Lets Start Your Journey
                  </div>
                <div className=" w-xl flex  justify-end ">
               {  button? <div className=" px-10 py-2 bg-blue-600  rounded-lg cursor-pointer
                  active:opacity-45 active:scale-95 hover:bg-blue-400
                  transition-all duration-300 ease-in-out mt-5
                 " onClick={logout}>
                  Logout 
                 </div>: <div className=" px-10 py-2 bg-blue-600  rounded-lg cursor-pointer
                  active:opacity-45 active:scale-95 hover:bg-blue-400
                  transition-all duration-300 ease-in-out mt-5
                  flex gap-2 justify-center items-center
                 ">
                  Processing <Spinner/>
                 </div>
                 
                 
              }
              </div>
             </div>
                
                   
      </main>
    </div>
  );
}
