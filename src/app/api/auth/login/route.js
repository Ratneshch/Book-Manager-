import connectDB from "@/lib/DatabaseConnection";
import { response } from "@/lib/helper";
import { userModel } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { zSchema } from "@/lib/zodValidation";

export async function POST(request) {
    try {
        await connectDB();

        const validationSchema = zSchema.pick({
            email: true, password: true
        })

        const payload = await request.json();

        const validatedData = validationSchema.safeParse(payload);

        if (!validatedData.success) {
            return response(false, 400, "Invalid Credentials", validatedData.error)
        }

        const { email, password } = validatedData.data;

        const user = await userModel.findOne({ email });

        if (!user) {
            return response(false, 400, "User not found");
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return response(false, 400, "Invalid Password");
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

        const res = response(true, 200, "User logged in successfully", { name: user.name, email: user.email });

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7
        })

        return res;
    } catch (error) {
        return response(false, 500, "Internal Server Error", error.message)
    }
}