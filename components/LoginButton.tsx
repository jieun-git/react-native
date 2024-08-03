import React from 'react'
import { TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const LoginButton = () => {
    const isLoggedIn = false
    const iconName = isLoggedIn ? 'logout' : 'login'

    return (
        <TouchableOpacity>
            <MaterialCommunityIcons name={iconName} size={24} color="white" />
        </TouchableOpacity>
    )
}

export default LoginButton
