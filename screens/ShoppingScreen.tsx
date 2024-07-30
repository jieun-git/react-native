import { Text, TouchableOpacity, View } from 'react-native'
import { RootStackParamList, RouteNames } from '../routes.ts'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<RootStackParamList>

// navigationContainer 로 감싸져있는 컴포넌트는 navigation props 를 전달받지 않아도 갖게 됨.
// onPress 라는 속성으로 특정 스크린으로 이동할 수 있음
const ShoppingScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Shopping</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(RouteNames.BROWSER)
        }}>
        <Text>Go To Browser</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ShoppingScreen
