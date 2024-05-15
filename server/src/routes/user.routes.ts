import * as express from "express";
import {
  signUp,
  activateUser,
  login,
  logout,
  updateAccessToken,
  socialAuth,
  updatePassword,
  getUserInfo,
  getAllUsers,
  deleteUser,
  updateProfileInfo,
  changePassword,
  check,
} from "../controllers/user.controller";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.middleware";

const userRouter = express.Router();
userRouter.post("/signup", signUp);
userRouter.post("/activate", activateUser);
userRouter.post("/login", login);
userRouter.get("/logout", updateAccessToken, isAuthenticated, logout);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", updateAccessToken, isAuthenticated, getUserInfo);
userRouter.post("/check", check);
userRouter.put(
  "/update-profile-info",
  updateAccessToken,
  isAuthenticated,
  updateProfileInfo
);
userRouter.post("/social-auth", socialAuth);
userRouter.put(
  "/update-password",
  updateAccessToken,
  isAuthenticated,
  updatePassword
);
userRouter.get(
  "/get-users",
  updateAccessToken,
  isAuthenticated,
  isAuthorized("admin"),
  getAllUsers
);
userRouter.post("/change-password", changePassword);
userRouter.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  isAuthorized("admin"),
  deleteUser
);
export default userRouter;
