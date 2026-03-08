import connectDB from "@/lib/DatabaseConnection";
import { getUser } from "@/lib/getUser";
import { response } from "@/lib/helper";
import { userModel } from "@/models/user.model";

export async function GET(request){
    try {
        await connectDB();
        const userId = await getUser();

        if(!userId){
            return response(false, 404, "user not found")
        }

        const user = await userModel.findById(userId).select("-password")

        return response(true, 200, "Authenticated", { name: user.name, email: user.email });
    } catch (error) {
        return response(false, 401, "Invalid token", null);
    }
}