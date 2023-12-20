import express from 'express'
import {createCategory, getCategories, getCategory, updateCategory, deleteCategory} from '../controller/categoryCrud.js'
const categoryRouter = express.Router()

categoryRouter.route("/").post(createCategory).get(getCategories)
categoryRouter.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory)
export default categoryRouter