import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const API_URL = "http://192.168.1.184:5000"; // Replace with your local IP

    const handleSubmit = async () => {
        if (firstName && lastName && email && password) {
            try {
                const response = await axios.post(`${API_URL}/createAccount`, {
                    firstName,
                    lastName,
                    email,
                    password,
                });

                console.log('User registered successfully:', response.data);
                navigation.replace('Login'); // Redirect to Login screen
            } catch (err) {
                console.log('Error signing up:', err.response?.data?.message || err.message);
            }
        } else {
            console.log('Please fill in all fields');
        }
    };

    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image source={require("../assets/images/signup1.png")} style={{ width: 325, height: 80 }} />
                </View>
            </SafeAreaView>
            <View className="flex-1 bg-white px-8 pt-8" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                <View className="form space-y-2">
                    <Text className="text-gray-700 ml-4">First Name</Text>
                    <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" value={firstName} onChangeText={setFirstName} placeholder="Enter First Name" />

                    <Text className="text-gray-700 ml-4">Last Name</Text>
                    <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" value={lastName} onChangeText={setLastName} placeholder="Enter Last Name" />

                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" value={email} onChangeText={setEmail} placeholder="Enter Email" />

                    <Text className="text-gray-700 ml-4">Password</Text>
                    <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7" secureTextEntry value={password} onChangeText={setPassword} placeholder="Enter Password" />

                    <TouchableOpacity className="py-3 bg-blue-500 rounded-xl" onPress={handleSubmit}>
                        <Text className="font-xl font-bold text-center text-white">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
