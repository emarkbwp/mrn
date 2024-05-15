import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  FlatList,
  Image,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { Chart } from "components/ui/lineChart";

export const AnalyticsAdmin = () => {
  const [selected, setSelected] = React.useState("Today");
  const width = useWindowDimensions().width;
  const barData = [
    { value: 250, label: "M" },
    { value: 500, label: "T", frontColor: "#177AD5" },
    { value: 745, label: "W", frontColor: "#177AD5" },
    { value: 320, label: "T" },
    { value: 600, label: "F", frontColor: "#177AD5" },
    { value: 256, label: "S" },
    { value: 300, label: "S" },
    { value: 745, label: "W", frontColor: "#177AD5" },
    { value: 320, label: "T" },
    { value: 600, label: "F", frontColor: "#177AD5" },
    { value: 256, label: "S" },
    { value: 300, label: "S" },
  ];

  return (
    <>
      <StatusBar backgroundColor={"white"}></StatusBar>
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="relative flex-1 flex gap-5  mt-5 px-5">
          <Text className="" style={{ fontFamily: "bold" }}>
            Orders Analytics
          </Text>
          <View className="flex flex-row justify-end items-center px-5">
            <View className="flex flex-row items-center bg-gray-100 rounded-2xl p-1">
              <TouchableOpacity
                onPress={() => setSelected("Today")}
                className={`p-2 rounded-2xl ${
                  selected === "Today" && "bg-white"
                }`}
              >
                <Text
                  className={`${width > 500 ? "text-lg" : "text-[10px]"}`}
                  style={{ fontFamily: "regular" }}
                >
                  Today
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelected("Weekly")}
                className={`p-2 rounded-2xl ${
                  selected === "Weekly" && "bg-white"
                }`}
              >
                <Text
                  className={`${width > 500 ? "text-lg" : "text-[10px]"}`}
                  style={{ fontFamily: "regular" }}
                >
                  Weekly
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelected("Monthly")}
                className={`p-2 rounded-2xl ${
                  selected === "Monthly" && "bg-white"
                }`}
              >
                <Text
                  className={`${width > 500 ? "text-lg" : "text-[10px]"}`}
                  style={{ fontFamily: "regular" }}
                >
                  Monthly
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <BarChart
            barWidth={width > 500 ? 16 : 4}
            noOfSections={3}
            barBorderRadius={4}
            frontColor="lightgray"
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
          />
          <Text className="" style={{ fontFamily: "bold" }}>
            Sales
          </Text>
          <View className="flex flex-row justify-end items-center px-5">
            <View className="flex flex-row items-center bg-gray-100 rounded-2xl p-1">
              <TouchableOpacity
                onPress={() => setSelected("Today")}
                className={`p-2 rounded-2xl ${
                  selected === "Today" && "bg-white"
                }`}
              >
                <Text
                  className={`${width > 500 ? "text-lg" : "text-[10px]"}`}
                  style={{ fontFamily: "regular" }}
                >
                  Today
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelected("Weekly")}
                className={`p-2 rounded-2xl ${
                  selected === "Weekly" && "bg-white"
                }`}
              >
                <Text
                  className={`${width > 500 ? "text-lg" : "text-[10px]"}`}
                  style={{ fontFamily: "regular" }}
                >
                  Weekly
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelected("Monthly")}
                className={`p-2 rounded-2xl ${
                  selected === "Monthly" && "bg-white"
                }`}
              >
                <Text
                  className={`${width > 500 ? "text-lg" : "text-[10px]"}`}
                  style={{ fontFamily: "regular" }}
                >
                  Monthly
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Chart />
          <View className='mb-16'>
                    <Text className=' mb-5' style={{ fontFamily: "semiBold" }}>Sales this week</Text>
                    <View className='flex flex-row border-b border-t border-gray-200 py-5'>
                        <View className='w-[15%]'><Text  style={{ fontFamily: "semiBold" }} className={`text-center ${width > 500 && "text-xs"}`}>No</Text></View>
                        <View className='flex-1'><Text  style={{ fontFamily: "semiBold" }} className={`${width > 500 && "text-xs"}`}>Product Name</Text></View>
                        <View className='w-[15%]'><Text  style={{ fontFamily: "semiBold" }} className={`${width > 500 && "text-xs"}`}>Sold</Text></View>
                    </View>
                    <FlatList data={[]} renderItem={({ item }) =>
                        <View className='flex flex-row py-5 border-b border-gray-200 items-center'>
                            <View className='w-[15%] '><Text style={{ fontFamily: "regular" }} className={`text-center ${width > 500 && "text-lg"}`}>{item.id}</Text></View>
                            <View className='flex-1 flex-row gap-2 items-center'><Image style={{ height: 30, width: 30, borderRadius: 3 }} source={{ uri: item.image }} /><Text className={width > 500 && "text-lg"} style={{ fontFamily: "regular" }}>{item.title}</Text></View>
                            <View className='w-[15%]'><Text className={`${width > 500 && "text-lg"}`} style={{ fontFamily: "regular" }}>{item.price}</Text></View>
                        </View>
                    } />

                </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
