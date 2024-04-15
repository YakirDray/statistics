import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const StatisticsScreen = () => {
  const [numbers, setNumbers] = useState("");
  const [mean, setMean] = useState(null);
  const [variance, setVariance] = useState(null);
  const [stdDeviation, setStdDeviation] = useState(null); // סטיית תקן
  const [coeffVariation, setCoeffVariation] = useState(null); // מקדם שונות
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
  };

  const data = {
    labels: ["ממוצע", "שונות", "סטיית תקן", "מקדם שונות"],
    datasets: [
      {
        data: [mean, variance, stdDeviation, coeffVariation],
      },
    ],
  };

  const calculateStatistics = () => {
    const numArray = numbers
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));

    const sum = numArray.reduce((acc, val) => acc + val, 0);
    const meanValue = sum / numArray.length;
    setMean(meanValue);

    const varianceValue =
      numArray.reduce((acc, val) => acc + Math.pow(val - meanValue, 2), 0) /
      (numArray.length - 1);
    setVariance(varianceValue);

    const stdDeviationValue = Math.sqrt(varianceValue);
    setStdDeviation(stdDeviationValue);

    const coeffVariationValue = (stdDeviationValue / meanValue) * 100;
    setCoeffVariation(coeffVariationValue);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>מחשבון סטטיסטיקה</Text>
      <TextInput
        style={styles.input}
        placeholder="הכנס מספרים מופרדים בפסיקים"
        value={numbers}
        onChangeText={setNumbers}
        keyboardType="numeric"
      />
      <Button title="חשב" onPress={calculateStatistics} color="#007bff" />
      <View style={styles.results}>
        <Text style={styles.resultText}>
          ממוצע (μ): {mean !== null ? mean.toFixed(2) : "לא זמין"}
        </Text>
        <Text style={styles.resultText}>
          שונות (σ²): {variance !== null ? variance.toFixed(2) : "לא זמין"}
        </Text>
        <Text style={styles.resultText}>
          סטיית תקן (σ):{" "}
          {stdDeviation !== null ? stdDeviation.toFixed(2) : "לא זמין"}
        </Text>
        <Text style={styles.resultText}>
          מקדם שונות (C):{" "}
          {coeffVariation !== null
            ? coeffVariation.toFixed(2) + "%"
            : "לא זמין"}
        </Text>
      </View>
      {mean !== null &&
        variance !== null &&
        stdDeviation !== null &&
        coeffVariation !== null && (
          <BarChart
            style={styles.chart}
            data={data}
            width={screenWidth - 40}
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
