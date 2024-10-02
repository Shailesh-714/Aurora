import React, { useState, useEffect } from "react";
import { View, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import MyHeader from "../components/tab_bar/MyHeader";

// Sample image URLs (replace with your own)
const imageUrls = [
  `https://picsum.photos/300/300?random=11`,
  `https://picsum.photos/300/300?random=2`,
  `https://picsum.photos/300/300?random=3`,
  `https://picsum.photos/300/300?random=4`,
  `https://picsum.photos/300/300?random=5`,
  `https://picsum.photos/300/300?random=6`,
  `https://picsum.photos/300/300?random=7`,
  `https://picsum.photos/300/300?random=8`,
  `https://picsum.photos/300/300?random=9`,
  `https://picsum.photos/300/300?random=10`,
  `https://picsum.photos/300/300?random=11`,
  `https://picsum.photos/300/300?random=2`,
  `https://picsum.photos/300/300?random=3`,
  `https://picsum.photos/300/300?random=4`,
  `https://picsum.photos/300/300?random=5`,
  `https://picsum.photos/300/300?random=6`,
  `https://picsum.photos/300/300?random=7`,
  `https://picsum.photos/300/300?random=8`,
  `https://picsum.photos/300/300?random=9`,
  `https://picsum.photos/300/300?random=10`,
];

// Helper function to shuffle array elements
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const ExploreScreen = () => {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    // Shuffle images on component load
    setShuffledImages(shuffleArray([...imageUrls]));
  }, []);

  const renderPatternRow = (startIndex, isFlipped) => {
    const images = shuffledImages.slice(startIndex, startIndex + 3);

    if (images.length < 3) {
      return (
        <View style={styles.row}>
          {images.map((image, index) => (
            <View
              key={index}
              style={styles.smallImage}
            >
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.patternContainer}>
        {isFlipped ? (
          <View style={styles.grid}>
            {/* Two 1x1 images on the left */}
            <View>
              <View style={styles.smallImage}>
                <Image source={{ uri: images[0] }} style={styles.image} />
              </View>
              <View style={styles.smallImage}>
                <Image source={{ uri: images[1] }} style={styles.image} />
              </View>
            </View>
            {/* One 2x2 image on the right */}
            <View style={styles.largeImage}>
              <Image source={{ uri: images[2] }} style={styles.image} />
            </View>
          </View>
        ) : (
          <View style={styles.grid}>
            {/* One 2x2 image on the left */}
            <View style={styles.largeImage}>
              <Image source={{ uri: images[0] }} style={styles.image} />
            </View>
            {/* Two 1x1 images on the right */}
            <View>
              <View style={styles.smallImage}>
                <Image source={{ uri: images[1] }} style={styles.image} />
              </View>
              <View style={styles.smallImage}>
                <Image source={{ uri: images[2] }} style={styles.image} />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderOneByOneRow = (startIndex) => {
    const images = shuffledImages.slice(startIndex, startIndex + 3);
    return (
      <View style={styles.row}>
        {images.map((image, index) => (
          <View key={index} style={styles.smallImage}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </View>
    );
  };

  const renderRows = () => {
    const rows = [];
    const numberOfImages = shuffledImages.length;

    for (let i = 0; i < numberOfImages; i += 6) {
      // Flip only for the rows containing 2x2 images
      const isFlipped = Math.floor(i / 6) % 2 === 1; // Alternate flip every second 2x2 section
      rows.push(renderPatternRow(i, isFlipped));

      // Add a row of 3 1x1 images after each pattern row
      if (i + 3 < numberOfImages) {
        rows.push(renderOneByOneRow(i + 3));
      }
    }

    return rows;
  };
  return (
    <View style={styles.container}>
      <MyHeader
        onPressMenu={() => navigation.goBack()}
        title="Explore"
        right="more-vertical"
        onRightPress={() => {}}
      />
      <ScrollView>{renderRows()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1EB",
  },
  patternContainer: {
    flexDirection: "row",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallImage: {
    width: Dimensions.get("window").width/3,
    height: Dimensions.get("window").width/3,
  },
  largeImage: {
    width: (Dimensions.get("window").width/3)*2,
    height: (Dimensions.get("window").width/3)*2,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default ExploreScreen;
