import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Sidebar = () => {
    return (
        <View style={styles.container}>
            <Text>Sidebar</Text>
        </View>
    )
}

export default Sidebar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //width: '30%',
        backgroundColor: 'rgb(213, 215, 219)'
    }
})