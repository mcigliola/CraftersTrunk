import { StackNavigationProp } from "@react-navigation/stack";
import { Text, View, StyleSheet, Button, Image, Pressable } from "react-native";
import { RootStackParamList } from "../navigation/rootStackParamList";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "MainHome">;

type Props = {
    navigation: HomeScreenNavigationProp;
}
export default function HomeScreen({navigation }: Props) {
    //const navigation = useNavigation();

    return (

        <View style={styles.parent}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Crafter's Trunk!</Text>
                <View style={styles.navigationContainer}>
                    <Pressable style={styles.tile} onPress={() => navigation.navigate("VerifyLogin")}>
                        <Text>Search Patterns</Text>
                    </Pressable>
                    <Pressable style={styles.tile} onPress={() => navigation.navigate("Library")}>
                        <Text>My Library</Text>
                    </Pressable>
                    <Pressable style={styles.tile} onPress={() => navigation.navigate("Projects")}>
                        <Text>Projects</Text>
                    </Pressable>
                    <Pressable style={styles.tile} onPress={() => navigation.navigate("ComingSoonScreen")}>
                        <Text>Coming Soon</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        color: "#cbae8f",
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: '#2c1b13',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    navigationContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 20,
    },
    tile: {
        width: "40%",
        aspectRatio: 1,
        backgroundColor: "#cbae8f",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        borderRadius: 10,
    },
});
