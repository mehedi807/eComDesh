import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
//import { Link, router } from 'expo-router';
import { useAuthStore } from '../store/useAuthSore';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  const { signup } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {

    if (!formData.email.trim()) {
      Alert.alert("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Alert.alert("Invalid email format");
      return false;
    }
    if (!formData.password) {
      Alert.alert("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert("Password must be at least 6 characters");
      return false;
    }
    // if (formData.password !== formData.confirmPassword) {
    //   Alert.alert("Passwords do not match!");
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };
    setLoading(true);
    try {
      const success = await signup(data);
      setLoading(false);
      if (success) {
        navigation.replace("MainTabs");
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.text}>Already have an account? </Text>

        <Pressable onPress={() => navigation.popToTop()}>
          <Text style={styles.link}>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: '#444',
  },
  link: {
    color: '#28a745',
    fontWeight: '500',
  },
});

export default Signup;