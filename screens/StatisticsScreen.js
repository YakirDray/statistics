import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';


const StatisticsScreen = () => {
    const [numbers, setNumbers] = useState('');
    const [mean, setMean] = useState(null);
    const [variance, setVariance] = useState(null);

    const calculateStatistics = () => {
        const numArray = numbers.split(',').map(Number);
        const meanValue = numArray.reduce((acc, val) => acc + val, 0) / numArray.length;
        setMean(meanValue);

        const varianceValue = numArray.reduce((acc, val) => acc + Math.pow(val - meanValue, 2), 0) / numArray.length;
        setVariance(varianceValue);
    };

    const handleSaveToPDF = async () => {
        const dataPoints = [
            { label: "Mean (Average)", value: mean },
            { label: "Variance", value: variance }
        ];
        await createPDF(dataPoints);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Statistics Calculator</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter numbers separated by commas"
                value={numbers}
                onChangeText={setNumbers}
                keyboardType="numeric"
            />
            <Button title="Calculate" onPress={calculateStatistics} color="#007bff" />
            <Button title="Save to PDF" onPress={handleSaveToPDF} color="#007bff" />
            <View style={styles.results}>
                <Text style={styles.resultText}>Mean (Average): {mean ? mean.toFixed(2) : 'N/A'}</Text>
                <Text style={styles.resultText}>Variance: {variance ? variance.toFixed(2) : 'N/A'}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#cccccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    results: {
        marginTop: 20,
    },
    resultText: {
        fontSize: 18,
        marginVertical: 5,
    },
});

export default StatisticsScreen;
