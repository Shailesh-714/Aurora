import React, { useState, useEffect } from "react";
import { View, Image, FlatList, Dimensions, StyleSheet } from "react-native";

// Sample image URLs (replace with your own)
const imageUrls = [
  `https://picsum.photos/300/300?random=1`,
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
  `https://picsum.photos/300/300?random=12`,
  `https://picsum.photos/300/300?random=13`,
  `https://picsum.photos/300/300?random=14`,
  `https://picsum.photos/300/300?random=15`,
];

// Helper function to shuffle array elements
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const ExploreScreen = () => {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    // Shuffle images on component load
    setShuffledImages(shuffleArray([...imageUrls]));
  }, []);

  const { width } = Dimensions.get("window");
  const smallImageSize = width / 3;
  const largeImageSize = smallImageSize * 2;

  const renderPatternRow = (startIndex, isFlipped) => {
    const images = shuffledImages.slice(startIndex, startIndex + 3);

    if (images.length < 3) {
      return (
        <View style={styles.row}>
          {images.map((image, index) => (
            <View
              key={index}
              style={{ width: smallImageSize, height: smallImageSize }}
            >
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.row}>
        {isFlipped ? (
          <>
            {/* Two 1x1 images on the left */}
            <View style={{ width: smallImageSize, height: smallImageSize }}>
              <Image source={{ uri: images[0] }} style={styles.image} />
            </View>
            <View style={{ width: smallImageSize, height: smallImageSize }}>
              <Image source={{ uri: images[1] }} style={styles.image} />
            </View>
            {/* One 2x2 image on the right */}
            <View style={{ width: largeImageSize, height: largeImageSize }}>
              <Image source={{ uri: images[2] }} style={styles.image} />
            </View>
          </>
        ) : (
          <>
            {/* One 2x2 image on the left */}
            <View style={{ width: largeImageSize, height: largeImageSize }}>
              <Image source={{ uri: images[0] }} style={styles.image} />
            </View>
            {/* Two 1x1 images on the right */}
            <View style={{ width: smallImageSize, height: smallImageSize }}>
              <Image source={{ uri: images[1] }} style={styles.image} />
            </View>
            <View style={{ width: smallImageSize, height: smallImageSize }}>
              <Image source={{ uri: images[2] }} style={styles.image} />
            </View>
          </>
        )}
      </View>
    );
  };

  const renderRows = () => {
    const rows = [];
    const numberOfImages = shuffledImages.length;

    for (let i = 0; i < numberOfImages; i += 3) {
      const isFlipped = Math.floor(i / 3) % 2 === 1; // Alternate between flipped and non-flipped rows
      rows.push(renderPatternRow(i, isFlipped));
    }

    return rows;
  };

  return <View style={styles.container}>{renderRows()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default ExploreScreen;
