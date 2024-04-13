import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const NormalScreen = () => {
  const [mean, setMean] = useState("");
  const [stdDev, setStdDev] = useState("");
  const [dataPoints, setDataPoints] = useState([]);

  const calculateNormal = () => {
    if (!mean || !stdDev) {
      alert("אנא הזן את הממוצע ואת הסטיית תקן.");
      return;
    }
    const variance = Math.pow(parseFloat(stdDev), 2);
    const xValues = Array.from(
      { length: 21 },
      (_, i) => i - 10 + parseFloat(mean)
    );
    const results = xValues.map((x) => ({
      label: `f(${x.toFixed(2)})`,
      value: (
        (1 / Math.sqrt(2 * Math.PI * variance)) *
        Math.exp(-Math.pow(x - mean, 2) / (2 * variance))
      ).toFixed(4),
    }));
    setDataPoints(results);
    console.log("תוצאות החישובים:", results);
  };

  /*const chartConfig = {
    backgroundColor: "#022173",
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    decimalPlaces: 4,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

*/
  return (
    <View style={styles.container}>
      <Text style={styles.title}>מחשבון חלוקה תקנית</Text>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#cccccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default NormalScreen;
