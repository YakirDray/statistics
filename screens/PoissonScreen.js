import React, { useState } from "react";
import { Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Decimal } from "decimal.js";

const screenWidth = Dimensions.get("window").width;

const PoissonScreen = () => {
  const [lamda, setLamda] = useState("");
  const [k, setK] = useState("");
  const [dataPoints, setDataPoints] = useState([]);

  const factorial = (n) => {
    let result = new Decimal(1);
    for (let i = 2; i <= n; i++) {
      result = result.mul(i);
    }
    return result;
  };

  const calculatePoissonProbability = (lamda, k) => {
    const lamdaDec = new Decimal(lamda);
    const kDec = new Decimal(k);
    const factorialK = factorial(k);
    const lamdaPowerK = Decimal.pow(lamdaDec, kDec);
    const eNegLamda = Decimal.exp(lamdaDec.neg());

    return lamdaPowerK.mul(eNegLamda).div(factorialK).toNumber();
  };

  const calculatePoisson = () => {
    const lamdaValue = parseFloat(lamda);
    const kValue = parseInt(k);

    if (isNaN(lamdaValue) || lamdaValue < 0) {
      alert("Invalid λ (lamda). Please enter a positive number.");
      return;
    }
    if (isNaN(kValue) || kValue < 0 || !Number.isInteger(kValue)) {
      alert("Invalid k. Please enter a non-negative integer.");
      return;
    }

    let chartData = [];
    let labels = [];
    for (let i = 0; i <= kValue; i++) {
      const result = calculatePoissonProbability(lamdaValue, i);
      chartData.push(result);
      labels.push(`k=${i}`);
    }
    setDataPoints(chartData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>מחשבון התפלגות פואסון</Text>
      <TextInput
        style={styles.input}
        placeholder="הזן λ (lamda)"
        value={lamda}
        onChangeText={setLamda}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="הזן k (מספר התרחשויות)"
        value={k}
        onChangeText={setK}
        keyboardType="numeric"
      />
      <Button title="חשב" onPress={calculatePoisson} color="#007bff" />
      {dataPoints.length > 0 && (
        <LineChart
          data={{
            labels: dataPoints.map((_, index) => `k=${index}`),
            datasets: [{ data: dataPoints }],
          }}
          width={screenWidth}
          height={220}
          yAxisLabel="P"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 5,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
      {dataPoints.slice(0, 20).map((point, index) => (
        <Text
          key={index}
          style={styles.resultText}
        >{`P(X=${index}) = ${point.toFixed(5)}`}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  input: {
    width: "90%",
    height: 45,
    borderColor: "#3498db",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#ecf0f1",
  },
  resultText: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 5,
    backgroundColor: "#ecf0f1",
  },
});

export default PoissonScreen;
