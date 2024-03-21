import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';

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
            <ImageBackground source={require('../../assets/imagens/background.png')} style={styles.background}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={hidePassword}
                        />
                        <TouchableOpacity style={styles.toggle} onPress={() => setHidePassword(!hidePassword)}>
                            <Text>{hidePassword ? 'Mostrar' : 'Esconder'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Esqueceu a senha', 'Recuperação de senha ainda não implementada')}>
                            <Text style={styles.buttonText}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>
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
            justifyContent: 'center', // Alterado de 'center' para 'flex-start'
            padding: 16,
            paddingTop: 450 // Ajuste este valor para descer os elementos
        },
        input: {
            height: 40,
            borderColor: 'white',
            borderWidth: 1.8,
            marginBottom: 10,
            paddingLeft: 10,
            backgroundColor: 'rgba(144, 238, 144, 0.8)',
            borderRadius: 10
        },
        toggle: {
            padding: 4,
            position: 'absolute',
            right: 0,
            top: 8
        },
        button: {
            backgroundColor: 'forestgreen',// Cor de fundo do botão
            padding: 15,
            borderColor: 'white',
            borderWidth: 1.8,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            // Adicione margens conforme necessário
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16 // Cor do texto do botão
            // Adicione estilos de texto conforme necessário
        },
        buttonContainer: {
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
        }
    });
    
    export default LoginScreen;