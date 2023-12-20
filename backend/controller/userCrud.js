import User from "../model/userModel.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { jwtToken } from "../utils/generateToken.js"

export const createUser = async (req, res) => {
  const data = req.body;
  const emailExist = await User.findOne({
    email: data.email,
  });
  if (emailExist) {
    res.status(httpStatus.BAD_REQUEST).send("User with email already exist");
    return;
  }

  const usernameExist = await User.findOne({
    username: data.username,
  });
  if (usernameExist) {
    res.status(httpStatus.BAD_REQUEST).send("User with username already exist");
    return;
  }

  const saltRound = 12;
  const hash = await bcrypt.hash(data.password, saltRound);

  const createdUser = await User.create({
    username: data.username,
    password: hash,
    email: data.email,
  });

  res.status(httpStatus.CREATED).json({
    message: "success",
    data: createdUser,
  });
};

export const loginUser = async (req, res) => {
  const data = req.body;

  const userExist = await User.findOne({
    email: data.email,
  });
  if (!userExist) {
    res.status(httpStatus.NOT_FOUND).send("User record not found");
    return;
  }
  const isConfirmed = await ComparePassword(data.password, userExist.password);
  if (!isConfirmed) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Credentials not confirmed"
    });
    return;
  }
  res.status(httpStatus.OK).json({
    status: "success",
    data: userExist,
    token: jwtToken(userExist._id, userExist.email) 
  });
};
async function ComparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
export const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(httpStatus.OK).send(users);
};
export const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(httpStatus.NOT_FOUND).send("User with id not found");
    return;
  }
  res.status(httpStatus.OK).send(user);
};

export const updateUser = async (req, res) => {
  const { email, password } = req.body;
  const { id } = req.params;
  const userFound = await User.findOne({ _id: id });
  if (!userFound) {
    res.status(httpStatus.NOT_FOUND).send("User with Id not found");
    return;
  }

  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    res
      .status(httpStatus.NOT_FOUND)
      .send("User with email already exist, please provide a unique ");
    return;
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { email: email, password: password },
    { new: true }
  );

  res.status(httpStatus.OK).send(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const foundUser = await User.findOne({ _id: id });
  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).send("User does not exists");
    return;
  }
  await User.findByIdAndDelete(id);
  res.status(httpStatus.OK).send(`User with id ${id} deleted successfully`);
};

export const userProfileUpload = async (req, res) => {
  const userId = req.user.id;
  console.log(req.file, "req.file");

  const foundUser = await User.findOne({ _id: userId });
  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User not found",
    });
    return;
  }

  //remove old file from server
  try {
    const filePresent = await readText(`public/${foundUser.avatar}`);
    console.log(filePresent, "filePresent");
    if (filePresent) {
      await deleteText(`public/${foundUser.avatar}`);
    }

    const userWithImageUpload = await User.findByIdAndUpdate(
      { _id: userId },
      { avatar: req.file.filename },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      status: "success",
      data: userWithImageUpload,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      data: error,
    });
  }
};