import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import ShoppingScreen from './screens/ShoppingScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RouteNames, RootStackParamList } from './routes.ts'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BrowserScreen from './screens/BrowserScreen.tsx'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator<RootStackParamList>()

const HomeIcon = ({ focused, color }: { focused: boolean; color: string }) => {
    return <MaterialCommunityIcons name="home" color={color} size={26} />
}

const HomeTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: 'black' },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
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
                options={{ tabBarLabel: '쇼핑' }}
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
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={RouteNames.BROWSER}
                    component={BrowserScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
