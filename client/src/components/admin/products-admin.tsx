import {
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState, FC } from "react";
import { IProducts } from "types/data";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDeleteProductMutation } from "redux/features/product/productApi";
import { useGetAllProductsQuery } from "redux/features/product/productApi";
import { AdminScreens, AdminScreensProps } from "navigation/adminNavigator";

export const ProductsAdmin = () => {
  const navigation = useNavigation<AdminScreensProps<AdminScreens>>();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Partial<IProducts[]>>([]);
  const [delProduct, { isSuccess, error, data, isLoading }] =
    useDeleteProductMutation();

  const {
    refetch,
    isLoading: isLoadingProducts,
    data: allProducts,
  } = useGetAllProductsQuery({});
  const width = useWindowDimensions().width;

  useEffect(() => {
    if (allProducts) {
      let filteredProducts = allProducts.products;

      if (search !== "") {
        filteredProducts = allProducts.products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      setProducts(filteredProducts);
    }
  }, [allProducts, search]);

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Product Removed!";
      ToastAndroid.show(message, ToastAndroid.SHORT);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        ToastAndroid.show(errorData.data.message, ToastAndroid.SHORT);
      }
    }
  }, [isSuccess, error, data?.message]);

  const handleRemove = async (id: string) => {
    const updatedData = { id: id };
    await delProduct(updatedData);
  };

  const deleteProduct = (id: string) => {
    Alert.alert(
      "Are you Sure ?",
      "This will remove the product from the list.",
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Product Not Removed"),
          style: "destructive",
        },
        { text: "delete", onPress: () => handleRemove(id) },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-3">
      <StatusBar barStyle="dark-content" backgroundColor={"transparent"} />
      <View className="flex gap-5 justify-around">
        <View className="flex flex-row justify-between items-center px-5">
          <Text className="" style={{ fontFamily: "semiBold" }}>
            Product List
          </Text>
          <FontAwesome
            onPress={() => navigation.navigate(AdminScreens.StackAddProduct)}
            name="plus-square-o"
            size={24}
            color="black"
          />
        </View>
        <View className="relative px-3 bg-gray-200 rounded-xl flex flex-row items-center justify-between gap-2">
          {search !== "" && (
            <TouchableOpacity
              onPress={() => setSearch("")}
              className="absolute right-5 z-30 bg-white p-1 rounded-full"
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          )}
          <Ionicons name="search-outline" size={24} color="black" />
          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Search"
            className="w-full h-10"
          />
        </View>
        {allProducts && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={({ item }) => (
              <View className="flex flex-row py-5 border-b border-gray-200 items-center justify-between">
                <View className="w-[15%] ">
                  {item.image && (
                    <Image
                      style={{ height: 50, width: 50, borderRadius: 3 }}
                      source={{ uri: item.image.url }}
                    />
                  )}
                </View>
                <View className="">
                  <Text
                    className={width > 500 && "text-xs"}
                    style={{ fontFamily: "semiBold" }}
                  >
                    {item.title}
                  </Text>
                  <View className="flex flex-row gap-2 items-center">
                    <Text
                      style={{ fontFamily: "semiBold" }}
                      className="text-[10px] text-gray-500"
                    >{`Rs.${item.price}`}</Text>
                    <View className="h-1 w-1 rounded-full bg-gray-500"></View>
                    <Text
                      style={{ fontFamily: "semiBold" }}
                      className="text-[10px] text-gray-500"
                    >{`${item.stockQuantity} in stock`}</Text>
                  </View>
                </View>
                <View className="w-[30%] flex flex-row items-center gap-4">
                  <Feather
                    onPress={() =>
                      navigation.navigate(AdminScreens.StackEditProduct, {
                        param: item._id,
                      })
                    }
                    name="edit"
                    size={24}
                    color="black"
                  />
                  <AntDesign
                    onPress={() => deleteProduct(item._id)}
                    name="delete"
                    size={24}
                    color="black"
                  />
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
