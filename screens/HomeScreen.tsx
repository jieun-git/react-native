import { SafeAreaView, StyleSheet, Text } from 'react-native'
import WebView from 'react-native-webview'

const styles = StyleSheet.create({
    safearea: { flex: 1 },
})

const HomeScreen = () => {
    return (
        // SafeAreaView: 노치 디자인을 고려하여 안전 영역 경계 안에서 컨텐츠를 렌더링하는 것. IOS11 이후 아이폰에 적용하면 노치에 웹뷰 표시 안 됨
        <SafeAreaView style={styles.safearea}>
            <WebView
                source={{ uri: 'https://m.naver.com/' }}
                showsVerticalScrollIndicator={false}
                showHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default HomeScreen
