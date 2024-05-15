import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Colors } from "constants/index";
import { UserIcon } from "components/icons";
import { useGetOrdersQuery } from "redux/features/orders/orderApi";
import { useSelector } from "react-redux";
import Loader from "components/ui/loader";
import { useNavigation } from "@react-navigation/native";
import { AdminScreens, AdminScreensProps } from "navigation/adminNavigator";
import { useFocusEffect } from "@react-navigation/native";

interface IData {
  name: string;
  city: string;
  total: number;
}

export const OrdersAdmin = () => {
  const [selected, setSelected] = React.useState("Pending");
  const { isLoading, refetch } = useGetOrdersQuery({});
  const width = useWindowDimensions().width;
  const navigation = useNavigation<AdminScreensProps>();
  const orders = useSelector((state: any) => state.orders);
  useFocusEffect(
    React.useCallback(() => {
      const fetchOrders = async () => {
        await refetch();
      };
      fetchOrders();
    }, [])
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StatusBar backgroundColor={"white"}></StatusBar>
          <SafeAreaView className="flex-1 bg-white">
            <View className="relative flex-1  mt-5">
              <View className="flex flex-row justify-between items-center px-5">
                <View className="flex flex-row items-center bg-gray-100 rounded-2xl p-1">
                <TouchableOpacity
                    onPress={() => setSelected("Pending")}
                    className={`p-2 rounded-2xl ${
                      selected === "Pending" && "bg-white"
                    }`}
                  >
                    <Text
                      className={`${width > 500 ? "text-lg" : "text-[10px]"}`}
                      style={{ fontFamily: "regular" }}
                    >
                  Pending
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelected("Processing")}
                    className={`p-2 rounded-2xl ${
                      selected === "Processing" && "bg-white"
                    }`}
                  >
                    <Text
                      className={`${width > 500 ? "text-lg" : "text-[10px]"}`}
                      style={{ fontFamily: "regular" }}
                    >
                      Processing
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelected("Shipped")}
                    className={`p-2 rounded-2xl ${
                      selected === "Shipped" && "bg-white"
                    }`}
                  >
                    <Text
                      className={`${width > 500 ? "text-lg" : "text-[10px]"}`}
                      style={{ fontFamily: "regular" }}
                    >
                      Shipped
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelected("Delivered")}
                    className={`p-2 rounded-2xl ${
                      selected === "Delivered" && "bg-white"
                    }`}
                  >
                    <Text
                      className={`${width > 500 ? "text-lg" : "text-[10px]"}`}
                      style={{ fontFamily: "regular" }}
                    >
                      Delivered
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {orders.length === 0 && (
                <View className="flex-1 flex flex-row items-center justify-center">
                  <Text className="text-xl" style={{ fontFamily: "semiBold" }}>
                    Nothing in Orders
                  </Text>
                </View>
              )}
              {orders.length > 0 && (
                <>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    className="mt-12 "
                    data={orders.filter((e) => e.status === selected)}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(AdminScreens.StackManageOrders, {
                            param: item._id,
                          })
                        }
                        className="flex flex-row items-center w-full px-4 bg-white gap-2 mt-1 border-b border-gray-200 py-2"
                      >
                        <View>
                          <UserIcon size={40} color="black" />
                        </View>
                        <View className="flex-1">
                          <View className="flex flex-row justify-between">
                            <View>
                              <Text
                                className="text-xs"
                                style={{ fontFamily: "bold" }}
                              >
                                {item.customer.name}
                              </Text>
                            </View>
                          </View>
                          <Text
                            className="text-[10px] text-gray-500"
                            style={{ fontFamily: "regular" }}
                          >
                            {item.deliveryAddress.city}
                          </Text>
                          <View className="flex flex-row justify-between">
                            <Text
                            className="text-xs"
                              style={{
                                fontFamily: "semiBold",
                                color: Colors.gray,
                              }}
                            >{`Rs.${item.totalPrice}/-`}</Text>
                            <View className="flex flex-row gap-4 items-center"></View>
                          </View>
                        </View>
                        <View className="flex gap-2 items-center">
                          <View className=" w-12 rounded-xl bg-black ">
                            <Text
                              className="p-1 text-white text-center text-xs"
                              style={{ fontFamily: "semiBold" }}
                            >
                              {item.paymentInfo ? item.paymentInfo : "COD"}
                            </Text>
                          </View>
                          <View className="flex flex-row gap-1 items-center ">
                            <Feather name="truck" size={15} color="#FB923C" />
                            <Text
                              className=" text-orange-400 text-[10px]"
                              style={{ fontFamily: "semiBold" }}
                            >
                              {item.status}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </>
              )}
            </View>
          </SafeAreaView>
        </>
      )}
    </>
  );
};
