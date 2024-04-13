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
import * as math from "mathjs";

const screenWidth = Dimensions.get("window").width;

const BinomialScreen = () => {
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [dataPoints, setDataPoints] = useState([]);

  const calculateBinomial = () => {
    if (!n || !p) {
      alert("אנא הזן את כל הערכים.");
      return;
    }
    const nVal = parseInt(n);
    const pVal = parseFloat(p);
    if (isNaN(nVal) || isNaN(pVal) || nVal < 0 || pVal < 0 || pVal > 1) {
      alert(
        "Please enter valid values: n should be a non-negative integer, p should be a number between 0 and 1."
      );
      return;
    }

    let newPoints = [];
    for (let i = 0; i <= nVal; i++) {
      const binomialResult =
        math.combinations(nVal, i) *
        Math.pow(pVal, i) *
        Math.pow(1 - pVal, nVal - i);
      newPoints.push({ label: `P(X=${i})`, value: binomialResult });
    }
    setDataPoints(newPoints);
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 4, // specify the number of decimal places you want.
    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
  };

  const chartWidth =
    dataPoints.length > 3 ? 50 * dataPoints.length : screenWidth;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>מחשבון חלוקה בינומית</Text>
      <TextInput
        style={styles.input}
        placeholder="הזן n (ניסיונות)"
        value={n}
        onChangeText={setN}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="הזן p (הסתברות הצלחה)"
        value={p}
        onChangeText={setP}
        keyboardType="numeric"
      />
      <Button title="חשב" onPress={calculateBinomial} color="#007bff" />
      <Text style={styles.resultTitle}>תוצאה:</Text>
      <ScrollView horizontal={true} style={styles.chartContainer}>
        {dataPoints.length > 0 && (
          <BarChart
            data={{
              labels: dataPoints.map((dp) => dp.label),
              datasets: [{ data: dataPoints.map((dp) => dp.value) }],
            }}
            width={chartWidth} // Dynamic width based on the number of data points
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        )}
      </ScrollView>
      <ScrollView style={styles.resultScroll}>
        {dataPoints.map((point, index) => (
          <Text key={index} style={styles.resultText}>
            {point.label}: {point.value.toFixed(4)}
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
  chartContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
    flexGrow: 0, // Ensures the ScrollView is just enough for the chart
    minHeight: 250, // Minimum height for the chart container
  },
  resultScroll: {
    maxHeight: 200, // Fixed height with vertical scroll for results
    width: "100%",
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default BinomialScreen;
S