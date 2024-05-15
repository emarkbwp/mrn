import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
  KeyboardAvoidingView,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useChangePasswordMutation } from "redux/features/auth/authApi";
import { AuthScreens, AuthScreensProps } from "navigation/authNavigator";
import { Colors } from "constants/index";
import Loader from "components/ui/loader";

const initialForm = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
interface IForgot {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type Props = {
  email: string;
  loggedIn?: boolean;
};

const ForgotPassword: React.FC<Props> = ({ email, loggedIn }) => {
  const navigation = useNavigation<AuthScreensProps>();
  const [errors, setErrors] = useState<Partial<IForgot>>({});
  const [form, setForm] = useState<Partial<IForgot>>(initialForm);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [change, { isSuccess, error, data, isLoading }] =
    useChangePasswordMutation();

  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Password changed!";
      ToastAndroid.show(message, ToastAndroid.SHORT);
      if (loggedIn) {
        navigation.goBack();
      } else {
        navigation.navigate(AuthScreens.StackLogin);
      }
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        ToastAndroid.show(errorData.data.message, ToastAndroid.SHORT);
      }
    }
  }, [isSuccess, error, data?.message]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validateForm = () => {
    let error: Partial<IForgot> = {};
    if (form.oldPassword === "") {
      error.oldPassword = "Old Password is required";
    }
    if (form.newPassword === "") {
      error.newPassword = "Must enter new password";
    }
    if (form.confirmPassword === "") {
      error.confirmPassword = "Must enter confirmPassword";
    }
    if (form.confirmPassword.length !== form.newPassword.length) {
      error.confirmPassword = "Both passwords must be same";
    } else if (form.newPassword.length < 8) {
      error.confirmPassword = "Password must be atleast 8 Characters";
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      change({ ...form, email: email });
      setForm({});
      setErrors({});
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SafeAreaView className="flex-1 px-5 bg-white">
            <StatusBar hidden />
            {!isKeyboardVisible && Object.keys(errors).length === 0 && (
              <View className="bg-white absolute  top-0 py-2 w-full">
                <View className=" flex flex-row items-center w-full p-2 ">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className=""
                  >
                    <Ionicons name="chevron-back" size={30} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <KeyboardAvoidingView
              className={`flex-1 ${height < 800 && "my-10"}`}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  className={`flex-grow-1 justify-evenly h-screen ${
                    height < 800 && Object.keys(errors).length > 0 && "my-12"
                  }`}
                >
                  <View className="flex justify-between gap-5">
                    <Text
                      className="text-lg"
                      style={{ fontFamily: "semiBold" }}
                    >
                      Change Password
                    </Text>
                    <TextInput
                      selectionColor={Colors.primary}
                      className={`rounded-md h-14 border  px-5 ${
                        errors.oldPassword
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="Old password"
                      value={form.oldPassword}
                      onChangeText={(text) =>
                        setForm({ ...form, oldPassword: text })
                      }
                      secureTextEntry
                    />
                    {errors.oldPassword && (
                      <Text
                        className={`text-red-500 ${
                          width > 400 ? "text-sm" : "text-xs"
                        }`}
                      >
                        {errors.oldPassword}
                      </Text>
                    )}
                    <TextInput
                      selectionColor={Colors.primary}
                      className={`rounded-md h-14 border  px-5 ${
                        errors.newPassword
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="New password"
                      value={form.newPassword}
                      onChangeText={(text) =>
                        setForm({ ...form, newPassword: text })
                      }
                      secureTextEntry
                    />
                    {errors.newPassword && (
                      <Text
                        className={`text-red-500 ${
                          width > 400 ? "text-sm" : "text-xs"
                        }`}
                      >
                        {errors.newPassword}
                      </Text>
                    )}
                    <TextInput
                      selectionColor={Colors.primary}
                      className={`rounded-md h-14 border px-5 ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="Confirm password"
                      value={form.confirmPassword}
                      onChangeText={(text) =>
                        setForm({ ...form, confirmPassword: text })
                      }
                      secureTextEntry
                    />
                    {errors.confirmPassword && (
                      <Text
                        className={`text-red-500 ${
                          width > 400 ? "text-sm" : "text-xs"
                        }`}
                      >
                        {errors.confirmPassword}
                      </Text>
                    )}
                    <TouchableOpacity className="bg-[#264BAE] p-4 rounded-md">
                      <Text
                        className=" text-white uppercase text-center"
                        style={{ fontFamily: "semiBold" }}
                        onPress={handleSubmit}
                      >
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
