import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  UsersIcon,
  CartIcon,
  ProductIcon,
  SalesIcon,
} from "components/icons/index";
import { BarChart } from "react-native-gifted-charts";
import { useGetAnalyticsQuery } from "redux/features/analytics/analyticsApi";
import Loader from "components/ui/loader";
import { useSelector } from "react-redux";
import { IProducts, User } from "types/data";

export const OverviewAdmin = () => {
  const { isLoading } = useGetAnalyticsQuery({});
  const analytics = useSelector((state: any) => state.analytics);
  const allProducts: IProducts[] = useSelector(
    (state: any) => state.allProducts
  );

  const [selected, setSelected] = React.useState("Today");
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

  const width = useWindowDimensions().width;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView className="flex-1 bg-white px-2">
          <StatusBar backgroundColor={"transparent"} />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            className="flex-1 flex  gap-10"
          >
            <Text
              className={`mb-[-30px]  mt-5 ${
                width > 400 ? "text-lg" : "text-md"
              }`}
              style={{ fontFamily: "semiBold" }}
            >
              Dashboard
            </Text>
            <View className="flex flex-row flex-wrap gap-2 justify-center">
              <View
                className={`bg-[#E9F6FF] ${
                  width < 400 ? "h-28 w-36 pl-4" : "h-36 w-44 pl-8"
                } rounded-md justify-center items-start`}
              >
                <View className="flex flex-row gap-2 items-center justify-center">
                  <View className="bg-white p-2 rounded-full">
                    <UsersIcon color={"#177AD5"} />
                  </View>
                  <Text
                    className={`${width < 400 ? "text-md" : "text-xl"}`}
                    style={{ fontFamily: "bold" }}
                  >
                    {analytics.totalUsers}
                  </Text>
                </View>
                <Text
                  className={`text-gray-500 mt-2 ${
                    width > 400 ? "text-lg" : "text-xs"
                  }`}
                  style={{ fontFamily: "regular" }}
                >
                  Total Accounts
                </Text>
              </View>
              <View
                className={`bg-[#E9F6FF] ${
                  width < 400 ? "h-28 w-36 pl-4" : "h-36 w-44 pl-8"
                } rounded-md justify-center items-start`}
              >
                <View className="flex flex-row gap-2 items-center justify-center">
                  <View className="bg-white p-2 rounded-full">
                    <CartIcon color={"#177AD5"} />
                  </View>
                  <Text
                    className={`${width < 400 ? "text-md" : "text-xl"}`}
                    style={{ fontFamily: "bold" }}
                  >
                    {analytics.totalOrders}
                  </Text>
                </View>
                <Text
                  className={`text-gray-500 mt-2 ${
                    width > 400 ? "text-lg" : "text-xs"
                  }`}
                  style={{ fontFamily: "regular" }}
                >
                  Total Orders
                </Text>
              </View>
              <View
                className={`bg-[#E9F6FF] ${
                  width < 400 ? "h-28 w-36 pl-4" : "h-36 w-44 pl-8"
                } rounded-md justify-center items-start`}
              >
                <View className="flex flex-row gap-2 items-center justify-center">
                  <View className="bg-white p-2 rounded-full">
                    <SalesIcon color={"#177AD5"} />
                  </View>
                  <Text
                    className={`${width < 400 ? "text-md" : "text-xl"}`}
                    style={{ fontFamily: "bold" }}
                  >
                    {analytics.totalSales ? analytics.totalSales : 0}
                  </Text>
                </View>
                <Text
                  className={`text-gray-500 mt-2 ${
                    width > 400 ? "text-lg" : "text-xs"
                  }`}
                  style={{ fontFamily: "regular" }}
                >
                  Total Sales
                </Text>
              </View>
              <View
                className={`bg-[#E9F6FF] ${
                  width < 400 ? "h-28 w-36 pl-4" : "h-36 w-44 pl-8"
                } rounded-md justify-center items-start`}
              >
                <View className="flex flex-row gap-2 items-center justify-center">
                  <View className="bg-white p-2 rounded-full">
                    <ProductIcon color={"#177AD5"} />
                  </View>
                  <Text
                    className={`${width < 400 ? "text-md" : "text-xl"}`}
                    style={{ fontFamily: "bold" }}
                  >
                    {analytics.totalProducts}
                  </Text>
                </View>
                <Text
                  className={`text-gray-500 mt-2 ${
                    width > 400 ? "text-lg" : "text-xs"
                  }`}
                  style={{ fontFamily: "regular" }}
                >
                  Total Products
                </Text>
              </View>
            </View>
            <View className="border-t border-b border-gray-200 py-2">
              <View className="flex flex-row justify-between items-center mb-5">
                <Text
                  style={{ fontFamily: "semiBold" }}
                  className={`${width > 400 ? "text-lg" : "text-md"}`}
                >
                  Overview
                </Text>
                <View className="flex flex-row items-center bg-[#E9F6FF] rounded-2xl p-1">
                  <TouchableOpacity
                    onPress={() => setSelected("Today")}
                    className={`p-2 rounded-2xl ${
                      selected === "Today" && "bg-[#264BAE]"
                    }`}
                  >
                    <Text
                      className={`${width > 400 ? "text-lg" : "text-[10px]"} ${
                        selected === "Today" && "text-white"
                      }`}
                      style={{ fontFamily: "regular" }}
                    >
                      Today
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelected("Weekly")}
                    className={`p-2 rounded-2xl ${
                      selected === "Weekly" && "bg-[#264BAE]"
                    }`}
                  >
                    <Text
                      className={`${width > 400 ? "text-lg" : "text-[10px]"} ${
                        selected === "Weekly" && "text-white"
                      }`}
                      style={{ fontFamily: "regular" }}
                    >
                      Weekly
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelected("Monthly")}
                    className={`p-2 rounded-2xl ${
                      selected === "Monthly" && "bg-[#264BAE]"
                    }`}
                  >
                    <Text
                      className={`${width > 400 ? "text-lg" : "text-[10px]"} ${
                        selected === "Monthly" && "text-white"
                      }`}
                      style={{ fontFamily: "regular" }}
                    >
                      Monthly
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <BarChart
                barWidth={width > 400 ? 16 : 4}
                noOfSections={3}
                barBorderRadius={4}
                frontColor="lightgray"
                data={barData}
                yAxisThickness={0}
                xAxisThickness={0}
              />
            </View>
            <View className="mb-16">
              <Text
                className={`${width > 400 ? "text-lg" : "text-md"} mb-5`}
                style={{ fontFamily: "semiBold" }}
              >
                Sales this week
              </Text>
              <View className="flex flex-row border-b border-t border-gray-200 py-5">
                <View className="w-[15%]">
                  <Text
                    style={{ fontFamily: "semiBold" }}
                    className={`text-center text-xs`}
                  >
                    No
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    style={{ fontFamily: "semiBold" }}
                    className={`text-xs`}
                  >
                    Product Name
                  </Text>
                </View>
                <View className="w-[15%]">
                  <Text
                    style={{ fontFamily: "semiBold" }}
                    className={`text-xs`}
                  >
                    Sold
                  </Text>
                </View>
              </View>
              <FlatList
                data={allProducts}
                renderItem={({ item }) => (
                  <View className="flex flex-row py-5 border-b border-gray-200 items-center">
                    <View className="w-[15%] ">
                      <Text
                        style={{ fontFamily: "regular" }}
                        className={`text-center ${width > 400 && "text-lg"}`}
                      >
                        {item.__v}
                      </Text>
                    </View>
                    <View className="flex-1 flex-row gap-2 items-center">
                      <Image
                        style={{ height: 30, width: 30, borderRadius: 3 }}
                        source={{ uri: item.image.url }}
                      />
                      <Text
                        className={width > 400 && "text-lg"}
                        style={{ fontFamily: "regular" }}
                      >
                        {item.title}
                      </Text>
                    </View>
                    <View className="w-[15%]">
                      <Text
                        className={`${width > 400 && "text-lg"}`}
                        style={{ fontFamily: "regular" }}
                      >
                        {item.sold}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};
