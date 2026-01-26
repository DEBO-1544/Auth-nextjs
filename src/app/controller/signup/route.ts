import { User } from '@/models/user.model'
import { ApiError } from '@/helpers/apierror'
import { ApiRes } from '@/helpers/apiresponse'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import connectDB from '@/dbgonfig/db_conncetion'
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
         fullname: fullname.toLowerCase(),
         email: email,
         password: hashpassword,
      })
      const createdUser = await User.findById(NewUser._id).select("-password")
      if (!createdUser) {
         throw new ApiError(500, "User not created,Try again")
      }

      const Accesstoken = jwt.sign(
         {
            id: createdUser._id
         },
         process.env.ACCESS_TOKEN_SECRET as string,
         {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any
         }
      )
      const RefreshToken = jwt.sign(
         {
            id: createdUser._id
         },
         process.env.REFRESH_TOKEN_SECRET as string,
         {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any
         }
      )
      if (!Accesstoken || !RefreshToken) {
         throw new ApiError(500, "Token not generated,Try again")
      }
      createdUser.refreshToken = RefreshToken
      await createdUser.save({ validateBeforeSave: false })

      const response = NextResponse.json(new ApiRes(200, createdUser, "User registered successfully"))
      response.cookies.set("RefreshToken", RefreshToken, {
         httpOnly: true,
         secure: true,
         sameSite: "strict",
         maxAge: 10 * 24 * 60 * 60
      })
      response.cookies.set("AccessToken", Accesstoken, {
         httpOnly: true,
         secure: true,
         sameSite: "strict",
         maxAge: 1 * 24 * 60 * 60
      })
      return response



   } catch (error: any) {
      console.log(error.message)
      return NextResponse.json(new ApiError(401, error.message),{status:401})
   }

}
