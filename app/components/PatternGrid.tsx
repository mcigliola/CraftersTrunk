import React from 'react';
import { Text, View, StyleSheet, Button, Image, FlatList, TouchableOpacity, Pressable } from "react-native";
import { Pattern } from '../utils/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/rootStackParamList';

type PatternDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, "PatternDetail">;

export type Props = {
    patterns: Pattern[];
    numColumns: number;
};

export default function PatternGrid({ patterns, numColumns }: Props) {
    const navigation = useNavigation<PatternDetailScreenNavigationProp>();

    const handlePress = (item: Pattern) => {
        const patternId = item.id;
        navigation.navigate("PatternDetail", { patternId: patternId });
    };


    return (
        <View style={styles.container}>
            
            <FlatList
                key={numColumns}
                data={patterns}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numColumns}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.tile} onPress={() => handlePress(item)}>
                        <Image source={{ uri: item.first_photo?.medium_url || 'fallback-image-url' }} style={styles.image} />
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.designer}>{item.designer?.name || "Unknown Designer"}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#2c1b13',
    },
    tile: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },

    image: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 10,
    },
    title: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
    },
    designer: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});