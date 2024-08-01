import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
} from 'react-native'
import WebView from 'react-native-webview'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../routes.ts'
import { useMemo, useRef, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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

const BrowserScreen = ({ route, navigation }: Props) => {
    const { initialUrl } = route.params

    const [url, setUrl] = useState<string>(initialUrl)
    // url 이 바뀔 때만 연산하도록 하여 렌더링 최적화
    const urlTitle = useMemo(
        () => url.replace('https://', '').split('/')[0],
        [url],
    )

    const progressAnim = useRef(new Animated.Value(0)).current

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
                source={{ uri: initialUrl }}
                onNavigationStateChange={(event) => {
                    setUrl(event.url)
                }}
                onLoadProgress={(event) => {
                    progressAnim.setValue(event.nativeEvent.progress)
                }}
                onLoadEnd={() => {
                    progressAnim.setValue(0)
                }}
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
                <NavButton iconName="arrow-left" />
                <NavButton iconName="arrow-right" />
                <NavButton iconName="refresh" />
            </View>
        </SafeAreaView>
    )
}

export default BrowserScreen
