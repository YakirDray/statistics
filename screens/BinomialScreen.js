import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from "react-native";
import * as math from "mathjs";

const BinomialScreen = () => {
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [comparisonType, setComparisonType] = useState("=");
  const [result, setResult] = useState(null);

  const calculateBinomial = () => {
    if (!n || !p || !k) {
      alert("אנא הזן את כל הערכים.");
      return;
    }
    const nVal = parseInt(n);
    const pVal = parseFloat(p);
    const kVal = parseInt(k);
    if (isNaN(nVal) || isNaN(pVal) || isNaN(kVal) || nVal < 0 || pVal < 0 || pVal > 1 || kVal < 0 || kVal > nVal) {
      alert("אנא הזן ערכים תקפים: n ו-k צריכים להיות מספרים שלמים חיוביים, p בין 0 ל-1, ו-k לא יכול להיות גדול מ-n.");
      return;
    }

    let probability = 0;
    switch (comparisonType) {
      case "=":
        probability = math.combinations(nVal, kVal) * Math.pow(pVal, kVal) * Math.pow(1 - pVal, nVal - kVal);
        break;
      case ">":
        for (let i = kVal + 1; i <= nVal; i++) {
          probability += math.combinations(nVal, i) * Math.pow(pVal, i) * Math.pow(1 - pVal, nVal - i);
        }
        break;
      case "<":
        for (let i = 0; i < kVal; i++) {
          probability += math.combinations(nVal, i) * Math.pow(pVal, i) * Math.pow(1 - pVal, nVal - i);
        }
        break;
    }
    setResult(probability);
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
      <TextInput
        style={styles.input}
        placeholder="הזן k (מספר ההצלחות הרצוי)"
        value={k}
        onChangeText={setK}
       
      />
      <Picker
        selectedValue={comparisonType}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setComparisonType(itemValue)}
      >
        <Picker.Item label="P(X = k)" value="=" />
        <Picker.Item label="P(X > k)" value=">" />
        <Picker.Item label="P(X < k)" value="<" />
      </Picker>
      <Button title="חשב" onPress={calculateBinomial} color="#007bff" />
      {result !== null && (
        <Text style={styles.resultText}>ההסתברות היא: {result.toFixed(4)}</Text>
      )}
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
  picker: {
    width: "90%",
    height: 50,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BinomialScreen;
