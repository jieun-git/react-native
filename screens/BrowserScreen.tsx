import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    Share,
} from 'react-native'
import WebView from 'react-native-webview'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../routes.ts'
import { useContext, useMemo, useRef, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { WebViewContext } from '../components/WebViewProvider.tsx'

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
    loadingBarBackground: {
        height: 3,
        backgroundColor: 'white',
    },
    loadingBar: {
        height: '100%',
        backgroundColor: 'green',
    },
    navigator: {
        backgroundColor: 'black',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 40,
        justifyContent: 'space-between',
    },
    button: {
        width: 30,
        height: 30,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    naverIconOutline: {
        borderWidth: 1,
        borderColor: 'white',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    naverIconText: {
        color: 'white',
    },
})

const NavButton = ({
    iconName,
    disabled,
    onPress,
}: {
    iconName: string
    disabled?: boolean
    onPress?: () => void
}) => {
    const color = disabled ? 'gray' : 'white'
    return (
        <TouchableOpacity
            style={style.button}
            disabled={disabled}
            onPress={onPress}
        >
            <MaterialCommunityIcons name={iconName} size={24} color={color} />
        </TouchableOpacity>
    )
}

const DISABLE_PINCH_ZOOM = `(function() {
    const meta = document.createElement('meta')
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no')
    meta.setAttribute('name', 'viewport')
    document.getElementsByTagName('head')[0].appendChild(meta)
})()`

const BrowserScreen = ({ route, navigation }: Props) => {
    const context = useContext(WebViewContext)

    const { initialUrl } = route.params

    const [url, setUrl] = useState<string>(initialUrl)
    const [canGoBack, setCanGoBack] = useState<boolean>(false)
    const [canGoForward, setCanGoForward] = useState<boolean>(false)

    // url 이 바뀔 때만 연산하도록 하여 렌더링 최적화
    const urlTitle = useMemo(
        () => url.replace('https://', '').split('/')[0],
        [url],
    )

    const progressAnim = useRef(new Animated.Value(0)).current
    // webView 에 ref 를 매겨 뒤/앞으로 갈 수 있는 상태인지 체크하기 위한 참값조 값
    const webViewRef = useRef<WebView | null>(null)

    return (
        <SafeAreaView style={style.safearea}>
            <View style={style.urlContainer}>
                <Text style={style.urlText}>{urlTitle}</Text>
            </View>
            <View style={style.loadingBarBackground}>
                <Animated.View
                    style={[
                        style.loadingBar,
                        {
                            width: progressAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%'],
                            }),
                        },
                    ]}
                />
            </View>
            <WebView
                ref={(ref) => {
                    webViewRef.current = ref
                    if (ref != null) {
                        context?.addWebView(ref)
                    }
                }}
                source={{ uri: initialUrl }}
                onNavigationStateChange={(event) => {
                    setCanGoBack(event.canGoBack)
                    setCanGoForward(event.canGoForward)
                    setUrl(event.url)
                }}
                onLoadProgress={(event) => {
                    progressAnim.setValue(event.nativeEvent.progress)
                }}
                onLoadEnd={() => {
                    progressAnim.setValue(0)
                }}
                injectedJavaScript={DISABLE_PINCH_ZOOM}
                onMessage={() => {}}
                allowsLinkPreview={false}
            />
            <View style={style.navigator}>
                <TouchableOpacity
                    style={style.button}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <View style={style.naverIconOutline}>
                        <Text style={style.naverIconText}>N</Text>
                    </View>
                </TouchableOpacity>
                <NavButton
                    disabled={!canGoBack}
                    iconName="arrow-left"
                    onPress={() => webViewRef.current?.goBack()}
                />
                <NavButton
                    disabled={!canGoForward}
                    iconName="arrow-right"
                    onPress={() => webViewRef.current?.goForward()}
                />
                <NavButton
                    iconName="refresh"
                    onPress={() => webViewRef.current?.reload()}
                />
                <NavButton
                    iconName="share-outline"
                    onPress={() => Share.share({ message: url })}
                />
            </View>
        </SafeAreaView>
    )
}

export default BrowserScreen
