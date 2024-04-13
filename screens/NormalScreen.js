import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const NormalScreen = () => {
  const [mean, setMean] = useState("");
  const [stdDev, setStdDev] = useState("");
  const [dataPoints, setDataPoints] = useState([]);

  const calculateNormal = () => {
    const meanVal = parseFloat(mean);
    const stdDevVal = parseFloat(stdDev);

    if (isNaN(meanVal) || isNaN(stdDevVal)) {
        alert("Please enter valid numbers for the mean (μ) and standard deviation (σ).");
        return;
    }

    if (stdDevVal <= 0) {
        alert("Please enter a positive number for the standard deviation (σ).");
        return;
    }

    const variance = stdDevVal * stdDevVal;
    const xValues = Array.from({ length: 100 }, (_, i) => (i - 50) * 0.1 + meanVal);
    const results = xValues.map(x => ({
        label: `f(${x.toFixed(2)})`,
        value: (1 / Math.sqrt(2 * Math.PI * variance) * Math.exp(-Math.pow(x - meanVal, 2) / (2 * variance))).toFixed(4)
    }));

    setDataPoints(results);
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>מחשבון התפלגות נורמאלית</Text>
      <TextInput
        style={styles.input}
        placeholder="הזן את הממוצע (μ)"
        value={mean}
        onChangeText={setMean}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="הזן את הסטיית תקן (σ)"
        value={stdDev}
        onChangeText={setStdDev}
        keyboardType="numeric"
      />
      <Button title="חשב" onPress={calculateNormal} />
      <Text style={styles.resultTitle}>תוצאה:</Text>
      <ScrollView style={styles.resultContainer}>
        {dataPoints.map((point, index) => (
          <Text key={index} style={styles.resultText}>
            {point.label}: {point.value}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",  // Soft grey background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",  // Dark slate color for titles
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 45,
    borderColor: "#3498db",  // Softer blue for borders
    borderWidth: 1,
    borderRadius: 10,  // Rounded corners for input fields
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#ffffff",  // White background for inputs
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 10,
    width: "90%",
    maxHeight: 200,  // Limit the height of the scroll view
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,  // Rounded corners
  },
  resultText: {
    fontSize: 16,
    color: "#333",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",  // Very light grey for subtle separation
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#2980b9",  // Blue shade
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",  // White text color
    elevation: 3,  // Shadow for button
    marginTop: 10,
  }
});

export default NormalScreen;
