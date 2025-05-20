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
} from "react-native";
import { HomeIcon, ClockIcon, CogIcon } from "react-native-heroicons/outline";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

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
      setCurrentIndex((prev) => (prev < messages.length - 1 ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  useEffect(() => {
    flatListRef.current?.scrollTo({ x: currentIndex * width, animated: true });
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

const HomeScreen2 = () => {
  const route = useRoute();
  const initialAmount = route.params?.amount ? String(route.params.amount) : "";
  const [receiverNumber, setReceiverNumber] = useState("");
  const [amount, setAmount] = useState(initialAmount);
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!receiverNumber || !amount || isNaN(parseInt(amount, 10))) {
      alert("Please enter a valid receiver number and amount.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://192.168.1.184:3000/payout", {
        amount: parseInt(amount, 10),
        phone: receiverNumber.toString(),
      });
      if (response.data && response.data.statusCode === 200) {
        alert(`Payout of ${amount} XAF to ${receiverNumber} successful!`);
        setReceiverNumber("");
      } else {
        alert(response.data.message || "Payout failed");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error processing payout. Please try again."
      );
      console.error(error);
    }
    setLoading(false);
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
        <View className="bg-blue-50 flex-row justify-between px-1 pt-4 items-center">
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
          <Image
            source={require("../assets/images/user.jpeg")}
            style={{ width: 50, height: 50, borderRadius: 30 }}
          />
        </View>
        <View className="flex-1 px-3 pt-10">
          <Text className="text-3xl font-bold text-blue-600 mb-2">Payout</Text>
          <Text className="text-gray-500 mb-6">
            Enter the receiver's number and confirm the amount to payout
          </Text>
          <MessageCarousel />
          <ScrollView>
            <View className="flex-col justify-around p-3 shadow-sm mb-3">
              <View className="mb-4">
                <Text className="text-gray-700 text-sm mb-1 mt-4">
                  Receiver number
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-5 bg-gray-50"
                  placeholder="Enter receiver's number"
                  value={receiverNumber}
                  onChangeText={setReceiverNumber}
                  keyboardType="numeric"
                />
              </View>
              <View className="mb-10">
                <Text className="text-gray-700 text-sm mb-1 mt-4">Amount</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-5 bg-gray-50"
                  placeholder="Enter amount"
                  value={amount}
                  editable={false} // Make it read-only
                />
              </View>
              <TouchableOpacity
                className={`py-4 rounded-lg ${
                  receiverNumber && amount && !loading
                    ? "bg-blue-600"
                    : "bg-blue-300"
                }`}
                onPress={handleTransfer}
                disabled={!receiverNumber || !amount || loading}
              >
                <Text className="text-white font-semibold text-center">
                  {loading ? "Processing..." : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View className="flex-row justify-around items-center py-4 bg-white border-t border-gray-200">
          <TouchableOpacity className="items-center">
            <HomeIcon size={24} color="#3b82f6" />
            <Text className="text-blue-600 text-xs mt-1">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <ClockIcon size={24} color="#6b7280" />
            <Text className="text-gray-500 text-xs mt-1">History</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <CogIcon size={24} color="#6b7280" />
            <Text className="text-gray-500 text-xs mt-1">Settings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen2;
