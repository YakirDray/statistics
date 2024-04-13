import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import * as math from "mathjs";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const BinomialScreen = () => {
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [dataPoints, setDataPoints] = useState([]);

  const calculateBinomial = () => {
    if (!n || !p || !k) {
      alert("אנא הזן את כל הערכים.");
      return;
    }
    const binomialResult =
      math.combinations(parseInt(n), parseInt(k)) *
      Math.pow(parseFloat(p), parseInt(k)) *
      Math.pow(1 - parseFloat(p), parseInt(n) - parseInt(k));
    const newPoints = [
      ...dataPoints,
      { label: `P(X=${k})`, value: binomialResult },
    ];
    setDataPoints(newPoints);
  };

  /*const chartConfig = {
    backgroundColor: "#022173",
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    decimalPlaces: 2,
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
  <TextInput
    style={styles.input}
    placeholder="הזן k (מספר ההצלחות)"
    value={k}
    onChangeText={setK}
    keyboardType="numeric"
  />
  <Button title="חשב" onPress={calculateBinomial} color="#007bff" />
  {/* תצוגת התוצאה */}
  <Text style={styles.resultTitle}>תוצאה:</Text>
  <View style={styles.resultContainer}>
    {dataPoints.map((point, index) => (
      <Text key={index} style={styles.resultText}>
        {point.label}: {point.value}
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


export default BinomialScreen;
