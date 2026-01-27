import { ApiRes } from "@/helpers/apiresponse";
import { ApiError } from "@/helpers/apierror";
import { sendEmail } from "@/helpers/emailsender";
import { User } from "@/models/user.model";
import { NextResponse,NextRequest } from "next/server";
import connectToDB from "@/dbgonfig/db_conncetion";


export async function GET(req:NextRequest){
    try{
          await connectToDB();
           const {searchParams}=new URL(req.url)
          const email = searchParams.get("email");
          if(!email){
            throw new ApiError(400,"Email is required");
          }
          const user = await User.findOne({email});
          if(!user){
            throw new ApiError(404,"User not found");
          }
          const SendingMailReq= await sendEmail(email,user.verifyToken,user.fullname)
          if(!SendingMailReq){
            throw new ApiError(500,"Failed to send verification email");
          }
           
          return NextResponse.json(new ApiRes(200,"Verification email sent successfully"),{status:200});

    }catch(error:any){
      return NextResponse.json(new ApiError(500,error.message),{status:500});   
    }
}
