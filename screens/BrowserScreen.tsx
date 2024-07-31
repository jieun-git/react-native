import { SafeAreaView, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../routes.ts'

type Props = NativeStackScreenProps<RootStackParamList, 'browser'>

const style = StyleSheet.create({
    safearea: { flex: 1 },
})

const ShoppingScreen = ({ route }: Props) => {
    const { initialUrl } = route.params
    return (
        <SafeAreaView style={style.safearea}>
            <WebView source={{ uri: initialUrl }} />
        </SafeAreaView>
    )
}

export default ShoppingScreen
