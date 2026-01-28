import { NextRequest,NextResponse } from "next/server";
import {User} from "@/models/user.model";
import connectToDB from "@/dbgonfig/db_conncetion";
import { ApiError } from "@/helpers/apierror";
import { ApiRes } from "@/helpers/apiresponse";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        await connectToDB()
        const body=await request.json()
        const{password}=body
        if(!password){
            throw new ApiError(400,"Password is required")
        }
        const{searchParams}=new URL(request.url)
         const id=searchParams.get("id")
         if(!id){
            throw new ApiError(400,"Something Went Wrong")
         }
         const user=await User.findById(id)
         if(!user){
            throw new ApiError(404,"User not found")
         }
         const hashedPassword=await bcrypt.hash(password,10)
         user.password=hashedPassword
         user.Forgotpassword=false
         await user.save({validateBeforeSave:false})
         return NextResponse.json(new ApiRes(200,"User verified Forgot Password successfully"),{status:200})
       
    } catch ( error:any) {
        return NextResponse.json(new ApiError(500,error),{status:500})
    }
}