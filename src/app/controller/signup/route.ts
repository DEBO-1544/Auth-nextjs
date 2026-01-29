import { User } from '@/models/user.model'
import { ApiError } from '@/helpers/apierror'
import { ApiRes } from '@/helpers/apiresponse'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import connectDB from '@/dbgonfig/db_conncetion'
import { sendEmail } from '@/helpers/emailsender'
export async function POST(req: NextRequest) {
   await connectDB()
   try {
      const reqbody = await req.json()
      const { fullname, email, password } = reqbody
      if (!fullname) {
         throw new ApiError(400, "Fullname is required")
      }
      if (!email) {
         throw new ApiError(400, "Email is required")
      }
      if (!password) {
         throw new ApiError(400, "Password is required")
      }
      const isUserExist = await User.findOne({ email })
      if (isUserExist) {
         throw new ApiError(400, "User already exist,Login instead")
      }
      const gensalt = await bcrypt.genSalt(10)
      const hashpassword = await bcrypt.hash(password, gensalt)
      const NewUser = await User.create({
         fullname: fullname.toUpperCase(),
         email: email,
         password: hashpassword,
      })
      const createdUser = await User.findById(NewUser._id).select("-password,-refreshToken")
      if (!createdUser) {
         throw new ApiError(500, "User not created,Try again")
      }
      const secret=process.env.VERFY_TOKEN_SECRET
      if(!secret){
         throw new ApiError(500,"JWT secret not configured");

      }
      const expiry=Number(process.env.VERFY_TOKEN_EXPIRY)
      if(!expiry){
         throw new ApiError(500,"Token expiry not configured");
      }
      const Verfiytoken=jwt.sign({id:createdUser._id},secret,{expiresIn:expiry})
      if(!Verfiytoken){
         throw new ApiError(500,"Token not created,Try again")
      }
      console.log(Verfiytoken)
     
      createdUser.verifyToken=Verfiytoken
      await createdUser.save({validateBeforeSave:false})
     
      const mailsender= await sendEmail(email,Verfiytoken,fullname)
      if(!mailsender){
         throw new ApiError(500,"Email not sent,Try again")
      }

      const response = NextResponse.json(new ApiRes(200, createdUser, "User registered successfully"),{status:200}
   )
      response.cookies.set("VerifyToken",Verfiytoken,{
         httpOnly:true,
         secure:true,
         sameSite:"strict",
         maxAge:60*60*24*7
      })
      
      return response



   } catch (error: any) {
      console.log(error.message)
      
      return NextResponse.json(new ApiError(401, error.message),{status:401})
   }

}
