import React, { useContext, useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../routes.ts'
import { useNavigation } from '@react-navigation/native'
import { WebViewContext } from '../components/WebViewProvider.tsx'

type Props = NativeStackNavigationProp<RootStackParamList>

const styles = StyleSheet.create({
    safearea: { flex: 1, backgroundColor: 'black' },
})

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login'

const LoginScreen = () => {
    const context = useContext(WebViewContext)

    const navigation = useNavigation<Props>()

    return (
        <SafeAreaView style={styles.safearea}>
            <WebView
                source={{ uri: LOGIN_URL }}
                onNavigationStateChange={(event) => {
                    if (event.url === 'https://www.naver.com/') {
                        // goBack() 하기 전에 웹뷰들을 reload 해서 로그인 시 메일, 알림 등이 바로 적용되도록 함
                        if (context?.webViewRefs.current != null) {
                            context?.webViewRefs.current.forEach((webView) => {
                                webView.reload()
                            })
                            navigation.goBack()
                        }
                    }
                }}
            />
        </SafeAreaView>
    )
}

export default LoginScreen
