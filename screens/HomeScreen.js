import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

// Adjust the path as necessary to point to your actual image file
const backgroundImage = require("../assets/back.webp");

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
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView>
        <Text style={styles.title}>מחשבון ההתפלגויות של יקיר דריי</Text>

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
            <Text style={styles.buttonText}>התפלגות בינומית</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("Poisson")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>התפלגות פואסון</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("NegativeBinomial")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>התפלגות בינומית שלילית</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("Normal")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>התפלגות נורמלית</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("Statistics")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>סטטיסטיקה</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("Hypergeometric")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>התפלגות היפרגיאומטרית</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("Exponential")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>התפלגות אקספוננציאלית</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("JointProbability")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>הסתברות משותפת</Text>
          </TouchableOpacity>
          <Text style={styles.title}> Y_D App's</Text>

        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ensure the background covers the whole screen
    height: "100%", // Ensure the background covers the whole screen
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#eefecc",
    textTransform: "capitalize",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0f3460",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginVertical: 12,
    width: width * 0.9,
    shadowColor: "#4ecca3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 25,
    elevation: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
