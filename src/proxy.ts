import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { Userid } from "./helpers/token";
import connectDB from "./dbgonfig/db_conncetion";
import { User } from "@/models/user.model";

async function Proxy(req: NextRequest) {
    try {
        await connectDB()

        const Actoken = req.cookies.get("AccessToken")?.value
        const Rtoken = req.cookies.get("RefreshToken")?.value
        const path = req.nextUrl.pathname
        const forpublic = path === "/login" || path === "/signup"

        // If user is on public pages and has both tokens, redirect to home
        if (forpublic) {
            if (Actoken && Rtoken) {
                return NextResponse.redirect(new URL("/", req.url))
            }
            // Allow access to login/signup pages
            return NextResponse.next()
        }

        // For protected routes (home page)
        if (path === "/") {
            // If no tokens at all, redirect to signup
            if (!Actoken && !Rtoken) {
                return NextResponse.redirect(new URL("/signup", req.url))
            }

            // If access token is missing but refresh token exists, try to refresh
            if (!Actoken && Rtoken) {
                try {
                    // Verify refresh token
                    const decoded = jwt.verify(Rtoken, process.env.REFRESH_TOKEN_SECRET!) as { id: string }

                    // Get user from database
                    const isUserExist = await User.findById(decoded.id)

                    if (!isUserExist) {
                        console.log("User not found")
                        return NextResponse.redirect(new URL("/signup", req.url))
                    }

                    // Generate new access token
                    const NewAccessToken = jwt.sign(
                        { id: isUserExist._id },
                        process.env.ACCESS_TOKEN_SECRET!,
                        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
                    )

                    if (!NewAccessToken) {
                        console.log("Something went wrong while generating access token")
                        return NextResponse.redirect(new URL("/signup", req.url))
                    }

                    // Create response and set new access token
                    const response = NextResponse.next()
                    response.cookies.set("AccessToken", NewAccessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "strict",
                        maxAge: 15 * 60 * 1000
                    })

                    return response
                } catch (error) {
                    console.log("Error verifying refresh token:", error)
                    // Invalid refresh token, redirect to signup
                    return NextResponse.redirect(new URL("/signup", req.url))
                }
            }

            // If access token exists, verify it
            if (Actoken) {
                try {
                    jwt.verify(Actoken, process.env.ACCESS_TOKEN_SECRET!)
                    return NextResponse.next()
                } catch (error) {
                    // Access token is invalid/expired
                    if (Rtoken) {
                        // Try to refresh using refresh token
                        try {
                            const decoded = jwt.verify(Rtoken, process.env.REFRESH_TOKEN_SECRET!) as { id: string }
                            const isUserExist = await User.findById(decoded.id)

                            if (!isUserExist) {
                                return NextResponse.redirect(new URL("/signup", req.url))
                            }

                            const NewAccessToken = jwt.sign(
                                { id: isUserExist._id },
                                process.env.ACCESS_TOKEN_SECRET!,
                                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
                            )

                            const response = NextResponse.next()
                            response.cookies.set("AccessToken", NewAccessToken, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === "production",
                                sameSite: "strict",
                                maxAge: 24 * 60 * 60
                            })

                            return response
                        } catch (refreshError) {
                            console.log("Error refreshing token:", refreshError)
                            return NextResponse.redirect(new URL("/signup", req.url))
                        }
                    } else {
                        // No refresh token available
                        return NextResponse.redirect(new URL("/signup", req.url))
                    }
                }
            }
        }

        return NextResponse.next()
    } catch (error) {
        console.error("Proxy error:", error)
        return NextResponse.redirect(new URL("/signup", req.url))
    }
}
export default Proxy

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/"
        
    ]
}