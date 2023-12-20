import express from 'express'
const bookRouter = express.Router()
import { createBook, deleteBook, getBook, getBooks, updateBook } from '../controller/bookCRUD.js'

bookRouter.route("/").post(createBook).get(getBooks)
bookRouter.route("/:id").get(getBook).patch(updateBook).delete(deleteBook)
export default bookRouter  