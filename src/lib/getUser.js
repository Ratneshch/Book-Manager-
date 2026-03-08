import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export const getUser = async () => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value

    if (!token) {
        return null
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded.userId;

    } catch (error) {
        return null
    }
}