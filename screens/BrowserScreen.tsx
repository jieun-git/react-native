import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../routes.ts'

type Props = NativeStackScreenProps<RootStackParamList, 'browser'>

const style = StyleSheet.create({
    safearea: { flex: 1, backgroundColor: 'black' },
    urlContainer: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    urlText: { color: 'white' },
})

const ShoppingScreen = ({ route }: Props) => {
    const { initialUrl } = route.params
    return (
        <SafeAreaView style={style.safearea}>
            <View style={style.urlContainer}>
                <Text style={style.urlText}>URL</Text>
            </View>
            <WebView source={{ uri: initialUrl }} />
        </SafeAreaView>
    )
}

export default ShoppingScreen
