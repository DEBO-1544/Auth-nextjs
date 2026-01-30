import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";
import connectToDB from "@/dbgonfig/db_conncetion";
import { Forggotpassword } from "@/helpers/forgotpass";
import { ApiError } from "@/helpers/apierror";
import { ApiRes } from "@/helpers/apiresponse";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { email } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const secret = process.env.Forgotpassword_TOKEN_SECRET;
    const expiry = Number(process.env.Forgotpassword_TOKEN_EXPIRY);

    if (!secret || !expiry) {
      throw new ApiError(500, "JWT configuration missing");
    }

    const ForgotpasswordToken = jwt.sign(
      { id: user._id.toString() },
      secret,
      { expiresIn:expiry }
    );
    if(!ForgotpasswordToken){
      throw new ApiError(500, "Failed to generate forgot password token");
    }

    user.Forgotpassword = true;
    await user.save({ validateBeforeSave: false });

    await Forggotpassword(user.email, ForgotpasswordToken, user.fullname);

    const response = NextResponse.json(
      new ApiRes(200, "Forgot password email sent successfully"),
      { status: 200 }
    );

    response.cookies.set("ForgotpasswordToken", ForgotpasswordToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: expiry, // seconds
    });

    return response;

  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json(
      new ApiError(500, message),
      { status: 500 }
    );
  }
}
