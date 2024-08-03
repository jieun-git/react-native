import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import ShoppingScreen from './screens/ShoppingScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RouteNames, RootStackParamList } from './routes.ts'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BrowserScreen from './screens/BrowserScreen.tsx'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LoginButton from './components/LoginButton.tsx'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator<RootStackParamList>()

const HomeIcon = ({ focused, color }: { focused: boolean; color: string }) => {
    const iconName = focused ? 'home' : 'home-outline'

    return <MaterialCommunityIcons name={iconName} color={color} size={26} />
}

const ShoppingIcon = ({
    focused,
    color,
}: {
    focused: boolean
    color: string
}) => {
    const iconName = focused ? 'shopping' : 'shopping-outline'

    return <MaterialCommunityIcons name={iconName} color={color} size={26} />
}

const HomeTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: 'black' },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                headerShown: false,
            }}
        >
            <Tab.Screen
                name={RouteNames.HOME}
                component={HomeScreen}
                options={{ tabBarLabel: '홈', tabBarIcon: HomeIcon }}
            />
            <Tab.Screen
                name={RouteNames.SHOPPING}
                component={ShoppingScreen}
                options={{ tabBarLabel: '쇼핑', tabBarIcon: ShoppingIcon }}
            />
        </Tab.Navigator>
    )
}

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={RouteNames.HOME_TAB}
                    component={HomeTab}
                    options={{
                        title: '',
                        headerStyle: { backgroundColor: 'black' },
                        headerRight: LoginButton,
                    }}
                />
                <Stack.Screen
                    name={RouteNames.BROWSER}
                    component={BrowserScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
