import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "../screens/login"; // Corrected import
import Signup from "../screens/signup"; // Corrected import
import { Verification } from "screens/verification";
import Check from "../screens/check"; // Corrected import
import ForgotPassword from "../screens/forgotPassword"; // Corrected import
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export enum AuthScreens {
  StackLogin = "Login",
  StackSignup = "Signup",
  StackVerification = "Verification",
  StackCheck = "Check",
  StackForgot = "Forgot",
}

export type AuthScreensParams = {
  [AuthScreens.StackLogin]: undefined;
  [AuthScreens.StackSignup]: undefined;
  [AuthScreens.StackVerification]: undefined;
  [AuthScreens.StackCheck]: undefined;
  [AuthScreens.StackForgot]: { param: string; loggedIn?: boolean }; // Corrected type
};

export type AuthScreensProps<
  RouteName extends keyof AuthScreensParams = AuthScreens
> = NativeStackNavigationProp<AuthScreensParams, RouteName>;

export type AuthScreensRouteProps<
  RouteName extends keyof AuthScreensParams = AuthScreens
> = RouteProp<AuthScreensParams, RouteName>;

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={AuthScreens.StackLogin}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AuthScreens.StackLogin} component={SignIn} />
      <Stack.Screen name={AuthScreens.StackSignup} component={Signup} />
      <Stack.Screen
        name={AuthScreens.StackVerification}
        component={Verification}
      />
      <Stack.Screen name={AuthScreens.StackCheck} component={Check} />
      <Stack.Screen name={AuthScreens.StackForgot} component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
