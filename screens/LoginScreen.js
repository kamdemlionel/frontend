import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const API_URL = "http://192.168.1.184:5000"; // Replace with your local IP

    const handleLogin = async () => {
        if (email && password) {
            try {
                const response = await axios.post(`${API_URL}/login`, {
                    email,
                    password,
                });

                console.log('User logged in successfully:', response.data);
                navigation.replace('Home'); // Redirect to Home screen
            } catch (err) {
                console.log('Error logging in:', err.response?.data?.message || err.message);
            }
        } else {
            console.log('Please fill in all fields');
        }
    };

    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image source={require('../assets/images/loginimg1.png')} style={{ width: 220, height: 200 }} />
                </View>
            </SafeAreaView>
            <View className="flex-1 bg-white px-8 pt-8" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                <View className="form space-y-2">
                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" placeholder="Email" value={email} onChangeText={setEmail} />

                    <Text className="text-gray-700 ml-4">Password</Text>
                    <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl" secureTextEntry placeholder="Password" value={password} onChangeText={setPassword} />

                    <TouchableOpacity className="flex items-end">
                        <Text className="text-gray-700 mb-5">Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="py-3 bg-blue-500 rounded-xl" onPress={handleLogin}>
                        <Text className="text-xl font-bold text-center text-white">Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
