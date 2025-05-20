const React = require('react');
const { useState, useEffect } = React;
const { View, Text, TextInput, Switch, TouchableOpacity, Alert, Picker } = require('react-native');
const { useTailwind } = require('tailwind-rn');
require('tailwind-rn/dist/tailwind.css');

const SettingsScreen = () => {
  const tailwind = useTailwind();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Apply dark mode styles (can be extended with Appearance API or context)
    // For simplicity, we toggle styles directly
  }, [darkMode]);

  const handleFeedbackSubmit = () => {
    Alert.alert('Success', 'Feedback submitted!');
    setFeedback('');
    // Implement feedback submission logic here
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account deletion initiated.');
            // Implement account deletion logic here
          },
        },
      ]
    );
  };

  const handleUpdateUserInfo = () => {
    Alert.alert('Success', 'User information updated!');
    // Implement user info update logic here
  };

  return (
    <View style={tailwind(`flex-1 p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`)}>
      <View style={tailwind('bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6')}>
        <Text style={tailwind('text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100')}>
          Settings
        </Text>

        {/* Dark Mode */}
        <View style={tailwind('mb-6')}>
          <Text style={tailwind('text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100')}>
            Appearance
          </Text>
          <View style={tailwind('flex-row justify-between items-center')}>
            <Text style={tailwind('text-gray-900 dark:text-gray-100')}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={() => setDarkMode(!darkMode)}
              trackColor={{ false: '#d1d5db', true: '#2563eb' }}
              thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* User Information */}
        <View style={tailwind('mb-6')}>
          <Text style={tailwind('text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100')}>
            User Information
          </Text>
          <TextInput
            style={tailwind('p-2 border rounded-md mb-4 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100')}
            placeholder="Your Name"
            placeholderTextColor={darkMode ? '#9ca3af' : '#6b7280'}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={tailwind('p-2 border rounded-md mb-4 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100')}
            placeholder="your.email@example.com"
            placeholderTextColor={darkMode ? '#9ca3af' : '#6b7280'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity
            style={tailwind('px-4 py-2 bg-blue-600 rounded-md')}
            onPress={handleUpdateUserInfo}
          >
            <Text style={tailwind('text-white text-center font-medium')}>
              Update Information
            </Text>
          </TouchableOpacity>
        </View>

        {/* Feedback */}
        <View style={tailwind('mb-6')}>
          <Text style={tailwind('text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100')}>
            Feedback
          </Text>
          <TextInput
            style={tailwind('p-2 border rounded-md h-24 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100')}
            placeholder="Share your feedback or suggestions..."
            placeholderTextColor={darkMode ? '#9ca3af' : '#6b7280'}
            value={feedback}
            onChangeText={setFeedback}
            multiline
          />
          <TouchableOpacity
            style={tailwind('mt-2 px-4 py-2 bg-green-600 rounded-md')}
            onPress={handleFeedbackSubmit}
          >
            <Text style={tailwind('text-white text-center font-medium')}>
              Submit Feedback
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View style={tailwind('mb-6')}>
          <Text style={tailwind('text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100')}>
            Notifications
          </Text>
          <View style={tailwind('flex-row justify-between items-center')}>
            <Text style={tailwind('text-gray-900 dark:text-gray-100')}>
              Enable Notifications
            </Text>
            <Switch
              value={notifications}
              onValueChange={() => setNotifications(!notifications)}
              trackColor={{ false: '#d1d5db', true: '#2563eb' }}
              thumbColor={notifications ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Language */}
        <View style={tailwind('mb-6')}>
          <Text style={tailwind('text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100')}>
            Language
          </Text>
          <Picker
            selectedValue={language}
            onValueChange={(value) => setLanguage(value)}
            style={tailwind('p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100')}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="French" value="fr" />
            <Picker.Item label="German" value="de" />
          </Picker>
        </View>

        {/* Delete Account */}
        <View style={tailwind('mb-6')}>
          <Text style={tailwind('text-lg font-semibold mb-2 text-red-600 dark:text-red-400')}>
            Danger Zone
          </Text>
          <Text style={tailwind('text-sm text-gray-600 dark:text-gray-400 mb-2')}>
            Permanently delete your account and all associated data.
          </Text>
          <TouchableOpacity
            style={tailwind('px-4 py-2 bg-red-600 rounded-md')}
            onPress={handleDeleteAccount}
          >
            <Text style={tailwind('text-white text-center font-medium')}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

module.exports = SettingsScreen;