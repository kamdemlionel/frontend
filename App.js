import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
//import HomePage from './screens/HomeScreen.js';
import HomeScreen2 from './screens/Homescreen2.js';
import SettingsScreen from './screens/settings.js';

// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './screens/HomeScreen';
// import GameStore from './screens/gameStore';

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  // const { user } = useAuth();
  //   if(user)
  //   {
  //     return (
  //       <NavigationContainer>
  //         <Stack.Navigator initialRouteName='Home'>
  //           <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
  //         </Stack.Navigator>
  //       </NavigationContainer>
  //     )
  //   }else
    {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
            <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
            <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
            <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
            <Stack.Screen name="Home2" options={{headerShown: false}} component={HomeScreen2} />
            <Stack.Screen name="Settings" options={{headerShown: false}} component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
  }