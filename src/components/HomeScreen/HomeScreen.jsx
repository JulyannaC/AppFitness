import React, { useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation, route }) => {
    const [dailyCalories, setDailyCalories] = useState('');
    const [bmi, setBmi] = useState('');
    const [proteinMacro, setProteinMacro] = useState('');
    const [carbsMacro, setCarbsMacro] = useState('');
    const [fatMacro, setFatMacro] = useState('');
    const [bodyFatPercentage, setBodyFatPercentage] = useState('');
    const [idealWeight, setIdealWeight] = useState('');

    const [goalValue, setGoalValue] = useState('')

    const [activityLevelNumber, setActivityLevelNumber] = useState('')
    

    useEffect(() => {
        if(userData){
            fetchData();
        }
        const fetchData = async () => {
            try {
                const url = 'https://fitness-calculator.p.rapidapi.com';

                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'f4049a9fdcmshc92d3baac82a724p134b29jsn7d78df1d390b',
                        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
                    }
                };

                // Fetch para Calorias Diárias
                fetch(`${url}/dailycalorie?age=${route.params.userData.age}&gender=${route.params.userData.gender}&weight=${route.params.userData.weight}&height=${route.params.userData.height}&activitylevel=${route.params.userData.activityLevel}`, options)
                    .then(response => response.json())
                    .then(data => {
                        setDailyCalories(data.data.goals[route.params.userData.goal].calory);
                    });

                // Fetch para BMI
                fetch(`${url}/bmi?age=${route.params.userData.age}&weight=${route.params.userData.weight}&height=${route.params.userData.height}`, options)
                    .then(response => response.json())
                    .then(data => {
                        setBmi(data.data.bmi);
                    });

                // Fetch para Macros
                // fetch(`${url}/macrocalculator?age=${route.params.userData.age}&gender=${route.params.userData.gender}&height=${route.params.userData.height}&weight=${route.params.userData.weight}&activitylevel=${route.params.userData.activityLevel}&goal=${route.params.userData.goal}`, options)
                //     .then(response => response.json())
                //         .then(data => {
                //             setProteinMacro (data.data.balanced.protein).toFixed(0),
                //             setCarbsMacro (data.data.balanced.carbs).toFixed(0),
                //             setFatMacro (data.data.balanced.fat).toFixed(0)
                //         });

                // TESTAR --------------------------------------------------------------------

                switch (route.params.userData.goal) {
                    case "Maintain weight":
                        setGoalValue('maintain')
                    case "Mild weight loss":
                        setGoalValue('midlose')
                    case "Weight loss":
                        setGoalValue('weightlose')
                    case "Extreme weight loss":
                        setGoalValue('extremelose')
                    case "Mild weight gain":
                        setGoalValue('mildgain')
                    case "Weight gain":
                        setGoalValue('weightgain')
                    case "Extreme weight gain":
                        setGoalValue('extremegain')
                }

                switch (route.params.userData.activityLevel) {
                    case "level_1":
                        setActivityLevelNumber(1)
                    case "level_2":
                        setActivityLevelNumber(2)
                    case "level_3":
                        setActivityLevelNumber(3)
                    case "level_4":
                        setActivityLevelNumber(4)
                    case "level_5":
                        setActivityLevelNumber(5)
                    case "level_6":
                        setActivityLevelNumber(6)
                    case "level_7":
                        setActivityLevelNumber(7)
                }


                fetch(`${url}/macrocalculator?age=${route.params.userData.age}&gender=${route.params.userData.gender}&height=${route.params.userData.height}&weight=${route.params.userData.weight}&activitylevel=${activityLevelNumber}&goal=${goalValue}`, options)
                    .then(response => response.json())
                    .then(data => {
                        setProteinMacro(data.data.balanced.protein)
                        setCarbsMacro(data.data.balanced.carbs)
                        setFatMacro(data.data.balanced.fat)
                    });

                // TESTAR --------------------------------------------------------------------



                // Fetch para Percentual de Gordura Corporal
                fetch(`${url}/bodyfat?age=${route.params.userData.age}&gender=${route.params.userData.gender}&weight=${route.params.userData.weight}&height=${route.params.userData.height}&neck=${route.params.userData.neck}&waist=${route.params.userData.waist}&hip=${route.params.userData.hip}`, options)
                    .then(response => response.json())
                    .then(data => {
                        setBodyFatPercentage(data.data["Body Fat (U.S. Navy Method)"]);
                    });

                // Fetch para Peso Ideal
                fetch(`${url}/idealweight?gender=${route.params.userData.gender}&height=${route.params.userData.height}`, options)
                    .then(response => response.json())
                    .then(data => {
                        setIdealWeight(data.data.Devine);
                    });

            } catch (error) {
                console.error(error);
            }
        };

        navigation.setOptions({
            headerLeft: () => null,
        });

        fetchData();
    }, [route.params?.userData]);



    return (
        userData ?

            <ImageBackground source={require('../../assets/imagens/HomeScreen.jpg')} style={styles.background}>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                        style={styles.profileButton}>
                        <Text style={styles.buttonText}>Perfil</Text>
                    </TouchableOpacity>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Calorias diárias</Text>
                        <Text style={styles.cardValue}>{dailyCalories}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>IMC</Text>
                        <Text style={styles.cardValue}>{bmi}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Macros</Text>
                        <Text style={styles.cardValue}>
                            <Text style={styles.boldLabel}>Proteínas:</Text> {proteinMacro} g
                        </Text>
                        <Text style={styles.cardValue}>
                            <Text style={styles.boldLabel}>Carboidratos:</Text> {carbsMacro} g
                        </Text>
                        <Text style={styles.cardValue}>
                            <Text style={styles.boldLabel}>Gorduras:</Text> {fatMacro} g
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Percentual de gordura corporal</Text>
                        <Text style={styles.cardValue}>{bodyFatPercentage} %</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Peso ideal</Text>
                        <Text style={styles.cardValue}>{idealWeight} kg</Text>
                    </View>
                    <TouchableOpacity
                        onPress={async () => {
                            await AsyncStorage.removeItem('userToken');
                            navigation.navigate('NutriCount');
                        }}
                        style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            :

            <ImageBackground source={require('../../assets/imagens/HomeScreen.jpg')} style={styles.background}>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                        style={styles.profileButton}>
                        <Text style={styles.buttonText}>Perfil</Text>
                    </TouchableOpacity>
                    <Text>Defina seu perfil!</Text>
                </View>
            </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingTop: 65
    },
    profileButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 90, // Ajuste a largura conforme necessário
        height: 35, // Ajuste a altura conforme necessário
        borderRadius: 15, // Metade da altura para ficar totalmente arredondado
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orangered', // Exemplo de cor de fundo
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    logoutButton: {
        position: 'absolute',
        bottom: 15,
        left: 10,
        width: 90, // Ajuste a largura conforme necessário
        height: 35, // Ajuste a altura conforme necessário
        borderRadius: 15, // Metade da altura para ficar totalmente arredondado
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orangered', // Exemplo de cor de fundo
    },
    card: {
        backgroundColor: 'rgba(255, 69, 0, 0.6)',
        borderRadius: 10,
        borderColor: 'ivory',
        borderWidth: 3.5,
        padding: 18,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    cardTitle: {
        fontSize: 22,
        color: 'ivory',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardValue: {
        fontSize: 22,
        color: 'whitesmoke',
    },
    boldLabel: {
        fontWeight: 'bold',
    },
});

export default HomeScreen;