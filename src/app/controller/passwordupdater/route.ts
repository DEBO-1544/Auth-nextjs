import { NextRequest,NextResponse } from "next/server";
import {User} from "@/models/user.model";
import connectToDB from "@/dbgonfig/db_conncetion";
import { ApiError } from "@/helpers/apierror";
import { ApiRes } from "@/helpers/apiresponse";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
    try {
        await connectToDB()
        const body=await request.json()
        const{password}=body
        if(!password){
            throw new ApiError(400,"Password is required")
        }
        const{searchParams}=new URL(request.url)
         const token=searchParams.get("token")
        if (!token || token === "null" || token === "undefined") {
  throw new ApiError(400, "Invalid or missing token");
}
        const user_id=jwt.verify(token,process.env.Forgotpassword_TOKEN_SECRET!)
         if(!user_id){
            throw new ApiError(404,"Token Not Matche")
         }
         const isUser=await User.findById(user_id.id)
         if(!isUser){
            throw new ApiError(404,"User not found")
         }
         const hashedPassword=await bcrypt.hash(password,10)
         isUser.password=hashedPassword
         isUser.Forgotpassword=false
         await isUser.save({validateBeforeSave:false})
         return NextResponse.json(new ApiRes(200,"User verified Forgot Password successfully"),{status:200})
       
    } catch ( error:any) {
        console.log(error)
        return NextResponse.json(new ApiError(500,error.message),{status:500})
    }
}