import connectDB from "@/lib/DatabaseConnection";
import { userModel } from "@/models/user.model";
import { zSchema } from "@/lib/zodValidation";
import jwt from "jsonwebtoken";
import { response } from "@/lib/helper";

export async function POST(request) {
    try {
        await connectDB();

        const validationSchema = zSchema.pick({
            name: true, email: true, password: true
        })

        const payload = await request.json();

        const validatedData = validationSchema.safeParse(payload);

        if (!validatedData.success) {
            return response(false, 400, "Invalid Credentials", validatedData.error)
        }

        const { name, email, password } = validatedData.data;

        const user = await userModel.findOne({ email });

        if (user) {
            return response(false, 400, "User already exists")
        }

        const newSignup = new userModel({
            name, email, password
        })

        await newSignup.save();

        const token = jwt.sign({ userId: newSignup._id }, process.env.SECRET_KEY, { expiresIn: "7d" })

        const res = response(true, 200, "User created successfully", { name: newSignup.name, email: newSignup.email })

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