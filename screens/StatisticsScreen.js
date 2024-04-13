import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { BarChart } from "react-native-chart-kit"; // Import BarChart
import { Dimensions } from "react-native";

const StatisticsScreen = () => {
  const [numbers, setNumbers] = useState("");
  const [mean, setMean] = useState(null);
  const [variance, setVariance] = useState(null);
  const screenWidth = Dimensions.get("window").width; // Get the screen width

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
  };

  const data = {
    labels: ["Mean", "Variance"],
    datasets: [
      {
        data: [mean, variance],
      },
    ],
  };

  const calculateStatistics = () => {
    const numArray = numbers.split(",").map(Number);
    if (numArray.some(isNaN)) {
      alert("Please enter valid numbers separated by commas.");
      return;
    }

    const meanValue =
      numArray.reduce((acc, val) => acc + val, 0) / numArray.length;
    setMean(meanValue);

    const varianceValue =
      numArray.reduce((acc, val) => acc + Math.pow(val - meanValue, 2), 0) /
      numArray.length;
    setVariance(varianceValue);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Statistics Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter numbers separated by commas"
        value={numbers}
        onChangeText={setNumbers}
        keyboardType="numeric"
      />
      <Button title="Calculate" onPress={calculateStatistics} color="#007bff" />
      <View style={styles.results}>
        <Text style={styles.resultText}>
          Mean (Average): {mean ? mean.toFixed(2) : "N/A"}
        </Text>
        <Text style={styles.resultText}>
          Variance: {variance ? variance.toFixed(2) : "N/A"}
        </Text>
      </View>
      {mean !== null && variance !== null && (
        <BarChart
          style={styles.chart}
          data={data}
          width={screenWidth - 40} // Width of the chart
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  results: {
    marginTop: 20,
    width: "100%",
  },
  resultText: {
    fontSize: 18,
    marginBottom: 5,
  },
  chart: {
    marginTop: 20,
    borderRadius: 16,
  },
});

export default StatisticsScreen;
