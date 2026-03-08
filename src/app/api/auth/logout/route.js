import { response } from "@/lib/helper";

export async function POST(){
  try {
    let res = response(true, 200, "User logged out successfully");
    res.cookies.set("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 0
    })
    return res;    
  } catch (error) {
    return response(false, 500, "Internal Server Error", error.message)
  }    
}