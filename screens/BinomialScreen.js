import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import * as math from "mathjs";

const screenWidth = Dimensions.get("window").width;

const BinomialScreen = () => {
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [results, setResults] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  const calculateBinomial = () => {
    if (!n || !p) {
      alert("אנא הזן את כל הערכים.");
      return;
    }
    const nVal = parseInt(n);
    const pVal = parseFloat(p);
    if (isNaN(nVal) || isNaN(pVal) || nVal < 0 || pVal < 0 || pVal > 1) {
      alert("אנא הזן ערכים תקפים: n צריך להיות מספר שלם חיובי, p בין 0 ל-1.");
      return;
    }

    let chartData = [];
    let detailedResults = [];
    for (let k = 0; k <= nVal; k++) {
      const probability =
        math.combinations(nVal, k) *
        Math.pow(pVal, k) *
        Math.pow(1 - pVal, nVal - k);
      chartData.push({ x: `k=${k}`, y: probability });
      detailedResults.push({ k, probability });
    }
    setDataPoints(chartData);
    setResults(detailedResults.slice(0, 20)); // Only storing the first 20 results to display
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>מחשבון התפלגות בינומית</Text>
      <TextInput
        style={styles.input}
        placeholder="הזן n (מספר הניסויים)"
        value={n}
        onChangeText={setN}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="הזן p (הסתברות להצלחה בניסוי בודד)"
        value={p}
        onChangeText={setP}
        keyboardType="numeric"
      />
      <Button title="חשב" onPress={calculateBinomial} color="#007bff" />
      {dataPoints.length > 0 && (
        <LineChart
          data={{
            labels: dataPoints.map((dp) => dp.x),
            datasets: [{ data: dataPoints.map((dp) => dp.y) }],
          }}
          width={screenWidth - 16}
          height={220}
          yAxisLabel="P"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 5,
            color: (opacity = 1) => `rgba(133, 182, 111, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            verticalLabelRotation: 30,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
      <ScrollView style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}> תוצאות :</Text>
        {results.map((result, index) => (
          <Text key={index} style={styles.resultText}>
            k={result.k}: {result.probability.toFixed(5)}
          </Text>
        ))}
      </ScrollView>
    </View>
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
    width: "90%",
    alignSelf: "center",
    height: 50,
    borderColor: "#cccccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default BinomialScreen;
