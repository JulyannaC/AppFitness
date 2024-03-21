import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const handleLogin = () => {
        // Aqui você pode adicionar a lógica de autenticação
        if (username === '' || password === '') {
        Alert.alert('Erro', 'Por favor, insira o nome de usuário e a senha');
        } else {
        // Se a autenticação for bem-sucedida, redirecione para a tela Home
        // Aqui você pode adicionar a lógica para verificar o nome de usuário e a senha com seus dados armazenados ou com seu serviço de autenticação
        if (username === 'admin' && password === 'admin') {
            navigation.navigate('Home');
        } else {
            Alert.alert('Erro', 'Nome de usuário ou senha incorretos');
        }
        }
    };

    return (
        <ImageBackground source={require('./path-to-your-image.jpg')} style={styles.background}>
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            />
            <View style={styles.passwordContainer}>
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={hidePassword}
            />
            <TouchableOpacity style={styles.toggle} onPress={() => setHidePassword(!hidePassword)}>
                <Text style={styles.toggleText}>{hidePassword ? 'Mostrar' : 'Esconder'}</Text>
            </TouchableOpacity>
            </View>
            <Button title="Login" onPress={handleLogin} color="#841584" />
            <Button title="Esqueceu a senha?" onPress={() => Alert.alert('Esqueceu a senha', 'Recuperação de senha ainda não implementada')} color="#841584" />
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        backgroundColor: 'white',
    },
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    toggle: {
        padding: 4,
    },
    toggleText: {
        color: 'white',
    },
});

export default LoginScreen;
