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

const screenWidth = Dimensions.get("window").width;

function erf(x) {
  // פונקציית השגיאה
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y =
    1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

const NormalScreen = () => {
  const [mean, setMean] = useState("");
  const [stdDev, setStdDev] = useState("");
  const [xValue, setXValue] = useState("");
  const [probabilityGreater, setProbabilityGreater] = useState(null);
  const [probabilityLess, setProbabilityLess] = useState(null);
  const [dataPoints, setDataPoints] = useState([]);

  const calculateNormal = () => {
    if (!mean || !stdDev || !xValue) {
      alert("אנא הזן את הממוצע, הסטיית תקן וערך X.");
      return;
    }
    const meanVal = parseFloat(mean);
    const stdDevVal = parseFloat(stdDev);
    const xVal = parseFloat(xValue);
    const variance = stdDevVal ** 2;
    const step = stdDevVal / 10;
    const xValues = Array.from(
      { length: 61 },
      (_, i) => meanVal + (i - 30) * step
    );
    const pdfPoints = xValues.map((x) => ({
      x: x.toFixed(2),
      y: (
        (1 / (stdDevVal * Math.sqrt(2 * Math.PI))) *
        Math.exp(-((x - meanVal) ** 2 / (2 * variance)))
      ).toFixed(4),
    }));

    setDataPoints(pdfPoints);
    const z = (xVal - meanVal) / stdDevVal;
    setProbabilityGreater((0.5 * (1 - erf(z / Math.sqrt(2)))).toFixed(4));
    setProbabilityLess((0.5 * (1 + erf(z / Math.sqrt(2)))).toFixed(4));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>מחשבון התפלגות נורמלית</Text>
      <TextInput
        style={styles.input}
        placeholder="הזן את הממוצע (μ)"
        value={mean}
        onChangeText={setMean}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="הזן את הסטיית תקן (σ)"
        value={stdDev}
        onChangeText={setStdDev}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="הזן את ערך X"
        value={xValue}
        onChangeText={setXValue}
        keyboardType="numeric"
      />
      <Button title="חשב" onPress={calculateNormal} color="#007bff" />
      {probabilityGreater !== null && (
        <Text style={styles.resultText}>
          ההסתברות ש-X גדול מ {xValue} היא: {probabilityGreater}
        </Text>
      )}
      {probabilityLess !== null && (
        <Text style={styles.resultText}>
          ההסתברות ש-X קטן מ {xValue} היא: {probabilityLess}
        </Text>
      )}
      {dataPoints.length > 0 && (
        <LineChart
          data={{
            labels: dataPoints.map((dp) => dp.x),
            datasets: [{ data: dataPoints.map((dp) => parseFloat(dp.y)) }],
          }}
          width={screenWidth - 16}
          height={220}
          yAxisLabel=""
          yAxisSuffix="pdf"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 4,
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
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
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default NormalScreen;
