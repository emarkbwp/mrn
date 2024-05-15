import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
};

const BackHeader: FC<Props> = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View className="relative bg-white">
      <View className="absolute z-20 top-2 flex flex-row items-center w-full px-5 ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-[#264BAE] p-2 rounded-full"
        >
          <Ionicons name="chevron-back" size={20} color="white" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "semiBold" }} className="mx-5">
          {title}
        </Text>
      </View>
    </View>
  );
};

export default BackHeader;
