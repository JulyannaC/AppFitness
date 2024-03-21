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

    let userData = route.params.userData

    const fetchData = async () => {
        const url = 'https://fitness-calculator.p.rapidapi.com';

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f4049a9fdcmshc92d3baac82a724p134b29jsn7d78df1d390b',
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
        };

        // Fetch para Calorias Diárias
        const fetchCalories = () => {
            fetch(`${url}/dailycalorie?age=${userData.age}&gender=${userData.gender}&weight=${userData.weight}&height=${userData.height}&activitylevel=${userData.activityLevel}`, options)
                .then(response => response.json())
                .then(data => {
                    console.info("goals: ", data.data.goals["maintain weight"])
                    if(userData.goal === "maintain weight"){
                        setDailyCalories((data.data.goals[userData.goal]).toFixed(2))
                    } else{
                        setDailyCalories((data.data.goals[userData.goal].calory).toFixed(2));
                    }
                })
                .catch((error) => {
                    console.info(error);
                })
        }

        fetchCalories()

        // Fetch para BMI
        const fetchBMI = () => {
            fetch(`${url}/bmi?age=${userData.age}&weight=${userData.weight}&height=${userData.height}`, options)
                .then(response => response.json())
                .then(data => {
                    setBmi(data.data.bmi);
                });
        }

        fetchBMI()


        const fetchMacro = () => {
            let goalValue
            let activityLevelNumber

            switch (userData.goal) {
                case "maintain weight":
                    goalValue = 'maintain'
                    break
                case "Mild weight loss":
                    goalValue = 'midlose'
                    break
                case "Weight loss":
                    goalValue = 'weightlose'
                    break
                case "Extreme weight loss":
                    goalValue = 'extremelose'
                    break
                case "Mild weight gain":
                    goalValue = 'mildgain'
                    break
                case "Weight gain":
                    goalValue = 'weightgain'
                    break
                case "Extreme weight gain":
                    goalValue = 'extremegain'
                    break
            }

            switch (userData.activityLevel) {
                case "level_1":
                    activityLevelNumber = 1
                    break
                case "level_2":
                    activityLevelNumber = 2
                    break
                case "level_3":
                    activityLevelNumber = 3
                    break
                case "level_4":
                    activityLevelNumber = 4
                    break
                case "level_5":
                    activityLevelNumber = 5
                    break
                case "level_6":
                    activityLevelNumber = 6
                    break
                case "level_7":
                    activityLevelNumber = 7
                    break
            }


            fetch(`${url}/macrocalculator?age=${userData.age}&gender=${userData.gender}&height=${userData.height}&weight=${userData.weight}&activitylevel=${activityLevelNumber}&goal=${goalValue}`, options)
                .then(response => response.json())
                .then(data => {
                    setProteinMacro(data.data.balanced.protein.toFixed(0))
                    setCarbsMacro(data.data.balanced.carbs.toFixed(0))
                    setFatMacro(data.data.balanced.fat.toFixed(0))
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        fetchMacro()

        // Fetch para Percentual de Gordura Corporal
        const fetchPercentual = () => {
            fetch(`${url}/bodyfat?age=${userData.age}&gender=${userData.gender}&weight=${userData.weight}&height=${userData.height}&neck=${userData.neck}&waist=${userData.waist}&hip=${userData.hip}`, options)
                .then(response => response.json())
                .then(data => {
                    setBodyFatPercentage(data.data["Body Fat (U.S. Navy Method)"]);
                });
        }

        fetchPercentual()

        // Fetch para Peso Ideal
        const fetchIdeal = () => {
            fetch(`${url}/idealweight?gender=${userData.gender}&height=${userData.height}`, options)
                .then(response => response.json())
                .then(data => {
                    setIdealWeight(data.data.Devine);
                });
        }

        fetchIdeal()
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
            console.log('reloaded');
        })
        // essa função é pra recarregar a página quando volta pra ela, foi pra debug. nao sei se influencia muito, se testar e funcionar sem, pode apagar

        if (userData != '') {
            fetchData();
        } else {
            console.log(userData, 'vazio')
        }

        navigation.setOptions({
            headerLeft: () => null,
        });

        return unsubscribe

    }, [route]);



    return (
        userData != '' ?

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
                    <Text>Defina seu perfil!</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                        style={styles.profileButton}>
                        <Text style={styles.buttonText}>Perfil</Text>
                    </TouchableOpacity>
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