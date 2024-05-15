import React, { FC, useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  Text,
  FlatList,
  TextInput,
  useWindowDimensions,
  ToastAndroid,
  Keyboard,
} from "react-native";
import { storeData, deleteCart } from "hooks/asyncStore";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import ProductCarousal from "components/ui/productCarousal";
import { MainScreenProps, MainScreens } from "navigation/mainNavigator";
import { useSelector } from "react-redux";
import { IProducts } from "types/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAddReviewMutation } from "redux/features/review/reviewApi";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "constants/index";
import Loader from "components/ui/loader";

type Props = {
  id: string;
};

const Main: FC<Props> = ({ id }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(1);
  const [errors, setErrors] = useState("");
  const navigation = useNavigation<MainScreenProps>();
  const [selectedOption, setSelectedOption] = useState("manufacturer");
  const [review, setReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(3);
  const [allData, setAllData] = useState({});
  const { user } = useSelector((state: any) => state.auth);
  const [product, setProduct] = useState<Partial<IProducts>>({});
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [addReview, { isLoading, isSuccess, error, data }] =
    useAddReviewMutation();
  const allProducts: IProducts[] = useSelector(
    (state: any) => state.allProducts
  );

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

  const width = useWindowDimensions().width;

  useEffect(() => {
    const data = allProducts.find((e) => e._id === id);
    setProduct(data);
  }, [allProducts]);

  useEffect(() => {
    const fetch = async () => {
      const value = await AsyncStorage.getItem(`Favourite${product._id}`);
      if (value) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };
    fetch();
  }, [product]);
  console.log(product);

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Review Added!";
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        ToastAndroid.show(errorData.data.message, ToastAndroid.SHORT);
      }
    }
  }, [isSuccess, error, data?.message]);

  const validateForm = () => {
    let error = "";
    if (review === "") {
      error = "Please put Review";
    }
    setErrors(error);
    return error === "";
  };

  const handleFinishRating = (rating) => {
    setSelectedRating(rating);
  };

  const handleFavourite = async (product: {
    key: string;
    title: string;
    image: string;
    category: string;
    price: number;
    id: string;
  }) => {
    const { key, title, image, category, price, id } = product;
    if (!liked) {
      console.log("worked bro");
      await storeData(`${key}${id}`, {
        title: title,
        image: image,
        quantity: 0,
        category: category,
        price: price,
        id: id,
        total: 0,
      });
    } else {
      await deleteCart(`${key}${id}`);
    }
  };

  const handleReview = async () => {
    if (validateForm()) {
      setAllData({
        data: {
          user: user._id,
          name: user.name,
          product: product._id,
          rating: selectedRating,
          comment: review,
        },
      });
      await addReview(allData);
      setReview("");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StatusBar translucent backgroundColor="transparent" />
          <View className="flex-1 relative bg-white">
            {!isKeyboardVisible && (
              <>
                <View className="absolute z-20 top-10 flex flex-row items-center justify-between w-full px-5">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="bg-white p-2 rounded-full"
                  >
                    <Ionicons name="chevron-back" size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setLiked(!liked);
                      handleFavourite({
                        key: "Favourite",
                        title: product.title,
                        image: product.image.url,
                        category: product.category,
                        price: product.price,
                        id: product._id,
                      });
                    }}
                    className="bg-white p-2 rounded-full"
                  >
                    <AntDesign
                      name={liked ? "heart" : "hearto"}
                      size={20}
                      color={liked ? "red" : "black"}
                    />
                  </TouchableOpacity>
                </View>
                {product.image && (
                  <Image
                    source={{
                      uri: `${product.image.url}`,
                    }}
                    style={{ aspectRatio: 1, resizeMode: "cover" }}
                  />
                )}
              </>
            )}
            <View
              className={`flex-1 bg-white rounded-lg mt-[-5px] pt-10 ${
                !isKeyboardVisible && "mb-20"
              }`}
            >
              <ScrollView
                contentContainerStyle={{ paddingVertical: 0 }}
                className="flex-1 bg-white p-5 flex gap-2"
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <View className="flex flex-row justify-between">
                  <Text
                    style={{ fontFamily: "bold" }}
                    className={width > 400 ? "text-lg" : "text-md"}
                  >
                    {product.title}
                  </Text>
                  <Text
                    style={{ fontFamily: "bold" }}
                    className={width > 400 ? "text-lg" : "text-md"}
                  >
                    {`${product.price}/-`}
                  </Text>
                </View>
                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-1">
                    <Rating
                      startingValue={
                        product.ratings
                          ? parseFloat(
                              (product.ratings / product.numReviews).toFixed(1)
                            )
                          : 0
                      }
                      ratingCount={5}
                      readonly
                      imageSize={15}
                    />
                    <Text className="text-gray-500 text-sm">
                      {product.ratings
                        ? parseFloat(
                            (product.ratings / product.numReviews).toFixed(1)
                          )
                        : 0}
                    </Text>
                  </View>
                  <View className="flex flex-row gap-4 items-center">
                    <TouchableOpacity
                      onPress={() =>
                        setCount((prevCount) =>
                          prevCount < 10 ? prevCount + 1 : prevCount
                        )
                      }
                    >
                      <AntDesign name="pluscircleo" size={20} color="black" />
                    </TouchableOpacity>
                    <Text className="font-semibold">{count}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setCount((prevCount) =>
                          prevCount > 1 ? prevCount - 1 : prevCount
                        )
                      }
                    >
                      <AntDesign name="minuscircleo" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={{ fontFamily: "semiBold" }} className="">
                  Description
                </Text>
                <Text style={{ fontFamily: "regular" }} className="text-sm">
                  {product.description}
                </Text>
                <FlatList
                  className="pt-5"
                  showsHorizontalScrollIndicator={false}
                  data={[
                    "manufacturer",
                    "ingredients",
                    "strength",
                    "dosage Form",
                    "directions",
                    "warnings",
                    "storage Condition",
                    "shelf Life",
                  ]}
                  contentContainerStyle={{ columnGap: 8 }}
                  horizontal
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className={` p-2 rounded-md  ${
                        item === selectedOption
                          ? "bg-[#264BAE]"
                          : "bg-[#E9F6FF]"
                      }`}
                      onPressIn={() => setSelectedOption(item)}
                    >
                      <Text
                        style={{ fontFamily: "regular" }}
                        className={`capitalize ${
                          item === selectedOption ? "text-white" : "text-black"
                        }`}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                ></FlatList>
                {selectedOption === "manufacturer" && (
                  <View>
                    <Text style={{ fontFamily: "regular" }} className="text-sm">
                      {product.manufacturer}
                    </Text>
                  </View>
                )}
                {selectedOption === "ingredients" && (
                  <View>
                    <Text style={{ fontFamily: "regular" }} className="text-sm">
                      {product.ingredients}
                    </Text>
                  </View>
                )}
                {selectedOption === "strength" && (
                  <View>
                    <Text style={{ fontFamily: "regular" }} className="text-sm">
                      {product.strength}
                    </Text>
                  </View>
                )}
                {selectedOption === "dosage Form" && (
                  <View>
                    <Text style={{ fontFamily: "regular" }} className="text-sm">
                      {product.dosageForm}
                    </Text>
                  </View>
                )}
                {selectedOption === "directions" && (
                  <View>
                    <Text style={{ fontFamily: "regular" }} className="text-sm">
                      {product.directions}
                    </Text>
                  </View>
                )}
                {selectedOption === "warnings" && (
                  <View>
                    <Text style={{ fontFamily: "regular" }} className="text-sm">
                      {product.warnings}
                    </Text>
                  </View>
                )}
                {selectedOption === "storage Condition" && (
                  <View>
                    <Text style={{ fontFamily: "regular" }} className="text-sm">
                      {product.storageCondition}
                    </Text>
                  </View>
                )}
                {selectedOption === "shelf Life" && (
                  <View>
                    <Text style={{ fontFamily: "regular" }} className="text-sm">
                      {product.shelfLife}
                    </Text>
                  </View>
                )}
                <Text style={{ fontFamily: "semiBold" }} className=" pt-5">
                  Related Products
                </Text>
                <View>
                  <ProductCarousal
                    products={allProducts.filter(
                      (e) =>
                        e._id !== product._id && e.category === product.category
                    )}
                  />
                </View>
                {user && (
                  <View className="">
                    <Text
                      style={{ fontFamily: "semiBold" }}
                      className="text-sm pt-5 pb-2"
                    >
                      Give Review
                    </Text>
                    <TextInput
                      maxLength={200}
                      multiline={true}
                      textAlignVertical="top"
                      selectionColor={Colors.primary}
                      numberOfLines={12}
                      className={`rounded-md h-14 border  p-2 ${
                        errors ? "border-red-500" : "border-gray-200"
                      }`}
                      value={review}
                      onChangeText={(text) => setReview(text)}
                    />
                    {errors !== "" && (
                      <Text className="text-red-500 text-xs">{errors}</Text>
                    )}
                    <Rating
                      showRating
                      style={{ paddingVertical: 10 }}
                      imageSize={15}
                      minValue={1}
                      onFinishRating={handleFinishRating}
                    />
                    <TouchableOpacity
                      onPress={() => handleReview()}
                      className="bg-[#264BAE] rounded-md py-2"
                    >
                      <Text
                        style={{ fontFamily: "semiBold" }}
                        className="text-white text-center"
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {product.reviews && (
                  <View>
                    <Text
                      style={{ fontFamily: "semiBold" }}
                      className="text-sm py-5"
                    >
                      All Reviews{" "}
                      {`(${product.reviews && product.reviews.length})`}
                    </Text>
                    <View>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ gap: 10 }}
                        data={product.reviews}
                        renderItem={({ item }) => (
                          <View className="border rounded-md border-gray-200 p-2 mb-8">
                            <View className="flex flex-row justify-between">
                              <Text
                                style={{ fontFamily: "semiBold" }}
                                className="text-xs"
                              >
                                {item.name}
                              </Text>
                              <Text
                                className="text-xs text-gray-500"
                                style={{ fontFamily: "regular" }}
                              >
                                {new Date(item.createdAt).toLocaleDateString(
                                  "en-US",
                                  { month: "short", day: "2-digit" }
                                )}
                              </Text>
                            </View>
                            <View className="flex flex-row justify-between items-center">
                              <Rating
                                startingValue={4}
                                ratingCount={5}
                                readonly
                                imageSize={10}
                              />
                            </View>
                            <View className="mt-2">
                              <Text
                                className="text-sm"
                                style={{ fontFamily: "semiBold" }}
                              >
                                {item.comment.split(" ").slice(0, 8).join(" ")}
                              </Text>
                            </View>
                            <View>
                              <Text
                                className="text-xs"
                                style={{ fontFamily: "regular" }}
                              >
                                {item.comment}
                              </Text>
                            </View>
                            {item.verifiedPurchase && (
                              <View className="flex flex-row items-center justify-end gap-1 mt-2">
                                <Text
                                  className="text-[10px]"
                                  style={{ fontFamily: "semiBold" }}
                                >
                                  Verified Purchase
                                </Text>
                                {
                                  <MaterialIcons
                                    name="verified"
                                    size={12}
                                    color="#264BAE"
                                  />
                                }
                              </View>
                            )}
                          </View>
                        )}
                      />
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>
            {!isKeyboardVisible && (
              <View className="absolute bottom-0 bg-[#E9F6FF] flex flex-row items-center justify-between z-20 p-1 m-2 rounded-md">
                <View className="flex-1 flex items-center">
                  <Text
                    className="text-xs text-gray-500"
                    style={{ fontFamily: "semiBold" }}
                  >{`${product.price} * ${count}`}</Text>
                  <Text
                    className=" text-lg"
                    style={{ fontFamily: "bold" }}
                  >{`Rs.${product.price * count}`}</Text>
                </View>
                <TouchableOpacity
                  className="flex-1 bg-[#264BAE] rounded p-4"
                  onPress={() => {
                    storeData(`Cart_${product._id}`, {
                      title: product.title,
                      image: product.image.url,
                      quantity: count,
                      category: product.category,
                      price: product.price,
                      id: product._id,
                      total: count * product.price,
                    });
                    navigation.navigate(MainScreens.StackCart);
                  }}
                >
                  <Text
                    className="text-white text-center text-sm"
                    style={{ fontFamily: "semiBold" }}
                  >
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default Main;
