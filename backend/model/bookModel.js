import mongoose from "mongoose";
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
      coverImageURL: {
        type: String,
        required: false,
      },
      publicationDate: {
        type: Date,
        required: true,
      },
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model("book", bookSchema)
export default Book