import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";  // Import BarChart

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
    const xValues = Array.from({ length: 21 }, (_, i) => parseFloat(mean) + (i - 10));
    const results = xValues.map((x) => ({
      x: x.toFixed(2),
      y: (
        (1 / Math.sqrt(2 * Math.PI * variance)) *
        Math.exp(-Math.pow(x - parseFloat(mean), 2) / (2 * variance))
      ).toFixed(4),
    }));
    setDataPoints(results);
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 4,  // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container}>
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
      <Button title="חשב" onPress={calculateNormal} color="#007bff" />
      <Text style={styles.resultTitle}>תוצאה:</Text>
      {dataPoints.length > 0 && (
        <BarChart
          style={{ marginVertical: 8 }}
          data={{
            labels: dataPoints.map(dp => dp.x),
            datasets: [{ data: dataPoints.map(dp => dp.y) }]
          }}
          width={screenWidth - 16} // from react-native
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      )}
      <ScrollView style={styles.resultContainer}>
        {dataPoints.map((point, index) => (
          <Text key={index} style={styles.resultText}>
            {point.x}: {point.y}
          </Text>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#cccccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    alignSelf: "center",
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  resultContainer: {
    paddingHorizontal: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default NormalScreen;
