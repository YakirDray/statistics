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

const NegativeBinomialScreen = () => {
  const [r, setR] = useState("");
  const [p, setP] = useState("");
  const [dataPoints, setDataPoints] = useState([]);

  const calculateNegativeBinomial = () => {
    const rVal = parseInt(r);
    const pVal = parseFloat(p);
    if (isNaN(rVal) || isNaN(pVal) || rVal <= 0 || pVal <= 0 || pVal > 1) {
      alert("אנא הזן ערכים תקפים: r צריך להיות מספר שלם חיובי, p בין 0 ל-1.");
      return;
    }

    let probabilities = [];
    let labels = [];
    for (let k = rVal; k <= rVal * 5; k++) {
      // Assuming we want to display up to 5 times r
      let probability =
        math.combinations(k - 1, rVal - 1) *
        Math.pow(pVal, rVal) *
        Math.pow(1 - pVal, k - rVal);
      probabilities.push(probability);
      labels.push(`k=${k}`);
    }
    setDataPoints({ labels, probabilities });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>מחשבון התפלגות בינומית שלילית</Text>
      <TextInput
        style={styles.input}
        placeholder="הזן r (מספר ההצלחות)"
        value={r}
        onChangeText={setR}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="הזן p (הסתברות להצלחה)"
        value={p}
        onChangeText={setP}
        keyboardType="numeric"
      />
      <Button title="חשב" onPress={calculateNegativeBinomial} color="#007bff" />
      {dataPoints.labels && (
        <LineChart
          data={{
            labels: dataPoints.labels,
            datasets: [{ data: dataPoints.probabilities }],
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
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
      <ScrollView style={styles.results}>
        {dataPoints.labels &&
          dataPoints.labels.map((label, index) => (
            <Text
              key={index}
              style={styles.resultText}
            >{`${label}: ${dataPoints.probabilities[index].toFixed(5)}`}</Text>
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
    height: 45,
    borderColor: "#cccccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  results: {
    marginTop: 20,
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
    textAlign: "center",
  },
});

export default NegativeBinomialScreen;
