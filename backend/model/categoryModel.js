import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
      },
      description: {
        type: String,
        required: true,
      },
      coverImageURL: {
        type: String,
        required: false,
      },
      creationDate: {
        type: Date,
        default: Date.now,
      },
    },
    {
        timestamps: true,
      }
    );
const Category = mongoose.model("category", categorySchema)
export default Category