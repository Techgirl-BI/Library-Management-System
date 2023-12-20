import httpStatus from "http-status";
import JWT from "jsonwebtoken";
import User from "../model/userModel.js";
export const verifyUser = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Authorization failed, Token is required",
    });
    return;
  }
  
  const token = req.headers.authorization.split("")[1];
  console.log(token, "token");

  const decoded = JWT.decode(token, process.env.JWT_SECRET);
  console.log(decoded, "decoded");
  if (!decoded) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Authorization failed, Token is invalid",
    });
    return;
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Authorization failed, User not found",
    });
    return;
  }

  req.user = user;
  next();
};
