import React from "react";
import ForgotComponent from "../components/Authentication/forgotPassword_component";
import { useRoute } from "@react-navigation/native";
import { AuthScreens, AuthScreensRouteProps } from "navigation/authNavigator";

const ForgotPassword = () => {
  const id = useRoute<AuthScreensRouteProps<AuthScreens.StackForgot>>();
  return (
    <ForgotComponent email={id.params.param} loggedIn={id.params.loggedIn} />
  );
};

export default ForgotPassword;
