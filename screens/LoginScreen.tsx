import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'

const styles = StyleSheet.create({
    safearea: { flex: 1, backgroundColor: 'black' },
})

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login'

const LoginScreen = () => {
    return (
        <SafeAreaView style={styles.safearea}>
            <WebView source={{ uri: LOGIN_URL }} />
        </SafeAreaView>
    )
}

export default LoginScreen
