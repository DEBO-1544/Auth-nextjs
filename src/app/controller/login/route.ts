import connectToDB from "@/dbgonfig/db_conncetion";
import { ApiRes } from "@/helpers/apiresponse";
import { ApiError } from "@/helpers/apierror";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function  POST(req:NextRequest){
         await connectToDB()
         console.log("Login")
         try {
            console.log("excuting")
              const reqbody=await req.json()
              const{email,password}=reqbody;
              if(!email){
                throw new ApiError(401,"Email is required")
              }
              if(!password){
                throw new ApiError(401,"Password is required")
              }
              const isuserexist=await User.findOne({email});
              if(!isuserexist){
                throw new ApiError(401,"User not found")
              }
              const ispasswordmatch=await bcrypt.compare(password,isuserexist.password)
              if(!ispasswordmatch){
                throw new ApiError(401,"Invalid credentials")
            
              }
               const Accesstoken=jwt.sign({
                id:isuserexist._id
               },process.env.ACCESS_TOKEN_SECRET as string,{
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY as any
               })
               const RefreshToken=jwt.sign({
                id:isuserexist._id
               },process.env.REFRESH_TOKEN_SECRET as string,{
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY as any
               })
               if(!Accesstoken || !RefreshToken){
                throw new ApiError(500,"Token not generated,Try again")
               }
               isuserexist.refreshToken=RefreshToken
               await isuserexist.save({validateBeforeSave:false})
               const response=NextResponse.json(new ApiRes(200,isuserexist,"User logged in successfully"))
               response.cookies.set("RefreshToken",RefreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:"strict",
                maxAge:10*24*60*60
               })
               response.cookies.set("AccessToken",Accesstoken,{
                httpOnly:true,
                secure:true,
                sameSite:"strict",
                maxAge:1*24*60*60
               })
               return response



         } catch (error:any) {
            console.log(error)
            return NextResponse.json(new ApiError(401,error.message),{status:401})
         }
}
