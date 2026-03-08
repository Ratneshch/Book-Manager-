import connectDB from "@/lib/DatabaseConnection";
import { response} from "@/lib/helper";

export async function GET() {
    try {
        await connectDB();
        return response(true, 200, "Database is connected!");
    } catch (error) {
        return response(false, 500, "Database is not connected!", error.message);
    }
}