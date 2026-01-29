import { ApiRes } from "@/helpers/apiresponse";
import { ApiError } from "@/helpers/apierror";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectDB from "@/dbgonfig/db_conncetion";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";
interface VerifyTokenPayload extends JwtPayload {
  id: string;
}
export async function GET(req: NextRequest) {
   try {
      await connectDB()
      const { searchParams } = new URL(req.url)

      const verftoken = searchParams.get("token")

      if (!verftoken) {
         throw new ApiError(400, "Token is required")
      }


      const decoded_token = jwt.verify(verftoken, process.env.VERFY_TOKEN_SECRET!)as VerifyTokenPayload;

      if (!decoded_token) {
         throw new ApiError(400, "Token is invalid")
      }
      const isVerifiedUser = await User.findById(decoded_token.id)
      if (!isVerifiedUser) {
         throw new ApiError(400, "User not found")
      }
      isVerifiedUser.isVerified = true
      isVerifiedUser.verifyToken = undefined
      await isVerifiedUser.save({ validateBeforeSave: false })

      const res = NextResponse.json(new ApiRes(200, isVerifiedUser, "User verified successfully"), { status: 200 })
      res.cookies.set("VerifyToken", "", {
         httpOnly: true,
         secure: true,
         sameSite: "strict",
         maxAge: 0
      })
      return res
   } catch (error: any) {
      return NextResponse.json(new ApiError(501, error.message), { status: 501 })
   }
}
