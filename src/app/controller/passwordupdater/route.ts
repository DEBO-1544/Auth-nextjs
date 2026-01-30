import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";
import connectToDB from "@/dbgonfig/db_conncetion";
import { ApiError } from "@/helpers/apierror";
import { ApiRes } from "@/helpers/apiresponse";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

interface ForgotPasswordTokenPayload extends JwtPayload {
  id: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { password } = await request.json();

    if (!password) {
      throw new ApiError(400, "Password is required");
    }

    const { searchParams } = new URL(request.url);
    const token =decodeURIComponent(
      searchParams.get("token") || ""
    );

    if (!token || token === "null" || token === "undefined") {
      throw new ApiError(400, "Invalid or missing token");
    }

    const secret = process.env.Forgotpassword_TOKEN_SECRET;
    if (!secret) {
      throw new ApiError(500, "JWT secret not configured");
    }

    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string" || !("id" in decoded)) {
      throw new ApiError(400, "Invalid token payload");
    }

    const { id } = decoded as ForgotPasswordTokenPayload;

    const isUser = await User.findById(id);
    if (!isUser) {
      throw new ApiError(404, "User not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    isUser.password = hashedPassword;
    isUser.Forgotpassword = false;

    await isUser.save({ validateBeforeSave: false });

    return NextResponse.json(
      new ApiRes(200, "Password reset successfully"),
      { status: 200 }
    );

  } catch (error:any) {
    console.error(error);

    if (error instanceof ApiError) {
      return NextResponse.json(
        new ApiError(error.statusCode, error.message),
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      new ApiError(500, error.message),
      { status: 500 }
    );
  }
}
