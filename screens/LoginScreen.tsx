import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../routes.ts'
import { useNavigation } from '@react-navigation/native'

type Props = NativeStackNavigationProp<RootStackParamList>

const styles = StyleSheet.create({
    safearea: { flex: 1, backgroundColor: 'black' },
})

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login'

const LoginScreen = () => {
    const navigation = useNavigation<Props>()

    return (
        <SafeAreaView style={styles.safearea}>
            <WebView
                source={{ uri: LOGIN_URL }}
                onNavigationStateChange={(event) => {
                    if (event.url === 'https://www.naver.com/') {
                        navigation.goBack()
                    }
                }}
            />
        </SafeAreaView>
    )
}

export default LoginScreen
