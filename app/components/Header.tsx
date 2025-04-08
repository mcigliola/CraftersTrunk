import React from 'react';
import { Text, Pressable, View, StyleSheet, Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; 
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../navigation/rootStackParamList';


export default function Header() {
    const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.header}>
            <Image source={require('../../Logo2.png')} style={{ width: 50, height: 50 }} />
            <Pressable onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons name="menu" size={30} color="black" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: "#cbae8f",
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
});