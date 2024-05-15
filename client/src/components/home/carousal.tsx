import { Colors } from "constants/index";
import React, { FC } from "react";
import { View, Dimensions, useWindowDimensions } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import CarousalSkeleton from "../ui/skeletons/slider-skeleton"

type Props = {
  slides: string[];
};

const Carousal: FC<Props> = ({ slides }) => {
    const width = useWindowDimensions().width;

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <SliderBox
        images={slides}
        loaderComponent={<CarousalSkeleton/>}
        dotColor={Colors.primary}
        sliderBoxHeight={width > 400 ? 115 : 90}
        parentWidth={700}
        sliderBoxWidth={50}
        inactiveDotColor={Colors.gray2}
        imageLoader={false}
        resizeMode={"contain"}
        borderRadius={10}
        autoplay
        circleLoop
        dotStyle={{
          width: 15,
          height: 5,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
        }}
        paginationBoxVerticalPadding={0}
        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      />
    </View>
  );
};

export default Carousal;
