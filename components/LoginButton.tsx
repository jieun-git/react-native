import React, { useCallback, useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList, RouteNames } from '../routes.ts'
import CookieManager from '@react-native-cookies/cookies'
import { WebViewContext } from './WebViewProvider.tsx'

type Props = NativeStackNavigationProp<RootStackParamList>

const LoginButton = () => {
    const context = useContext(WebViewContext)

    const navigation = useNavigation<Props>()

    // Home/Shopping 스크린인 경우 true/false, LoginButton 이 Home/Shopping 에만 존재
    const isFocused = useIsFocused()

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const iconName = isLoggedIn ? 'logout' : 'login'

    const onPressLogin = useCallback(() => {
        navigation.navigate(RouteNames.LOGIN)
    }, [navigation])

    const onPressLogout = useCallback(async () => {
        await CookieManager.clearAll(true) // 쿠키 제거

        setIsLoggedIn(false)
        // 웹뷰 리로딩
        if (context?.webViewRefs.current != null) {
            context?.webViewRefs.current.forEach((webView) => {
                webView.reload()
            })
        }
    }, [context])

    useEffect(() => {
        if (isFocused) {
            CookieManager.get('https://.naver.com', true).then((cookie) => {
                if (cookie.NID_SES) {
                    setIsLoggedIn(true)
                } else {
                    setIsLoggedIn(false)
                }
            })
        }
    }, [isFocused])

    return (
        <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
            <MaterialCommunityIcons name={iconName} size={24} color="white" />
        </TouchableOpacity>
    )
}

export default LoginButton
