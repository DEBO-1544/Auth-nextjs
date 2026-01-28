import { ApiRes } from "@/helpers/apiresponse";
import { ApiError } from "@/helpers/apierror";
import { sendEmail } from "@/helpers/emailsender";
import { User } from "@/models/user.model";
import { NextResponse,NextRequest } from "next/server";
import connectToDB from "@/dbgonfig/db_conncetion";
import jwt from "jsonwebtoken"

export async function GET(req:NextRequest){
    try{
          await connectToDB();
          // const {searchParams}=new URL(req.url)
          //const email = searchParams.get("email");
          const Vtoken= req.cookies.get("VerifyToken")?.value
         //givng user id
          const UserId=jwt.verify(Vtoken,process.env.VERFY_TOKEN_SECRET!) 
          const Fuser= await User.findById(UserId.id)

          if(!Fuser){
            throw new ApiError(400,"User not found");
          }
         
          
          const SendingMailReq= await sendEmail(Fuser.email,Fuser.verifyToken,Fuser.fullname)
          if(!SendingMailReq){
            throw new ApiError(500,"Failed to send verification email");
          }
           
          return NextResponse.json(new ApiRes(200,"Verification email sent successfully"),{status:200});

    }catch(error:any){
      return NextResponse.json(new ApiError(500,error.message),{status:500});   
    }
}
