import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { colors } from "../theme/colors";

const screenWidth = Dimensions.get("window").width;
const IMAGE_HEIGHT = (screenWidth / 16) * 9; // 16:9 ratio

export default function AppCarousel({ banners }: { banners: any[] }) {
  if (!banners || banners.length === 0) return null;

  return (
    <View style={styles.sliderContainer}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        showsPagination
        dotColor="#ddd"
        activeDotColor={colors.primary}
        height={IMAGE_HEIGHT}
      >
        {banners.map((b, i) => (
          <Image
            key={i}
            source={{ uri: b.image }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: IMAGE_HEIGHT,
    marginVertical: 0,    
    overflow: "hidden",
    borderRadius: 12,
    paddingHorizontal: 2,    
    position: "relative",
  },
  bannerImage: {
    width: screenWidth,
    height: IMAGE_HEIGHT,
    borderRadius: 6,
  },
});
