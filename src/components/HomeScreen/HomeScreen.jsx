import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null); // Alterar para armazenar todos os dados do usuário

    useEffect(() => {
        // Fetch user data from AsyncStorage
        const getUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('userData');
                if (storedUserData) {
                    setUserData(JSON.parse(storedUserData)); // Atualizar os dados do usuário do estado
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getUserData();
    }, []);

    const handleLogout = async () => {
        // Clear user data from AsyncStorage
        try {
            await AsyncStorage.removeItem('userData');
            // Redirect to login screen
            navigation.replace('Login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={styles.container}>
            {userData ? (
                <View>
                    <Text style={styles.heading}>Welcome, {userData.username}</Text>
                    {/* Adicione outros dados do usuário, se necessário */}
                </View>
            ) : (
                <Text>Loading...</Text>
            )}
            <Button title="Logout" onPress={handleLogout} />
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
});

export default HomeScreen;

