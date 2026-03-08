import mongoose from "mongoose"

const bookSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type: String,
        trim: true,
        require: true
    },
    author:{
        type: String,
        trim: true,
        require: true
    },
    tags:{
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ["Want to Read", "Reading", "Completed"],
        default: "Want to Read" 
    }
}, {timestamps: true});

export const bookModel = mongoose.models.Book || new mongoose.model("Book", bookSchema);