import connectDB from "@/lib/DatabaseConnection";
import { getUser } from "@/lib/getUser";
import { response } from "@/lib/helper";
import { bookModel } from "@/models/book.model";

export async function PUT(request, { params }) {
    try {
        await connectDB();

        const userId = await getUser();
        if (!userId) {
            return response(false, 404, "User not found!")
        }

        const {id} = await params;

        const { title, author, tags, status } = await request.json();
        const updateBook = await bookModel.findOneAndUpdate(
            {_id: id, userId,},
            { title, author, tags, status },
            { returnDocument: "after"}
        )
        console.log(updateBook)

        if (!updateBook) return response(false, 404, "Book not found!");

        return response(true, 200, "Book updated!", updateBook);
    } catch (error) {
        return response(false, 404, "Something went wrong", error.message)
    }
}

export async function DELETE(_, {params}){
    try {
        await connectDB();
        const userId = await getUser();
        if (!userId) {
            return response(false, 404, "User not found!")
        }

        const {id} = await params;

        const deleteBook = await bookModel.findOneAndDelete({_id: id, userId});

        console.log(deleteBook);

        if (!deleteBook) return response(false, 404, "Book not found!");

        return response(true, 200, "Book Deleted!", deleteBook);
    } catch (error) {
        return response(false, 404, "Something went wrong", error.message)
    }
}