import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [goals, setGoals] = useState('');

    const handleSave = async () => {
        try {
            // Salvar as informações do perfil no AsyncStorage
            await AsyncStorage.setItem('weight', weight);
            await AsyncStorage.setItem('height', height);
            await AsyncStorage.setItem('goals', goals);

            // Opcionalmente, você também pode atualizar estas informações no servidor
            console.log('Profile information saved successfully');
        } catch (error) {
            console.error('Error saving profile information:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Update Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Weight (kg)"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Height (cm)"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Goals"
                value={goals}
                onChangeText={setGoals}
            />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default ProfileScreen;
