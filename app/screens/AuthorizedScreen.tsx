import { View, Text, StyleSheet, Button } from "react-native";

export default function AuthorizedScreen() {
    return (
        <View style={styles.container}>
            <Text>Authorized Screen</Text>
            <Button title="Logout" onPress={() => { }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});