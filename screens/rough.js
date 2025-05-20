// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
//   Animated,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   StatusBar,
// } from "react-native";
// import { HomeIcon, ClockIcon, CogIcon } from "react-native-heroicons/outline";

// const { width } = Dimensions.get("window");

// const MessageCarousel = () => {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const flatListRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const messages = [
//     "Transfer money anywhere, anytime!",
//     "Zero fees on your first 3 transfers this month",
//     "Update your profile for enhanced security",
//   ];

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (currentIndex < messages.length - 1) {
//         setCurrentIndex(currentIndex + 1);
//       } else {
//         setCurrentIndex(0);
//       }
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, [currentIndex]);

//   useEffect(() => {
//     flatListRef.current?.scrollTo({
//       x: currentIndex * width,
//       animated: true,
//     });
//   }, [currentIndex]);

//   return (
//     <View className="mb-6">
//       <ScrollView
//         ref={flatListRef}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: false }
//         )}
//         scrollEventThrottle={16}
//       >
//         {messages.map((message, index) => (
//           <View
//             key={index}
//             style={{ width: width - 48 }}
//             className="bg-blue-50 rounded-xl p-6 m-1 border border-blue-100"
//           >
//             <Text className="text-blue-700 font-medium">{message}</Text>
//           </View>
//         ))}
//       </ScrollView>

//       <View className="flex-row justify-center mt-3">
//         {messages.map((_, index) => (
//           <View
//             key={index}
//             className={`h-2 w-2 rounded-full mx-1 ${
//               currentIndex === index ? "bg-blue-600" : "bg-gray-300"
//             }`}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// const HomePage = () => {
//   const [senderNumber, setSenderNumber] = useState("");
//   const [receiverNumber, setReceiverNumber] = useState("");
//   const [amount, setAmount] = useState("");

//   const handleTransfer = () => {
//     if (senderNumber && receiverNumber && amount) {
//       // Process the transfer
//       alert(
//         `Transfer of $${amount} from ${senderNumber} to ${receiverNumber} initiated`
//       );
//       // Reset fields
//       setSenderNumber("");
//       setReceiverNumber("");
//       setAmount("");
//     } else {
//       alert("Please fill in all fields");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//     >
//        {/* <ScrollView > */}
//       <SafeAreaView style={{flex: 1,paddingTop: StatusBar.currentHeight,}} edges={['top']} className="flex-1 bg-gray-50">
//         <View className="bg-blue-50 flex-row justify-between px-1 pt-4 items-center">
//           <Image
//             source={require("../assets/images/logo.png")}
//             style={{ width: 60, height: 60, borderRadius: 30 }}
//           />
//           <Image
//             source={require("../assets/images/user.jpeg")}
//             style={{ width: 50, height: 50, borderRadius: 30 }}
//           />
//         </View>
//         <View className="flex-1 px-3 pt-10">
//           {/* Header */}
//           <Text className="text-3xl font-bold text-blue-600 mb-2">
//             Funds Transfer
//           </Text>
//           <Text className="text-gray-500 mb-6">
//             Quick and secure money transfers
//           </Text>

//           {/* Message Carousel */}
//           <MessageCarousel />

//           {/* Transfer Form */}
//           <ScrollView >
//           <View className="flex-col justify-around p-3 shadow-sm mb-3">
//             {/* Sender Input */}
//             <View className="mb-4">
//               <Text className="text-gray-700 text-sm mb-1">Sender number</Text>
//               <TextInput
//                 className="border border-gray-300 rounded-lg p-5 bg-gray-50"
//                 placeholder="Enter sender's number"
//                 value={senderNumber}
//                 onChangeText={setSenderNumber}
//                 keyboardType="numeric"
//               />
//             </View>

//             {/* Receiver Input
//             <View className="mb-4">
//               <Text className="text-gray-700 text-sm mb-1 mt-4">
//                 Receiver number
//               </Text>
//               <TextInput
//                 className="border border-gray-300 rounded-lg p-5 bg-gray-50"
//                 placeholder="Enter receiver's number"
//                 value={receiverNumber}
//                 onChangeText={setReceiverNumber}
//                 keyboardType="numeric"
//               />
//             </View> */}

//             {/* Amount Input */}
//             <View className="mb-10">
//               <Text className="text-gray-700 text-sm mb-1 mt-4">Amount</Text>
//               <TextInput
//                 className="border border-gray-300 rounded-lg p-5 bg-gray-50"
//                 placeholder="Enter amount"
//                 value={amount}
//                 onChangeText={setAmount}
//                 keyboardType="numeric"
//               />
//             </View>

//             {/* Transfer Button */}
//             <TouchableOpacity
//               className={`py-4 rounded-lg ${
//                 senderNumber && receiverNumber && amount
//                   ? "bg-blue-600"
//                   : "bg-blue-300"
//               }`}
//               onPress={handleTransfer}
//               disabled={!senderNumber || !receiverNumber || !amount}
//             >
//               <Text className="text-white font-semibold text-center">
//                 Next
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView >
//         </View>

//         {/* Bottom Navigation */}
//         <View className="flex-row justify-around items-center py-4 bg-white border-t border-gray-200">
//           <TouchableOpacity className="items-center">
//             <HomeIcon size={24} color="#3b82f6" />
//             <Text className="text-blue-600 text-xs mt-1">Home</Text>
//           </TouchableOpacity>

//           <TouchableOpacity className="items-center">
//             <ClockIcon size={24} color="#6b7280" />
//             <Text className="text-gray-500 text-xs mt-1">History</Text>
//           </TouchableOpacity>

//           <TouchableOpacity className="items-center">
//             <CogIcon size={24} color="#6b7280" />
//             <Text className="text-gray-500 text-xs mt-1">Settings</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// export default HomePage;