import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
const { width } = Dimensions.get("window"); // Get the window dimensions
function HomeScreen({ navigation }) {
  const animatedButtonScale = new Animated.Value(1);
  const handlePress = (route) => {
    Animated.sequence([
      Animated.timing(animatedButtonScale, {
        toValue: 0.96,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate(route);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>מחשבון הסתברות </Text>
      <Animated.View
        style={[
          styles.buttonContainer,
          { transform: [{ scale: animatedButtonScale }] },
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("Binomial")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Binomial Distribution</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("Poisson")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Poisson Distribution</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("NegativeBinomial")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>NegativeBinomial Distribution</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("Normal")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Normal Distribution</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("Statistics")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("Hypergeometric")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Hypergeometric Distribution</Text>
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.title}>Dray App</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#232946", // A darker shade of blue for more depth
  },
  title: {
    fontSize: 28, // Slightly larger for emphasis
    fontWeight: "bold",
    marginBottom: 35, // Increased spacing for aesthetic balance
    color: "#eebbc3", // Soft pink to enhance readability and contrast
    textTransform: "uppercase", // Maintaining the stylistic choice for consistency
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0f3460", // Consistent color theme for buttons
    paddingVertical: 14, // Slightly thicker padding for a better tactile response
    paddingHorizontal: 60, // Wider buttons to accommodate longer text comfortably
    borderRadius: 12, // Slightly rounded corners for a smoother look
    marginVertical: 12, // Consistent vertical spacing
    width: width * 0.9, // Making buttons slightly wider for better accessibility
    shadowColor: "#4ecca3", // Maintaining the greenish shadow for a unique glowing effect
    shadowOffset: { width: 0, height: 4 }, // Slight vertical shadow for depth perception
    shadowOpacity: 0.9, // More pronounced shadow effect
    shadowRadius: 25, // Increased radius for a more diffuse glow
    elevation: 10, // Higher elevation for a more pronounced shadow on Android
  },
  buttonText: {
    color: "#ffffff", // Bright white for the best contrast against the button background
    fontSize: 20, // Larger font size for better readability
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
