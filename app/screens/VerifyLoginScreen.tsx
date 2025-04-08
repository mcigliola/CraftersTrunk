import { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { checkLoginStatus } from "../utils/auth";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/rootStackParamList';

type VerifyLoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "VerifyLogin">;

type Props = {
    navigation: VerifyLoginScreenNavigationProp;
}
export default function VerifyLoginScreen({navigation }: Props) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyLogin = async () => {
            console.log("Verifying login status...");
            const token = await checkLoginStatus();
            console.log("Token:", token);

            if (!navigation) {
                console.log("Navigation is undefined!");
                return;
            }

            setTimeout(() => {
                if (token) {
                    console.log("Navigating to PatternSearch...");
                    navigation.navigate("PatternSearch", {accessToken: token});
                } else {
                    console.log("Navigating to Login...");
                    navigation.navigate("Login");
                }
                setLoading(false);
            }, 500);
        };
        verifyLogin();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Verifying Login...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#456396',
    },
    container: {
        flex: 1,
        backgroundColor: '#c1e3ce',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
})
