import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Dashboard = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.msg}>Welcome To eComDesh</Text>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  msg: {
    backgroundColor: 'rgba(79, 151, 101, 0.94)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    color: 'rgba(255, 255, 255, 0.94)',
    fontWeight: 'bold'
  }
})

// import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
// import React, { useState } from 'react';
// import { useAuthStore } from '../store/useAuthSore';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// const Login = () => {
//   const navigation = useNavigation();
//   const { login } = useAuthStore();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberPassword, setRememberPassword] = useState(false);

//   const handleNavigateToSignup = () => {
//     navigation.replace('Signup');
//   };

//   const handleChange = (name, value) => {
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     if (!formData.email.trim()) {
//       Alert.alert("Error", "Email is required");
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       Alert.alert("Error", "Please enter a valid email address");
//       return false;
//     }
//     if (!formData.password) {
//       Alert.alert("Error", "Password is required");
//       return false;
//     }
//     if (formData.password.length < 6) {
//       Alert.alert("Error", "Password must be at least 6 characters");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     const data = {
//       email: formData.email,
//       password: formData.password
//     };
//     setLoading(true);
//     try {
//       const success = await login(data);
//       if (success) {
//         navigation.replace("MainTabs");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPassword = () => {
//     Alert.alert("Reset Password", "A password reset link will be sent to your email");
//     // Implement password reset functionality
//   };

//   return (
//     <ImageBackground
//       source={require('../../assets/login-bg.png')}
//       style={styles.container}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.title}>Welcome Back</Text>
//           <Text style={styles.subtitle}>
//             Sign in to access your account
//           </Text>
//         </View>

//         <View style={styles.tabContainer}>
//           <Pressable style={styles.activeTab}>
//             <Text style={styles.activeTabText}>LOGIN</Text>
//           </Pressable>
//           <Pressable
//             style={styles.inactiveTab}
//             onPress={handleNavigateToSignup}
//           >
//             <Text style={styles.inactiveTabText}>REGISTER</Text>
//           </Pressable>
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <Ionicons name="mail-outline" size={20} color="#777" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               placeholderTextColor="#999"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               autoCorrect={false}
//               value={formData.email}
//               onChangeText={(text) => handleChange('email', text)}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="lock-closed-outline" size={20} color="#777" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor="#999"
//               secureTextEntry={!showPassword}
//               autoCapitalize="none"
//               autoCorrect={false}
//               value={formData.password}
//               onChangeText={(text) => handleChange('password', text)}
//               onSubmitEditing={handleSubmit}
//             />
//             <Pressable
//               onPress={() => setShowPassword(!showPassword)}
//               style={styles.eyeIcon}
//             >
//               <Ionicons
//                 name={showPassword ? "eye-off-outline" : "eye-outline"}
//                 size={20}
//                 color="#777"
//               />
//             </Pressable>
//           </View>

//           <View style={styles.optionsRow}>
//             <Pressable
//               style={styles.rememberContainer}
//               onPress={() => setRememberPassword(!rememberPassword)}
//             >
//               <View style={[styles.checkbox, rememberPassword && styles.checkboxActive]}>
//                 {rememberPassword && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
//               </View>
//               <Text style={styles.rememberText}>Remember me</Text>
//             </Pressable>

//             <Pressable onPress={handleForgotPassword}>
//               <Text style={styles.forgotText}>Forgot password?</Text>
//             </Pressable>
//           </View>

//           <TouchableOpacity
//             style={[styles.loginButton, loading && styles.disabledButton]}
//             onPress={handleSubmit}
//             disabled={loading}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.loginButtonText}>
//               {loading ? 'Signing In...' : 'Sign In'}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.footerContainer}>
//           <Text style={styles.footerText}>
//             By signing in, you agree to our{' '}
//             <Text style={styles.link}>Terms of Service</Text> and{' '}
//             <Text style={styles.link}>Privacy Policy</Text>
//           </Text>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     paddingHorizontal: 24,
//     justifyContent: 'flex-start',

//   },
//   headerContainer: {
//     marginBottom: 32,
//     marginTop: 95
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#555',
//     textAlign: 'center',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     marginBottom: 24,
//     marginTop: 20,
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#f0f0f0',
//   },
//   activeTab: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: '#3498db',
//     alignItems: 'center',
//   },
//   inactiveTab: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//   },
//   activeTabText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   inactiveTabText: {
//     color: '#777',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   formContainer: {
//     marginBottom: 24,
//     marginTop: 15
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginBottom: 22,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 1,
//   },
//   inputIcon: {
//     marginLeft: 16,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     paddingHorizontal: 12,
//     fontSize: 16,
//     color: '#333',
//   },
//   eyeIcon: {
//     padding: 12,
//   },
//   optionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 24,
//     marginTop: 13
//   },
//   rememberContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: '#3498db',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   checkboxActive: {
//     backgroundColor: '#3498db',
//   },
//   rememberText: {
//     color: '#444',
//     fontSize: 14,
//   },
//   forgotText: {
//     color: '#3498db',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   loginButton: {
//     backgroundColor: '#3498db',
//     paddingVertical: 16,
//     marginTop: 13,
//     borderRadius: 10,
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   footerContainer: {
//     alignItems: 'center',
//   },
//   footerText: {
//     color: '#555',
//     fontSize: 12,
//     textAlign: 'center',
//   },
//   link: {
//     color: '#3498db',
//     fontWeight: '500',
//   },
// });

// export default Login;

// // import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native';
// // import React, { useState } from 'react';
// // //import { Link, useRouter } from 'expo-router';
// // import { useAuthStore } from '../store/useAuthSore';
// // import { useNavigation } from '@react-navigation/native';

// // const Login = () => {
// //   const natigator = useNavigation();

// //   const handlePress = () => {
// //     natigator.navigate('Signup')
// //     console.log('Now on signup');
// //   }
// //   const { login } = useAuthStore();
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //   });
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (name, value) => {
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const validateForm = () => {
// //     if (!formData.email.trim()) {
// //       Alert.alert("Error", "Email is required");
// //       return false;
// //     }
// //     if (!/\S+@\S+\.\S+/.test(formData.email)) {
// //       Alert.alert("Error", "Please enter a valid email address");
// //       return false;
// //     }
// //     if (!formData.password) {
// //       Alert.alert("Error", "Password is required");
// //       return false;
// //     }
// //     if (formData.password.length < 6) {
// //       Alert.alert("Error", "Password must be at least 6 characters");
// //       return false;
// //     }
// //     return true;
// //   };

// //   const handleSubmit = async () => {
// //     if (!validateForm()) return;
// //     const data = {
// //       email: formData.email,
// //       password: formData.password
// //     };
// //     setLoading(true);
// //     try {
// //       const success = await login(data);
// //       if (success) {
// //         natigator.replace("MainTabs");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Welcome Back</Text>
// //       <Text style={styles.subtitle}>Login to your account</Text>

// //       <TextInput
// //         style={styles.input}
// //         placeholder="Email"
// //         placeholderTextColor="#999"
// //         keyboardType="email-address"
// //         autoCapitalize="none"
// //         autoCorrect={false}
// //         value={formData.email}
// //         onChangeText={(text) => handleChange('email', text)}
// //       />

// //       <TextInput
// //         style={styles.input}
// //         placeholder="Password"
// //         placeholderTextColor="#999"
// //         secureTextEntry={true}
// //         autoCapitalize="none"
// //         autoCorrect={false}
// //         value={formData.password}
// //         onChangeText={(text) => handleChange('password', text)}
// //         onSubmitEditing={handleSubmit}
// //       />

// //       <TouchableOpacity
// //         style={[styles.button, loading && styles.disabledButton]}
// //         onPress={handleSubmit}
// //         disabled={loading}
// //         activeOpacity={0.8}
// //       >
// //         <Text style={styles.buttonText}>
// //           {loading ? 'Logging in...' : 'Login'}
// //         </Text>
// //       </TouchableOpacity>

// //       <View style={styles.linkContainer}>
// //         <Text style={styles.text}>Don't have an account? </Text>

// //         <Pressable onPress={handlePress}>

// //           <Text style={styles.link}> Go to Sign Up</Text>

// //         </Pressable>

// //       </View>
// //     </View >
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     paddingHorizontal: 30,
// //     backgroundColor: '#f9f9f9',
// //   },
// //   title: {
// //     fontSize: 32,
// //     fontWeight: 'bold',
// //     alignSelf: 'center',
// //     marginBottom: 8,
// //     color: '#333',
// //   },
// //   subtitle: {
// //     fontSize: 16,
// //     color: '#666',
// //     alignSelf: 'center',
// //     marginBottom: 30,
// //   },
// //   input: {
// //     height: 50,
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     borderRadius: 10,
// //     paddingHorizontal: 15,
// //     fontSize: 16,
// //     backgroundColor: '#fff',
// //     marginBottom: 15,
// //   },
// //   button: {
// //     backgroundColor: '#007bff',
// //     paddingVertical: 15,
// //     borderRadius: 10,
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   disabledButton: {
// //     opacity: 0.6,
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontWeight: '600',
// //     fontSize: 16,
// //   },
// //   linkContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     marginTop: 20,
// //   },
// //   text: {
// //     color: '#444',
// //     fontSize: 14,
// //   },
// //   link: {
// //     color: '#007bff',
// //     fontWeight: '500',
// //     fontSize: 14,
// //   },
// // });

// // export default Login;