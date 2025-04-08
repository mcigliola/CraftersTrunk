import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './rootStackParamList';
import HomeScreen from '../screens/HomeScreen';
import VerifyLoginScreen from '../screens/VerifyLoginScreen';
import LoginScreen from '../screens/LoginScreen';
import PatternSearchScreen from '../screens/PatternSearchScreen';
import PatternDetailScreen from '../screens/PatternDetailScreen';
import Header from '../components/Header';


const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{header: () => <Header />} }>
            <Stack.Screen name="MainHome" component={HomeScreen} />
            <Stack.Screen name="VerifyLogin" component={VerifyLoginScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="PatternSearch" component={PatternSearchScreen} />
            <Stack.Screen name="PatternDetail" component={PatternDetailScreen} />
        </Stack.Navigator>

    );
}