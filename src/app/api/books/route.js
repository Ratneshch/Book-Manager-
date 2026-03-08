import connectDB from "@/lib/DatabaseConnection";
import { getUser } from "@/lib/getUser";
import { response } from "@/lib/helper";
import { bookModel } from "@/models/book.model";

export async function POST(request){
    try {
     await connectDB();
     const userId = await getUser();
     if(!userId){
        return response(false, 404, "user not found");
     }   

     const {title, author, tags, status} = await request.json();
     if(!title && !author){
        return response(false, 400, "title and author are required!");
     }

     const book = await bookModel.create({
        userId, title, author, tags, status
     });
     return response(true, 200, "book added successfully", book);
    } catch (error) {
        return response(false, 500, "something went wrong", error.message);
    }
}

export async function GET(){
    try {
        await connectDB();
        const userId = await getUser();

        const books = await bookModel.find({userId});

        return response(true, 200, "User's books collection", books)
    } catch (error) {
        return response(false, 500, "something went wrong", error.message);        
    }
}
