import * as express from "express";
import {
  GetAnalytics,
  getUserAnalytics,
} from "../controllers/analytics.controller";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.middleware";
import { updateAccessToken } from "../controllers/user.controller";

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAuthenticated,
  isAuthorized("admin"),
  getUserAnalytics
);
analyticsRouter.get(
  "/analytics",updateAccessToken,isAuthenticated,isAuthorized("Admin"),
  GetAnalytics
);

export default analyticsRouter;
