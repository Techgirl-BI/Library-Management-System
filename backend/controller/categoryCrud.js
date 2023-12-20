import Category from "../model/categoryModel.js"
import httpStatus from "http-status"
//create new category
export const createCategory = async (req,res) => {
    const {name, description} = req.body
        const category = new Category({
          name:name,
          description:description,
        });
      
        try {
          const newCategory = await category.save();
          res.status(httpStatus.OK).json(newCategory);
        } catch (error) {
          res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }
}
//get all categories
export const getCategories = async (req,res)=> {
        const categories = await Category.find();
        if(!categories) {
            res.status(httpStatus.BAD_REQUEST).send("Cannot find Category")
            return
        }
        res.status(httpStatus.OK).json({
            status: "success",
            data: categories
        })
}
//get one category

export const getCategory = async (req,res) => {
        try {
          const id = req.params.id;
          const category = await Category.findById(id);
    
          if (!category) {
           res.status(httpStatus.NOT_FOUND).json({ message: 'Category not found' });
           return ;
          }
          res.json(category);
        } catch (error) {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
}
//update a category
export const updateCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const category = await Category.findById(id);
  
      if (!category) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Category not found' });
      }
  
                // Update the category fields
      const {name, description, coverImageURL} = req.body
      category.name = name || category.name;
      category.description = description || category.description;
      category.coverImageURL = coverImageURL || category.coverImageURL;
  
                // Save the updated category
      const updatedCategory = await category.save();
  
      res.json(updatedCategory);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

//delete a category
export const deleteCategory =async (req, res) => {
    try {
      const id = req.params.id;
  
      // Find the category by ID
      const category = await Category.findById(id);
  
      // Check if the category exists
      if (!category) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Category not found' });
      }
  
      // Remove the category from the database
      await Category.findByIdAndDelete(id);
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  };