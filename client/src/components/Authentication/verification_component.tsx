import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useActivationMutation } from "redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AuthScreens, AuthScreensProps } from "navigation/authNavigator";
import Loader from "components/ui/loader";

export const Main = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const { accessToken } = useSelector((state: any) => state.auth) || {};
  const [active, { isSuccess, data, error, isLoading }] =
    useActivationMutation();
  const inputRefs = useRef([]);
  const navigation = useNavigation<AuthScreensProps>();
  const width = useWindowDimensions().width;

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Succeed !";
      ToastAndroid.show(message, ToastAndroid.SHORT);
      navigation.navigate(AuthScreens.StackLogin);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        ToastAndroid.show(errorData.data.message, ToastAndroid.SHORT);
      }
    }
  }, [isSuccess, error, data?.message]);

  const handleSubmit = async () => {
    await active({
      activation_code: code[0] + code[1] + code[2] + code[3],
      activation_token: accessToken,
    });
  };
  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Focus next input on entering a digit
    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
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
            <View className="bg-white absolute z-20 top-0 py-2 w-full">
              <View className=" flex flex-row items-center w-full p-2 ">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: width > 400 ? 30 : 20,
                  fontFamily: "semiBold",
                }}
              >
                OTP Verification
              </Text>
              <Text style={{ fontFamily: "regular" }}>
                An OTP has been sent on your email !
              </Text>
              <MaterialCommunityIcons
                name="shield-lock-outline"
                size={80}
                color="#264BAE"
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                {code.map((value, index) => (
                  <TextInput
                    key={index}
                    style={{
                      width: 50,
                      height: 50,
                      borderWidth: 1,
                      borderColor: "gray",
                      borderRadius: 5,
                      textAlign: "center",
                      fontSize: 20,
                      marginHorizontal: 5,
                    }}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(text) => handleCodeChange(text, index)}
                    value={value}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                  />
                ))}
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-[#264BAE] py-4 px-6 rounded-md mt-5"
              >
                <Text
                  className="text-white uppercase text-center"
                  style={{ fontFamily: "semiBold" }}
                >
                  Verify
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </>
      )}
    </>
  );
};
