import { View, Button, StyleSheet } from "react-native";
import { useAuth } from "../utils/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/rootStackParamList";
import { useEffect } from "react";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

type Props = {
    navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({navigation }: Props) {
    const { promptAsync, accessToken } = useAuth();


    useEffect (() => {

        if (accessToken) {
            navigation.navigate("PatternSearch", {accessToken: accessToken});
        } 
    }, [accessToken, navigation]);


    return (
        <View style={styles.container}>
            
            <Button
                title="Login to Ravelry"
                onPress={async () => {
                    console.log("Logging in...");
                    await promptAsync();
                }}
          />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});


