import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import * as math from "mathjs";

const screenWidth = Dimensions.get("window").width;

const HypergeometricScreen = () => {
    const [N, setN] = useState("");
    const [D, setD] = useState("");
    const [n, setn] = useState("");
    const [dataPoints, setDataPoints] = useState({labels: [], probabilities: []});

    const calculateHypergeometric = () => {
        const NVal = parseInt(N);
        const DVal = parseInt(D);
        const nVal = parseInt(n);

        if (isNaN(NVal) || isNaN(DVal) || isNaN(nVal) || NVal < 0 || DVal < 0 || nVal < 0 || DVal > NVal || nVal > NVal) {
            alert("אנא הזן ערכים תקפים: N, D ו-n צריכים להיות מספרים שלמים חיוביים, D ו-n לא יכולים להיות גדולים מ-N.");
            return;
        }

        let probabilities = [];
        let labels = [];
        for (let k = Math.max(0, nVal - (NVal - DVal)); k <= Math.min(DVal, nVal); k++) {
            const prob = math.combinations(DVal, k) * math.combinations(NVal - DVal, nVal - k) / math.combinations(NVal, nVal);
            probabilities.push(prob);
            labels.push(`k=${k}`);
        }
        setDataPoints({labels, probabilities});
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>מחשבון התפלגות היפרגאומטרית</Text>
            <TextInput
                style={styles.input}
                placeholder="הזן N (סך הפריטים)"
                value={N}
                onChangeText={setN}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="הזן D (מספר הפריטים המיוחדים)"
                value={D}
                onChangeText={setD}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="הזן n (גודל הדגימה)"
                value={n}
                onChangeText={setn}
                keyboardType="numeric"
            />
            <Button title="חשב" onPress={calculateHypergeometric} color="#007bff" />
            {dataPoints.probabilities.length > 0 && (
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
                        decimalPlaces: 5,
                        color: (opacity = 1) => `rgba(133, 182, 111, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                    verticalLabelRotation={30}
                />
            )}
            <ScrollView style={styles.results}>
                {dataPoints.probabilities.map((probability, index) => (
                    <Text key={index} style={styles.resultText}>{`${dataPoints.labels[index]}: ${probability.toFixed(5)}`}</Text>
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
        flex: 1,
        marginTop: 20,
    },
    resultText: {
        fontSize: 16,
        marginBottom: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: "#bdc3c7",
        borderRadius: 5,
        backgroundColor: "#ecf0f1",
        textAlign: 'center',  // Ensures text is centered within its container
    },
});

export default HypergeometricScreen;
