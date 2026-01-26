
import { NextRequest,NextResponse } from "next/server";
import connectToDB from "@/dbgonfig/db_conncetion";
import {User} from "@/models/user.model"
import {ApiRes} from "@/helpers/apiresponse"
import {ApiError} from "@/helpers/apierror"
import {Userid} from "@/helpers/token"
export async function POST(req:NextRequest){
     
      try{
        await connectToDB()
         const userid=Userid(req)
         if(!userid){
          throw new ApiError(401,"Unauthorized")
         }
        const user=await User.findById(userid).select("-password -refreshToken")
        console.log(user)
        if(!user){
          throw new ApiError(404,"User not found")
        }
        return NextResponse.json(new ApiRes(200,user,"User found"),{status:200})
      }catch(error:any){
        console.log(error)
        return NextResponse.json(new ApiError(500,error), {status:500})
      }

}
