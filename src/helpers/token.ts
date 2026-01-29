import { NextRequest } from "next/server"
import Jwt  from "jsonwebtoken"
export const Userid=(req:NextRequest)=>{
    const token=req.cookies.get("RefreshToken")
    const decodedToken=Jwt.verify(token?.value!,process.env.REFRESH_TOKEN_SECRET!)
    if(!decodedToken){
        return 
    }
    if(typeof decodedToken === "string"){
        return 
    }
    const userid=decodedToken.id
    if(!userid){
        console.log("Userid not found")
        return 
    }
    return userid
}