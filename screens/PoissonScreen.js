import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Decimal } from "decimal.js";
const PoissonScreen = () => {
  const [lambda, setLambda] = useState("");
  const [k, setK] = useState("");
  const [dataPoints, setDataPoints] = useState([]);

  const factorial = (n) => {
    let result = new Decimal(1);
    for (let i = 2; i <= n; i++) {
      result = result.mul(i);
    }
    return result;
  };
  const calculatePoissonProbability = (lambda, k) => {
    const lambdaDec = new Decimal(lambda);
    const kDec = new Decimal(k);
    const factorialK = factorial(k);
    const lambdaPowerK = Decimal.pow(lambdaDec, kDec);
    const eNegLambda = Decimal.exp(lambdaDec.neg());

    return lambdaPowerK.mul(eNegLambda).div(factorialK).toNumber();
  };
  const calculatePoisson = () => {
    const lambdaValue = parseFloat(lambda);
    const kValue = parseInt(k);

    if (isNaN(lambdaValue) || lambdaValue < 0) {
      alert("Invalid λ (lambda). Please enter a positive number.");
      return;
    }
    if (isNaN(kValue) || kValue < 0) {
      alert("Invalid k. Please enter a non-negative integer.");
      return;
    }

    const poissonResult = calculatePoissonProbability(lambdaValue, kValue);
    updateDataPoints(kValue, poissonResult);
  };

  const updateDataPoints = (k, result) => {
    const newPoint = { label: `P(X=${k})`, value: result };
    setDataPoints((prevDataPoints) => [...prevDataPoints, newPoint]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poisson Distribution Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter λ (lambda)"
        value={lambda}
        onChangeText={setLambda}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter k (number of occurrences)"
        value={k}
        onChangeText={setK}
        keyboardType="numeric"
      />
      <Button title="Calculate" onPress={calculatePoisson} color="#007bff" />
      <Button title="Save as PDF" onPress={calculatePoisson} color="#007bff" />
      <View style={styles.results}>
        {dataPoints.map((point, index) => (
          <Text key={index} style={styles.resultText}>
            {point.label}: {point.value.toFixed(4)}
          </Text>
        ))}
      </View>
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
  results: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default PoissonScreen;
