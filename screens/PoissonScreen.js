import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Decimal } from 'decimal.js';

const PoissonScreen = () => {
    const [lamda, setLamda] = useState("");
    const [k, setK] = useState("");
    const [dataPoints, setDataPoints] = useState([]);

    const factorial = (n) => {
        let result = new Decimal(1);
        for (let i = 2; i <= n; i++) {
            result = result.mul(i);
        }
        return result;
    };

    const calculatePoissonProbability = (lamda, k) => {
        const lamdaDec = new Decimal(lamda);
        const kDec = new Decimal(k);
        const factorialK = factorial(k);
        const lamdaPowerK = Decimal.pow(lamdaDec, kDec);
        const eNegLamda = Decimal.exp(lamdaDec.neg());

        return lamdaPowerK.mul(eNegLamda).div(factorialK).toNumber();
    };

    const calculatePoisson = () => {
        const lamdaValue = parseFloat(lamda);
        const kValue = parseInt(k);

        if (isNaN(lamdaValue) || lamdaValue < 0) {
            alert("Invalid λ (lamda). Please enter a positive number.");
            return;
        }
        if (isNaN(kValue) || kValue < 0 || !Number.isInteger(kValue)) {
            alert("Invalid k. Please enter a non-negative integer.");
            return;
        }

        const poissonResult = calculatePoissonProbability(lamdaValue, kValue);
        updateDataPoints(kValue, poissonResult);
    };

    const updateDataPoints = (k, result) => {
        const newPoint = { label: `P(X=${k})`, value: result };
        setDataPoints(prevDataPoints => [...prevDataPoints.filter(point => point.label !== newPoint.label), newPoint]);
    };

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Poisson Distribution Calculator</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter λ (lamda)"
                value={lamda}
                onChangeText={setLamda}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter k (number of occurrences)"
                value={k}
                onChangeText={setK}
                keyboardType="numeric"
            />
            <Button title="Calculate" onPress={calculatePoisson} color="#007bff" />
            
            <View style={styles.results}>
                {dataPoints.map((point, index) => (
                    <Text key={index} style={styles.resultText}>
                        {point.label}: {point.value.toFixed(4)}
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
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#2c3e50", // Darker color for better readability
    },
    input: {
        width: "90%",
        height: 45,
        borderColor: "#3498db", // Soft blue border
        borderWidth: 1,
        borderRadius: 5, // Rounded borders
        paddingHorizontal: 15,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: "#ecf0f1", // Light gray background for input
    },
    results: {
        marginTop: 20,
        width: "100%",
        paddingHorizontal: 10,
    },
    resultText: {
        fontSize: 16,
        color: "#34495e", // Soft black color
        marginBottom: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: "#bdc3c7", // Light grey border for results
        borderRadius: 5, // Rounded borders for result texts
        backgroundColor: "#ecf0f1", // Light gray background for results
    },
});

export default PoissonScreen;
