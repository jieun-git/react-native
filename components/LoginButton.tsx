import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList, RouteNames } from '../routes.ts'
import CookieManager from '@react-native-cookies/cookies'

type Props = NativeStackNavigationProp<RootStackParamList>

const LoginButton = () => {
    const navigation = useNavigation<Props>()

    // Home/Shopping 스크린인 경우 true/false, LoginButton 이 Home/Shopping 에만 존재
    const isFocused = useIsFocused()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const iconName = isLoggedIn ? 'logout' : 'login'

    const onPressLogin = useCallback(async () => {
        navigation.navigate(RouteNames.LOGIN)
    }, [navigation])
    const onPressLogout = useCallback(async () => {}, [])

    useEffect(() => {
        if (isFocused) {
            CookieManager.get('https://www.naver.com', true).then((cookie) => {
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
