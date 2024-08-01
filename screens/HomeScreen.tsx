import { SafeAreaView, StyleSheet, Text } from 'react-native'
import WebView from 'react-native-webview'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, RouteNames } from '../routes.ts'

type Props = NativeStackScreenProps<RootStackParamList>

const styles = StyleSheet.create({
    safearea: { flex: 1 },
})
// request 가 홈 화면이랑 관련 된 것이면 true를 리턴, 그 외에는 다른 스크린으로 보여줌
const HomeScreen = ({ navigation }: Props) => {
    return (
        // SafeAreaView: 노치 디자인을 고려하여 안전 영역 경계 안에서 컨텐츠를 렌더링하는 것. IOS11 이후 아이폰에 적용하면 노치에 웹뷰 표시 안 됨
        <SafeAreaView style={styles.safearea}>
            <WebView
                source={{ uri: 'https://m.naver.com/' }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onShouldStartLoadWithRequest={(request) => {
                    if (
                        request.url.startsWith('https://m.naver.com') ||
                        request.mainDocumentURL?.startsWith(
                            'https://m.naver.com',
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
            />
        </SafeAreaView>
    )
}

export default HomeScreen
