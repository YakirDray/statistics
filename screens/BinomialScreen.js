import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import * as math from "mathjs";

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
    backgroundColor: "#f4f4f8",  // A light grey background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",  // Dark grey color for text
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#007bff",  // Blue border color
    borderWidth: 1,
    borderRadius: 10,  // Rounded corners
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#ffffff",  // White background for inputs
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  resultText: {
    fontSize: 16,
    color: "#333",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",  // Light grey border for items
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});


export default BinomialScreen;
