import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState({
        name: '',
        age: '',
        weight: '',
        height: '',
        waist: '',
        hip: '',
        neck: '',
        gender: '',
        activityLevel: '',
        goal: ''
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const savedUser = await AsyncStorage.getItem('user');
                if (savedUser !== null) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error(error);
            }
        };

        navigation.setOptions({
            headerLeft: () => null,
        });

        loadProfile();
    }, []);

    const saveProfile = async () => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            navigation.navigate('Home',  { userData: user }); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/imagens/profile.jpg')} style={styles.background}>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.title}>Seja bem vindo (a)!</Text>
                    <View style={styles.content}>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Nome</Text>
                            <TextInput
                                style={styles.input}
                                value={user.name}
                                onChangeText={text => setUser({ ...user, name: text })}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Idade</Text>
                            <TextInput
                                style={styles.input}
                                value={user.age}
                                onChangeText={text => setUser({ ...user, age: text })}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Peso</Text>
                            <TextInput
                                style={styles.input}
                                value={user.weight}
                                onChangeText={text => setUser({ ...user, weight: text })}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Altura</Text>
                            <TextInput
                                style={styles.input}
                                value={user.height}
                                onChangeText={text => setUser({ ...user, height: text })}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Cintura</Text>
                            <TextInput
                                style={styles.input}
                                value={user.waist}
                                onChangeText={text => setUser({ ...user, waist: text })}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Quadril</Text>
                            <TextInput
                                style={styles.input}
                                value={user.hip}
                                onChangeText={text => setUser({ ...user, hip: text })}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Pescoço</Text>
                            <TextInput
                                style={styles.input}
                                value={user.neck}
                                onChangeText={text => setUser({ ...user, neck: text })}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Gênero</Text>
                            <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={user.gender}
                                onValueChange={itemValue => setUser({ ...user, gender: itemValue })}
                                style={styles.picker}
                            >
                                <Picker.Item label="Masculino" value="male" />
                                <Picker.Item label="Feminino" value="female" />
                            </Picker>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Nível de atividade</Text>
                            <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={user.activityLevel}
                                onValueChange={itemValue => setUser({ ...user, activityLevel: itemValue })}
                                style={styles.picker}
                            >
                                <Picker.Item label="BMR" value={'level_1'} />
                                <Picker.Item label="Sedentary: little or no exercise" value={'level_2'} />
                                <Picker.Item label="Exercise 1-3 times/week" value={'level_3'} />
                                <Picker.Item label="Exercise 4-5 times/week" value={'level_4'} />
                                <Picker.Item label="Daily exercise or intense exercise 3-4 times/week" value={'level_5'} />
                                <Picker.Item label="Intense exercise 6-7 times/week" value={'level_6'} />
                                <Picker.Item label="Very intense exercise daily, or physical job" value={'level_7'} />
                            </Picker>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Objetivo</Text>
                            <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={user.goal}
                                onValueChange={itemValue => setUser({ ...user, goal: itemValue })}
                                style={styles.picker}
                            >
                                <Picker.Item label="Maintain weight" value="Maintain weight" />
                                <Picker.Item label="Mild weight loss" value="Mild weight loss" />
                                <Picker.Item label="Weight loss" value="Weight loss" />
                                <Picker.Item label="Extreme weight loss" value="Extreme weight loss" />
                                <Picker.Item label="Mild weight gain" value="Mild weight gain" />
                                <Picker.Item label="Weight gain" value="Weight gain" />
                                <Picker.Item label="Extreme weight gain" value="Extreme weight gain" />
                            </Picker>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={saveProfile}
                            style={styles.saveButton}
                        >
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
    },
    content: {
        paddingBottom: 20, // Espaço para o botão salvar
    },
    homeButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'maroon'
    },
    card: {
        backgroundColor: 'rgba(139, 0, 0, 0.5)',
        borderRadius: 10,
        borderColor: 'ivory',
        borderWidth: 3.5,
        padding: 18,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'ivory',
        marginBottom: 5,
    },
    input: {
        height: 40,
        fontSize: 17,
        color: 'white',
        borderColor: 'ivory',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
    },
    pickerContainer: {
        // Estilização da View que envolve o Picker
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'ivory'
    },
    picker: {
        color: 'ivory',
        fontSize: 16
    },
    saveButton: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'maroon',
        padding: 10,
        color: 'ivory',
        fontSize: 14,
        borderRadius: 20,
        borderWidth: 1.8,
        borderColor: 'ivory',
        width: 150, // Diminuir o tamanho
    },
    buttonText:{
        color: 'white', 
        fontSize: 18
    }
});

export default ProfileScreen;

