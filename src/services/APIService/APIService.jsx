import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = 'f4049a9fdcmshc92d3baac82a724p134b29jsn7d78df1d390b';
const BASE_URL = 'https://fitness-calculator.p.rapidapi.com';

const ApiService = {

    authenticateUser: async (username, password) => {
        // Fazer a chamada para a API de autenticação (supondo que você tenha uma API de autenticação separada)
        try {
            
            const userData = {
                username: username,
                // Outros dados do usuário se necessário
            };

            // Armazenar os dados do usuário em AsyncStorage
            await AsyncStorage.setItem('userData', JSON.stringify(userData));

            // Retornar os dados do usuário
            return userData;
        } catch (error) {
            // Em caso de erro, lançar uma exceção
            throw new Error('Authentication failed');
        }
    },

    fetchDailyCalorie: async ({ age, gender, height, weight, activityLevel }) => {
        const url = `${BASE_URL}/dailycalorie?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${activityLevel}`;
        return await fetchData(url);
    },

    fetchBurnedCalorie: async ({ activityId, activityMin, weight }) => {
        const url = `${BASE_URL}/burnedcalorie?activityid=${activityId}&activitymin=${activityMin}&weight=${weight}`;
        return await fetchData(url);
    },

    fetchBMI: async ({ age, weight, height }) => {
        const url = `${BASE_URL}/bmi?age=${age}&weight=${weight}&height=${height}`;
        return await fetchData(url);
    },

    fetchBodyFatPercentage: async ({ age, gender, weight, height, neck, waist, hip }) => {
        const url = `${BASE_URL}/bodyfat?age=${age}&gender=${gender}&weight=${weight}&height=${height}&neck=${neck}&waist=${waist}&hip=${hip}`;
        return await fetchData(url);
    },

    fetchIdealWeight: async ({ gender, height }) => {
        const url = `${BASE_URL}/idealweight?gender=${gender}&height=${height}`;
        return await fetchData(url);
    },
};

const fetchData = async (url) => {
    const options = {
        method: 'GET',
        headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const result = await response.text();
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default ApiService;
