import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuthStore } from '../store/useAuthSore'

const Setting = () => {
  const { logout } = useAuthStore();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logOutBtn}
        onPress={() => { logout() }}
      >
        <Text style={{ color: '#fff' }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logOutBtn: {
    backgroundColor: 'rgb(22, 26, 44)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  }
});