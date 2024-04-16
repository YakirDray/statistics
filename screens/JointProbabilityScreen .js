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

const JointProbabilityScreen = () => {
  const [pX, setPX] = useState("");
  const [nX, setNX] = useState("");
  const [kX, setKX] = useState("");

  const [pY, setPY] = useState("");
  const [nY, setNY] = useState("");
  const [kY, setKY] = useState("");

  const [dataPointsX, setDataPointsX] = useState({
    labels: [],
    probabilities: [],
  });
  const [dataPointsY, setDataPointsY] = useState({
    labels: [],
    probabilities: [],
  });
  const [dataPointsJoint, setDataPointsJoint] = useState({
    labels: [],
    probabilities: [],
  });

  const calculateProbabilities = () => {
    const nXVal = parseInt(nX);
    const pXVal = parseFloat(pX);
    const kXVal = parseInt(kX);

    const nYVal = parseInt(nY);
    const pYVal = parseFloat(pY);
    const kYVal = parseInt(kY);

    if (
      isNaN(pXVal) ||
      isNaN(nXVal) ||
      isNaN(kXVal) ||
      isNaN(pYVal) ||
      isNaN(nYVal) ||
      isNaN(kYVal)
    ) {
      alert("אנא הזן ערכים מספריים תקפים לכל הפרמטרים.");
      return;
    }

    let probabilitiesX = [];
    let labelsX = [];
    for (let k = 0; k <= nXVal; k++) {
      probabilitiesX.push(
        math.combinations(nXVal, k) *
          Math.pow(pXVal, k) *
          Math.pow(1 - pXVal, nXVal - k)
      );
      labelsX.push(`k=${k}`);
    }

    let probabilitiesY = [];
    let labelsY = [];
    for (let k = 0; k <= nYVal; k++) {
      probabilitiesY.push(
        math.combinations(nYVal, k) *
          Math.pow(pYVal, k) *
          Math.pow(1 - pYVal, nYVal - k)
      );
      labelsY.push(`k=${k}`);
    }

    const probX = probabilitiesX[kXVal];
    const probY = probabilitiesY[kYVal];
    const jointProb = probX * probY; // Assuming independence

    setDataPointsX({ labels: labelsX, probabilities: probabilitiesX });
    setDataPointsY({ labels: labelsY, probabilities: probabilitiesY });
    setDataPointsJoint({
      labels: ["X", "Y", "Joint"],
      probabilities: [probX, probY, jointProb],
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>מחשבון ההסתברות המשותפת ל-X ו-Y</Text>

      <TextInput
        style={styles.input}
        placeholder="הזן pX (הסתברות להצלחה ב-X)"
        value={pX}
        onChangeText={setPX}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="הזן nX (מספר הניסויים ב-X)"
        value={nX}
        onChangeText={setNX}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="הזן kX (מספר ההצלחות הרצוי ב-X)"
        value={kX}
        onChangeText={setKX}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="הזן pY (הסתברות להצלחה ב-Y)"
        value={pY}
        onChangeText={setPY}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="הזן nY (מספר הניסויים ב-Y)"
        value={nY}
        onChangeText={setNY}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="הזן kY (מספר ההצלחות הרצוי ב-Y)"
        value={kY}
        onChangeText={setKY}
        keyboardType="numeric"
      />

      <Button
        title="חשב הסתברויות"
        onPress={calculateProbabilities}
        color="#007bff"
      />

      {dataPointsX.labels.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>התפלגות X:</Text>
          <LineChart
            data={{
              labels: dataPointsX.labels,
              datasets: [{ data: dataPointsX.probabilities }],
            }}
            width={screenWidth}
            height={220}
            yAxisLabel="P"
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      )}

      {dataPointsY.labels.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>התפלגות Y:</Text>
          <LineChart
            data={{
              labels: dataPointsY.labels,
              datasets: [{ data: dataPointsY.probabilities }],
            }}
            width={screenWidth}
            height={220}
            yAxisLabel="P"
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      )}

      {dataPointsJoint.labels.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>ההתפלגות המשותפת:</Text>
          <LineChart
            data={{
              labels: dataPointsJoint.labels,
              datasets: [{ data: dataPointsJoint.probabilities }],
            }}
            width={screenWidth}
            height={220}
            yAxisLabel="P"
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      )}
    </ScrollView>
  );
};

const chartConfig = {
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 5,
    backgroundColor: "#ecf0f1",
    textAlign: "center",
  },
});

export default JointProbabilityScreen;
