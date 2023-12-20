import  express  from "express";
const userRouter = express.Router()
import { createUser, getUsers, getUser, updateUser, deleteUser, loginUser, userProfileUpload } from "../controller/userCrud.js";
import { validationMiddleware } from "../middleware/validation.js";
import { createUserSchema, getUserSchema, loginUserSchema } from "../controller/userSchema.js";
import { verifyUser } from "../middleware/verifyUser.js";
import {upload} from "../utils/multer.js"

userRouter.route("/").post(validationMiddleware(createUserSchema), createUser).get(getUsers)
userRouter.route("/:id").get(validationMiddleware(getUserSchema, "QUERY"),getUser).patch(verifyUser, updateUser).delete(verifyUser, deleteUser)
userRouter.route("/login").post(validationMiddleware(loginUserSchema), loginUser)
userRouter.route("/update-profile").patch(verifyUser, upload.single("avatar"), userProfileUpload)

export default userRouter 
