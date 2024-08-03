import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native'
import WebView from 'react-native-webview'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, RouteNames } from '../routes.ts'
import { useCallback, useContext, useRef, useState } from 'react'
import { WebViewContext } from '../components/WebViewProvider.tsx'

type Props = NativeStackScreenProps<RootStackParamList>

const styles = StyleSheet.create({
    safearea: { flex: 1 },
    contentContainerStyle: {
        flex: 1,
    },
})

const SHOPPING_HOME_URL = 'https://shopping.naver.com/home'

// request 가 홈 화면이랑 관련 된 것이면 true를 리턴, 그 외에는 다른 스크린으로 보여줌
const ShoppingScreen = ({ navigation }: Props) => {
    const context = useContext(WebViewContext)

    const webViewRef = useRef<WebView | null>(null)

    const [refreshing, setRefreshing] = useState<boolean>(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        webViewRef.current?.reload()
    }, [])

    return (
        <SafeAreaView style={styles.safearea}>
            {/* scrollView 는 wrapper 고 그 안에 스타일을 적용해야 웹뷰에 적용되기 때문에, contentContainerStyle 속성으로 스타일링*/}
            <ScrollView
                contentContainerStyle={styles.contentContainerStyle}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <WebView
                    ref={(ref) => {
                        webViewRef.current = ref
                        if (ref != null) {
                            context?.addWebView(ref)
                        }
                    }}
                    source={{ uri: SHOPPING_HOME_URL }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onShouldStartLoadWithRequest={(request) => {
                        if (
                            request.url.startsWith(SHOPPING_HOME_URL) ||
                            request.mainDocumentURL?.startsWith(
                                SHOPPING_HOME_URL,
                            )
                        ) {
                            // url 이 m.naver.com 으로 시작하면 홈스크린에서 보여준다.
                            return true
                        }

                        if (
                            request.url != null &&
                            request.url.startsWith('https://')
                        ) {
                            // url 이 m.naver.com 으로 시작하지 않으면 브라우저 스크린으로 라우팅시키면서 요청받은 url로 보내겠다.
                            navigation.navigate(RouteNames.BROWSER, {
                                initialUrl: request.url,
                            })
                            return false
                        }
                        return true
                    }}
                    // 웹뷰 로딩이 끝났을 때
                    onLoad={() => setRefreshing(false)}
                    renderLoading={() => <></>}
                    startInLoadingState={true}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ShoppingScreen
