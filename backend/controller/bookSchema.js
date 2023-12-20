import Joi from "joi"
export const createBookSchema = Joi.object({
    title:Joi.string().required(),
    author:Joi.string().required(),
    description:Joi.string().required(),
    category:Joi.string().required(),
    coverImageURL:Joi.string().uri(),
    publicationYear:Joi.number().min(4).max(4)
})