import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request){
    const token = request.cookies.get("token")?.value;
    const{pathname} = request.nextUrl;

    const AuthPage = pathname.startsWith("/auth");
    const ProtectedPage = pathname.startsWith("/dashboard");

    let validToken = false;

    if(token){
        try {
            await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY))
             validToken = true
        } catch (error) {
             validToken = false
            
        }
    }

    if(validToken && AuthPage){
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    if(!validToken && ProtectedPage){
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    return NextResponse.next();

}

export const config = {
    matcher: ["/", "/dashboard/:path*", "/auth/:path*"],
};