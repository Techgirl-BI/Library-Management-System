import Book from "../model/bookModel.js"
import httpStatus from "http-status"

//create a book

export const createBook = async (req,res) => {
    const data = req.body
    const bookIdExists = await Book.findOne({
        id:data.id
    })
    if(bookIdExists){
       return res.status(httpStatus.BAD_REQUEST).send("Book already exists")
    }
    const {title,
        author,
        description,
        category,
        coverImageURL,
        publicationDate} = data
  const createdBook = await Book.create({
    title,
    author,
    description,
    category,
    coverImageURL,
    publicationDate
  })
  res.status(httpStatus.CREATED).send("Book created succesfully")
}
//get all books
export const getBooks = async (req,res)=>{
    const books = await Book.find({})
    res.status(httpStatus.OK).json({
        status: "success",
        data: books
    })
}

//get a book
export const getBook = async (req,res)=>{
    const {id} = req.params
    const book = await Book.findById(id)
    if(!book){
        return res.status(httpStatus.NOT_FOUND).send("Book Not Found")
    }
    res.status(httpStatus.OK).send(book)
}
//update book
export const updateBook = async (req,res) => {
    const {title, author, description, category, coverImageURL, publicationDate} = req.body
const {id} = req.params
const book = await Book.findById(id)
if(!book){
    return res.status(httpStatus.NOT_FOUND).send("Book not found")
}
const titleExists = await Book.findOne({title:title})
const authorExists = await Book.findOne({author:author})
if(titleExists && authorExists){
    return res.status(httpStatus.BAD_REQUEST).send("Book with title and author exists")
}

const updatedBook = await Book.findByIdAndUpdate(id,{
    title:title, author:author, description:description, category:category, coverImageURL:coverImageURL, publicationDate:publicationDate
}, {new: true})
res.status(httpStatus.OK).json({
    status: "success",
    data: updatedBook
})
}
//delete book
export const deleteBook = async (req,res)=>{
    const {id} = req.params
    const book = await Book.findById(id)
    if(!book){
        return res.status(httpStatus.NOT_FOUND).send("Book not found")
    }
    await Book.findByIdAndDelete(id)
    res.status(httpStatus.OK).send("Book deleted successfully")
}