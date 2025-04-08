import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import { RootStackParamList } from './rootStackParamList';

const Drawer = createDrawerNavigator<RootStackParamList>();
export default function DrawerNavigator() {

    return (
        <Drawer.Navigator screenOptions={{headerShown: false} }>
            <Drawer.Screen name="Home" component={StackNavigator} />
            <Drawer.Screen name="PatternSearch" component={StackNavigator} />
        </Drawer.Navigator>
    );
}

