import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "../screens/login";
import signup from "screens/signup";
import { verification } from "screens/verification";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RouteProp } from "@react-navigation/native";
import Check from "screens/check";
import ForgotPassword from "screens/forgotPassword";

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
  [AuthScreens.StackForgot]: {param:string,loggedIn?:boolean};
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
      <Stack.Screen name={AuthScreens.StackSignup} component={signup} />
      <Stack.Screen
        name={AuthScreens.StackVerification}
        component={verification}
      />
      <Stack.Screen name={AuthScreens.StackCheck} component={Check} />
      <Stack.Screen name={AuthScreens.StackForgot} component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
