import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import * as math from "mathjs";

const JointProbabilityScreen = () => {
  const [pX, setPX] = useState("");
  const [nX, setNX] = useState("");
  const [pY, setPY] = useState("");
  const [nY, setNY] = useState("");

  const [jointTable, setJointTable] = useState([]);
  const [marginalPX, setMarginalPX] = useState([]);
  const [marginalPY, setMarginalPY] = useState([]);

  const calculateProbabilities = () => {
    const nXVal = parseInt(nX, 10);
    const pXVal = parseFloat(pX);
    const nYVal = parseInt(nY, 10);
    const pYVal = parseFloat(pY);

    if (isNaN(nXVal) || isNaN(pXVal) || pXVal < 0 || pXVal > 1 ||
        isNaN(nYVal) || isNaN(pYVal) || pYVal < 0 || pYVal > 1) {
      alert("Please enter valid numbers for probabilities (between 0 and 1) and non-negative integers for trials.");
      return;
    }

    let calculatedJointTable = Array.from({ length: nXVal + 1 }, () =>
      Array(nYVal + 1).fill(0));
    let calculatedMarginalPX = new Array(nXVal + 1).fill(0);
    let calculatedMarginalPY = new Array(nYVal + 1).fill(0);

    for (let i = 0; i <= nXVal; i++) {
      for (let j = 0; j <= nYVal; j++) {
        const pXij = math.combinations(nXVal, i) * Math.pow(pXVal, i) * Math.pow(1 - pXVal, nXVal - i);
        const pYij = math.combinations(nYVal, j) * Math.pow(pYVal, j) * Math.pow(1 - pYVal, nYVal - j);
        const jointProb = pXij * pYij;
        calculatedJointTable[i][j] = jointProb.toFixed(4);
        calculatedMarginalPX[i] += jointProb;
        calculatedMarginalPY[j] += jointProb;
      }
    }

    setJointTable(calculatedJointTable);
    setMarginalPX(calculatedMarginalPX.map(p => p.toFixed(4)));
    setMarginalPY(calculatedMarginalPY.map(p => p.toFixed(4)));
  };

  const renderTableHeader = () => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>P(Y)\X</Text>
      {Array.from({ length: parseInt(nY, 10) + 1 }, (_, index) => index).map(index => (
        <Text key={index} style={styles.cell}>{`Y=${index}`}</Text>
      ))}
      <Text style={styles.cell}>P(X)</Text>
    </View>
  );

  const renderTableBody = () => (
    jointTable.map((row, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={styles.cell}>{`X=${index}`}</Text>
        {row.map((prob, j) => (
          <Text key={j} style={styles.cell}>{prob}</Text>
        ))}
        <Text style={styles.cell}>{marginalPX[index]}</Text>
      </View>
    ))
  );

  const renderMarginalPY = () => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>P(Y)</Text>
      {marginalPY.map((prob, index) => (
        <Text key={index} style={styles.cell}>{prob}</Text>
      ))}
      <Text style={styles.cell}>1</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Joint Probability Calculator for X and Y</Text>
      <TextInput style={styles.input} placeholder="Enter pX (Success probability for X)" value={pX} onChangeText={setPX} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Enter nX (Number of trials for X)" value={nX} onChangeText={setNX} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Enter pY (Success probability for Y)" value={pY} onChangeText={setPY} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Enter nY (Number of trials for Y)" value={nY} onChangeText={setNY} keyboardType="numeric" />
      <Button title="Calculate Probabilities" onPress={calculateProbabilities} color="#007bff" />
      {jointTable.length > 0 && (
        <View style={styles.tableContainer}>
          {renderTableHeader()}
          {renderTableBody()}
          {renderMarginalPY()}
        </View>
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
    alignSelf: "center",
    height: 45,
    borderColor: "#cccccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tableContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    width:"90%"
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  cell: {
    borderWidth: 2,
    borderColor: "#ddd",
    padding: 10,
    textAlign: "center",
   
  },
});

export default JointProbabilityScreen;
