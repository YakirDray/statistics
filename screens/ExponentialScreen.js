import * as Math from "mathjs";

import React, { useState } from "react";
import { Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const ExponentialScreen = () => {
  const [lambda, setLambda] = useState("");
  const [k, setK] = useState("");
  const [dataPoints, setDataPoints] = useState({
    labels: [],
    probabilities: [],
  });
  const [specialProbs, setSpecialProbs] = useState({
    pLess: null,
    pGreater: null,
    pEqual: null,
  });

  const calculateExponential = () => {
    const lambdaVal = parseFloat(lambda);
    const kVal = parseFloat(k);
    if (isNaN(lambdaVal) || lambdaVal <= 0 || isNaN(kVal) || kVal < 0) {
      alert(
        "אנא הזן ערכים תקפים עבור λ (חייב להיות חיובי) ו-k (חייב להיות לא שלילי)."
      );
      return;
    }

    let probabilities = [];
    let labels = [];
    for (let x = kVal - 4; x <= kVal + 4; x += 1) {
      let probability = lambdaVal * Math.exp(-lambdaVal * x);
      probabilities.push(probability);
      labels.push(`x=${x}`);
    }
    setDataPoints({ labels, probabilities });
    const pGreater = Math.exp(-lambdaVal * kVal).toFixed(4);
    const pLess = (1 - Math.exp(-lambdaVal * kVal)).toFixed(4);
    const pEqual = (lambdaVal * Math.exp(-lambdaVal * kVal)).toFixed(4);

    setSpecialProbs({ pLess, pGreater, pEqual });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text style={styles.title}>מחשבון התפלגות אקספוננציאלית</Text>
      <TextInput
        style={styles.input}
        placeholder="הזן λ (קצב התרחשות)"
        value={lambda}
        onChangeText={setLambda}
        keyboardType="numeric"
        textAlign="right"
      />
      <TextInput
        style={styles.input}
        placeholder="הזן k (ערך לחישוב הסתברות)"
        value={k}
        onChangeText={setK}
        keyboardType="numeric"
        textAlign="right"
      />
      <Button title="חשב" onPress={calculateExponential} color="#007bff" />
      {specialProbs.pGreater !== null && (
        <>
          <Text style={styles.resultText}>
            הסתברות ש-X גדול מ-{k}: {specialProbs.pGreater}
          </Text>
          <Text style={styles.resultText}>
            הסתברות ש-X קטן מ-{k}: {specialProbs.pLess}
          </Text>
          <Text style={styles.resultText}>
            הסתברות ש-X שווה ל-{k}: {specialProbs.pEqual}
          </Text>
        </>
      )}
      {dataPoints.labels.length > 0 && (
        <LineChart
          data={{
            labels: dataPoints.labels,
            datasets: [{ data: dataPoints.probabilities }],
          }}
          width={screenWidth - 45}
          height={220}
          yAxisLabel="P="
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 4,
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginLeft: 5,
            borderRadius: 16,
          }}
        />
      )}
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#cccccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: "#34495e",
    marginTop: 10,
    textAlign: "center",
  },
});

export default ExponentialScreen;
