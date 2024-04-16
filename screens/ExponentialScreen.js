import * as Math from "mathjs";

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
import { Picker } from "@react-native-picker/picker";

const screenWidth = Dimensions.get("window").width;

const ExponentialScreen = () => {
    const [lambda, setLambda] = useState("");
    const [k, setK] = useState("");
    const [dataPoints, setDataPoints] = useState({ labels: [], probabilities: [] });
    const [specialProbs, setSpecialProbs] = useState({ pLess: null, pGreater: null, pEqual: null });

    const calculateExponential = () => {
        const lambdaVal = parseFloat(lambda);
        const kVal = parseFloat(k);
        if (isNaN(lambdaVal) || lambdaVal <= 0 || isNaN(kVal) || kVal < 0) {
            alert("Please enter valid values for λ (must be positive) and k (must be non-negative).");
            return;
        }

        let probabilities = [];
        let labels = [];
        for (let x = 0; x <= 5; x += 0.1) {
            let formattedX = parseFloat(x.toFixed(1));
            let probability = lambdaVal * Math.exp(-lambdaVal * formattedX);
            probabilities.push(probability);
            labels.push(`x=${formattedX.toFixed(1)}`);
        }
        setDataPoints({ labels, probabilities });

        const pGreater = Math.exp(-lambdaVal * kVal).toFixed(4);
        const pLess = (1 - Math.exp(-lambdaVal * kVal)).toFixed(4);
        const pEqual = (lambdaVal * Math.exp(-lambdaVal * kVal)).toFixed(4);

        setSpecialProbs({ pLess, pGreater, pEqual });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Exponential Distribution Calculator</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter λ (rate of occurrence)"
                value={lambda}
                onChangeText={setLambda}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter k (value for probability calculation)"
                value={k}
                onChangeText={setK}
                keyboardType="numeric"
            />
             <Button title="Calculate" onPress={calculateExponential} color="#007bff" />
            {specialProbs.pGreater !== null && (
                <>
                    <Text style={styles.resultText}>P(X &gt; {k}) = {specialProbs.pGreater}</Text>
                    <Text style={styles.resultText}>P(X &lt; {k}) = {specialProbs.pLess}</Text>
                    <Text style={styles.resultText}>P(X = {k}) = {specialProbs.pEqual}</Text>
                </>
            )}
            {dataPoints.labels.length > 0 && (
                <LineChart
                    data={{
                        labels: dataPoints.labels,
                        datasets: [{ data: dataPoints.probabilities }]
                    }}
                    width={screenWidth}
                    height={220}
                    yAxisLabel="P"
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
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
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
        textAlign: 'center',
    },
});

export default ExponentialScreen;
