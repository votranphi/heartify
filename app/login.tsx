import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '@/styles/login';

// Define navigation prop type
interface LoginScreenProps {
  navigation?: {
    navigate: (screen: string) => void;
  };
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const router = useRouter();

  // Check for existing authentication on component mount
  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async (): Promise<void> => {
    try {
      setIsCheckingAuth(true);
      
      // Get stored authentication data
      const authData = await AsyncStorage.multiGet([
        'access_token',
        'token_type',
        'user_data'
      ]);
      
      const accessToken = authData[0][1];
      const tokenType = authData[1][1];
      const userData = authData[2][1];
      
      // Check if all required auth data exists
      if (accessToken && tokenType && userData) {
        try {
          // Optional: Verify token is still valid by making a test API call
          const response = await fetch('http://192.168.1.20:5000/auth/verify-token', {
            method: 'GET',
            headers: {
              'Authorization': `${tokenType} ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            // Token is valid, redirect to main app
            router.replace('/(tabs)');
            return;
          } else {
            // Token is invalid, clear stored data
            await AsyncStorage.multiRemove(['access_token', 'token_type', 'user_data']);
          }
        } catch (verifyError) {
          router.replace('/(tabs)');
          return;
        }
      }
    } catch (error) {
      console.error('Error checking existing auth:', error);
      // If there's an error, just proceed to show login form
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Navigation functions (placeholders)
  const handleForgotPassword = (): void => {
    // Navigate to forgot password screen
    router.push("/forgot-password");
  };

  const handleSignUp = (): void => {
    // Navigate to sign up screen
    router.push("/signup");
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (): Promise<void> => {
    // Basic validation
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare request payload
      const payload = {
        username: username.trim(),
        password: password
      };

      // Make API call to login endpoint
      const response = await fetch('http://192.168.1.20:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        const { access_token, token_type, user } = data;
        
        try {
          // Store authentication data
          await AsyncStorage.multiSet([
            ['access_token', access_token],
            ['token_type', token_type],
            ['user_data', JSON.stringify(user)]
          ]);

          Alert.alert(
            'Success', 
            `Welcome back, ${user.username}!`,
            [
              {
                text: 'OK',
                onPress: () => {
                  // Navigate to main app or dashboard
                  router.replace('/(tabs)');
                }
              }
            ]
          );
        } catch (storageError) {
          console.error('Error storing authentication data:', storageError);
          Alert.alert('Warning', 'Login successful but failed to store session data');
        }
      } else {
        // Login failed
        const errorMessage = data.error || 'Login failed. Please try again.';
        Alert.alert('Error', errorMessage);
        
        // Clear password field on error
        setPassword('');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading screen while checking authentication
  if (isCheckingAuth) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.contentContainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.appName}>Heartify</Text>
          <Text style={[styles.appDescription, { marginTop: 20 }]}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
            <Text style={styles.appName}>Heartify</Text>
            <Text style={styles.appDescription}>A Mobile Application for Cardiovascular Disease Prediction</Text>
            <Text style={styles.slogan}>"Your Heart, Your Future"</Text>
            
            <View style={styles.formContainer}>
              <Text style={styles.title}>Login</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={togglePasswordVisibility}
                    disabled={isLoading}
                  >
                    <Text style={styles.eyeIcon}>
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <TouchableOpacity 
                onPress={handleForgotPassword}
                disabled={isLoading}
              >
                <Text style={[styles.forgotPassword, isLoading && { opacity: 0.6 }]}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, isLoading && { opacity: 0.6 }]} 
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Text>
              </TouchableOpacity>
              
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
                  <Text style={[styles.signupLink, isLoading && { opacity: 0.6 }]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;