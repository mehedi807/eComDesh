import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthSore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo/vector-icons

const Signup = () => {
  const navigation = useNavigation();
  const { signup } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

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
        navigation.replace("MainApps");
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  const handleNavigateToLogin = () => {
    navigation.replace("Login");
  };

  return (
    <ImageBackground
      source={require('../../assets/login-bg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Sign up to get started
          </Text>
        </View>

        <View style={styles.tabContainer}>
          <Pressable style={styles.inactiveTab}
            onPress={handleNavigateToLogin}
          >
            <Text style={styles.inactiveTabText}>LOGIN</Text>
          </Pressable>
          <Pressable
            style={styles.activeTab}
          >
            <Text style={styles.activeTabText}>REGISTER</Text>
          </Pressable>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#777" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#777" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
              onSubmitEditing={handleSubmit}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#777"
              />
            </Pressable>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            By signing in, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 24,
    justifyContent: 'flex-start',

  },
  headerContainer: {
    marginBottom: 32,
    marginTop: 95
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#3498db',
    alignItems: 'center',
  },
  inactiveTab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  inactiveTabText: {
    color: '#777',
    fontWeight: '600',
    fontSize: 14,
  },
  formContainer: {
    marginBottom: 24,
    marginTop: 15
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  inputIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 13
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxActive: {
    backgroundColor: '#3498db',
  },
  rememberText: {
    color: '#444',
    fontSize: 14,
  },
  forgotText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    marginTop: 13,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footerContainer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
  },
  link: {
    color: '#3498db',
    fontWeight: '500',
  },
});

export default Signup;



// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
// import React, { useState } from 'react';
// //import { Link, router } from 'expo-router';
// import { useAuthStore } from '../store/useAuthSore';
// import { useNavigation } from '@react-navigation/native';

// const Signup = () => {
//   const navigation = useNavigation();
//   const { signup } = useAuthStore();
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const handleChange = (name, value) => {
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {

//     if (!formData.email.trim()) {
//       Alert.alert("Email is required");
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       Alert.alert("Invalid email format");
//       return false;
//     }
//     if (!formData.password) {
//       Alert.alert("Password is required");
//       return false;
//     }
//     if (formData.password.length < 6) {
//       Alert.alert("Password must be at least 6 characters");
//       return false;
//     }
//     // if (formData.password !== formData.confirmPassword) {
//     //   Alert.alert("Passwords do not match!");
//     //   return false;
//     // }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     const data = {
//       name: formData.name,
//       email: formData.email,
//       password: formData.password
//     };
//     setLoading(true);
//     try {
//       const success = await signup(data);
//       setLoading(false);
//       if (success) {
//         navigation.replace("MainTabs");
//       }
//     } catch (error) {
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>
//       <Text style={styles.subtitle}>Sign up to get started</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         placeholderTextColor="#999"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         value={formData.email}
//         onChangeText={(text) => handleChange('email', text)}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="#999"
//         secureTextEntry
//         value={formData.password}
//         onChangeText={(text) => handleChange('password', text)}
//       />

//       <TouchableOpacity
//         style={[styles.button, loading && styles.disabledButton]}
//         onPress={handleSubmit}
//         disabled={loading}
//         activeOpacity={0.8}
//       >
//         <Text style={styles.buttonText}>
//           {loading ? 'Signing up...' : 'Sign Up'}
//         </Text>
//       </TouchableOpacity>

//       <View style={styles.linkContainer}>
//         <Text style={styles.text}>Already have an account? </Text>

//         <Pressable onPress={() => navigation.popToTop()}>
//           <Text style={styles.link}>Log In</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 30,
//     backgroundColor: '#f9f9f9',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     alignSelf: 'center',
//     marginBottom: 30,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     backgroundColor: '#fff',
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: '#28a745',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   linkContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   text: {
//     color: '#444',
//   },
//   link: {
//     color: '#28a745',
//     fontWeight: '500',
//   },
// });

// export default Signup;