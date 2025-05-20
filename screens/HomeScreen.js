import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { HomeIcon, ClockIcon, CogIcon } from "react-native-heroicons/outline";
import axios from "axios";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native"; // <-- Import navigation hook

const { width } = Dimensions.get("window");

const MessageCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const messages = [
    "Transfer money anywhere, anytime!",
    "Zero fees on your first 3 transfers this month",
    "Update your profile for enhanced security",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < messages.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  useEffect(() => {
    flatListRef.current?.scrollTo({
      x: currentIndex * width,
      animated: true,
    });
  }, [currentIndex]);

  return (
    <View className="mb-6">
      <ScrollView
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={{ width: width - 48 }}
            className="bg-blue-50 rounded-xl p-6 m-1 border border-blue-100"
          >
            <Text className="text-blue-700 font-medium">{message}</Text>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row justify-center mt-3">
        {messages.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // Calculate total with 3% fee
  const parsedAmount = parseInt(amount);
  const fee = !isNaN(parsedAmount) ? Math.ceil(parsedAmount * 0.03) : 0;
  const totalAmount = !isNaN(parsedAmount) ? parsedAmount + fee : 0;

  // ...authenticateWithFaceID remains unchanged...

  const handleTransfer = async () => {
    if (!phoneNumber || !amount) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount < 100) {
      Alert.alert("Error", "Amount must be an integer of at least 100 XAF");
      return;
    }

    if (!/^6[\d]{8}$/.test(phoneNumber)) {
      Alert.alert(
        "Error",
        "Invalid phone number. Must be 9 digits starting with 6"
      );
      return;
    }

    const isAuthenticated = await authenticateWithFaceID();
    if (!isAuthenticated) {
      Alert.alert("Transaction Cancelled", "Face ID authentication failed.");
      return;
    }

    setIsLoading(true);

    try {
      // Send totalAmount (amount + 3% fee) to backend
      const response = await axios.post(
        "http://192.168.1.184:3000/direct-pay",
        {
          amount: totalAmount,
          phone: phoneNumber,
        }
      );

      const { transId, message, statusCode } = response.data;

      if (statusCode >= 200 && statusCode < 300 && transId) {
        Alert.alert(
          "Success",
          `Payment initiated! Transaction ID: ${transId}`,
          [
            {
              text: "OK",
              onPress: () => {
                setPhoneNumber("");
                setAmount("");
                navigation.navigate("Home2", { amount: totalAmount });
              },
            },
          ]
        );
      } else {
        Alert.alert("Error", message || "Failed to initiate payment");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to connect to server";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{ flex: 1, paddingTop: StatusBar.currentHeight }}
        edges={["top"]}
        className="flex-1 bg-gray-50"
      >
        {/* ...existing header and carousel... */}
        <View className="flex-1 px-3 pt-10">
          <Text className="text-3xl font-bold text-blue-600 mb-2">
            Funds Transfer
          </Text>
          <Text className="text-gray-500 mb-6">
            Quick and secure money transfers
          </Text>
          <MessageCarousel />
          <ScrollView>
            <View className="flex-col justify-around p-3 shadow-sm mb-3">
              {/* Phone Number Input */}
              <View className="mb-4">
                <Text className="text-gray-700 text-sm mb-1">
                  sender number
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-5 bg-gray-50"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="numeric"
                />
              </View>
              {/* Amount Input */}
              <View className="mb-4">
                <Text className="text-gray-700 text-sm mb-1 mt-4">Amount</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-5 bg-gray-50"
                  placeholder="Enter amount"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
              </View>
              {/* Show fee and total */}
              <View className="mb-10">
                <Text className="text-gray-700 text-sm mb-1 mt-4">
                  3% Fee: <Text className="font-bold">{fee} XAF</Text>
                </Text>
                <Text className="text-gray-700 text-sm mb-1 mt-1">
                  Total to be debited:{" "}
                  <Text className="font-bold">{totalAmount} XAF</Text>
                </Text>
              </View>
              {/* Transfer Button */}
              <TouchableOpacity
                className={`py-4 rounded-lg ${
                  phoneNumber && amount && !isLoading
                    ? "bg-blue-600"
                    : "bg-blue-300"
                }`}
                onPress={handleTransfer}
                disabled={!phoneNumber || !amount || isLoading}
              >
                <Text className="text-white font-semibold text-center">
                  {isLoading ? "Processing..." : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {/* ...existing bottom navigation... */}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
