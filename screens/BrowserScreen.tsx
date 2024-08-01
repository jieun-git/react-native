import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../routes.ts'
import { useMemo, useState } from 'react'

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

    const [url, setUrl] = useState<string>(initialUrl)
    // url 이 바뀔 때만 연산하도록 하여 렌더링 최적화
    const urlTitle = useMemo(
        () => url.replace('https://', '').split('/')[0],
        [url],
    )

    return (
        <SafeAreaView style={style.safearea}>
            <View style={style.urlContainer}>
                <Text style={style.urlText}>{urlTitle}</Text>
            </View>
            <WebView
                source={{ uri: initialUrl }}
                onNavigationStateChange={(event) => {
                    setUrl(event.url)
                }}
            />
        </SafeAreaView>
    )
}

export default ShoppingScreen
