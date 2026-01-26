import connectToDB from "@/dbgonfig/db_conncetion";
import { ApiRes } from "@/helpers/apiresponse";
import { ApiError } from "@/helpers/apierror";
import { NextResponse,NextRequest } from "next/server";
import {Userid} from "@/helpers/token"
import {User} from "@/models/user.model"
//import connectToDB from "@/dbgonfig/db_conncetion";
export async function POST(req:NextRequest) {

    await connectToDB()
    try{
        const Response= NextResponse.json(new ApiRes(200,"User logged out successfully"),{status:200})
        Response.cookies.delete("AccessToken")
        Response.cookies.delete("RefreshToken")
        const userID=Userid(req)
         const Isuser=await User.findById(userID)
         if(!Isuser){
            throw new ApiError(404,"User not found")
         }
         const Deletingtoken=await User.findByIdAndUpdate(userID,{
            $unset:{
                refreshToken:1
            }
         },{
            new:true
         })
         if(!Deletingtoken){
            throw new ApiError(404,"User not found")
         }

        return Response

    }catch(error:any){
        console.log(error)
        return NextResponse.json(new ApiError(500,error?.message), {status:500})
    }
}