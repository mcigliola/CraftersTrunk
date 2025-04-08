import React, { useState, useEffect } from 'react';
import { Text, Pressable, View, StyleSheet, Image, FlatList, ScrollView, ActivityIndicator, useWindowDimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from '@rneui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/rootStackParamList';
import { Pattern } from '../utils/types';
import { RouteProp } from '@react-navigation/native';
import Render, { RenderHTML } from 'react-native-render-html';
import { checkLoginStatus } from '../utils/auth';
import ActionMenu from '../components/ActionMenu';


type PatternDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, "PatternDetail">;
type PatternDetailRouteProp = RouteProp<RootStackParamList, "PatternDetail">;

type Props = {
    navigation: PatternDetailScreenNavigationProp;
    route: PatternDetailRouteProp;
};
export default function PatternDetailScreen({ navigation, route }: Props) {
    const initialToken = route.params?.accessToken || null;
    const { patternId } = route.params;
    const [pattern, setPattern] = useState<Pattern>();
    const [accessToken, setAccessToken] = useState(initialToken);
/*    const [loading, setLoading] = useState(true);*/
    const { width } = useWindowDimensions();
    var currentPatterns: Pattern[] = [];
    var isCrochet = false;
    var isFree = pattern?.free;
    var price = pattern?.currency;


    useEffect(() => {
        const getToken = async () => {
            console.log("Getting access token...");
            const token = await checkLoginStatus();
            setAccessToken(token);
        };

        if (!accessToken) {
            getToken();
        }
    }, []);

    useEffect(() => {
        const fetchPattern = async () => {
            console.log("Fetching pattern...");
            try {
                const response = await fetch(`https://api.ravelry.com/patterns/${patternId}.json`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                
                const data = await response.json();
                console.log("Pattern Data:", data);

                setPattern(data.pattern);

            } catch (error) {
                console.error("Error fetching pattern:", error);
            }
        };

        if (accessToken) {
            fetchPattern();
        }
    }, [accessToken, patternId]);

    useEffect(() => {
        if (pattern) {
            console.log("Attribute Data:", JSON.stringify(pattern.pattern_attributes, null, 2));
            console.log("Packs Data:", JSON.stringify(pattern.packs, null, 2));
        }
    }, [pattern]);

    if (!pattern) {
        return (
            <View style={styles.infoContainer}>
                <Text style={{ color: '#fff', fontSize: 18 }}>No pattern found.</Text>
            </View>
        );
    }

    if (pattern.craft.name === "Crochet") {
        isCrochet = true;
    }

    const searchPatterns = async (searchQuery: string) => {
        console.log("Searching patterns...");
        try {
            const response = await fetch(`https://api.ravelry.com/patterns/search.json?query=${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();

            if (data.patterns && Array.isArray(data.patterns)) {
                currentPatterns = data.patterns;
                navigation.navigate("PatternSearch", { accessToken: accessToken, currentPatterns: currentPatterns });
            } else {
                console.log("No patterns found!");
            }
        } catch (error) {
            console.error("Error fetching patterns:", error);
        }
    }  
    

    return (
        <View style={styles.container}>
            <View style={styles.actionsContainer}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton }>
                    <Ionicons name="caret-back" size={30} color="#fff" />
                </Pressable>
                <View style={styles.rightActions}>
                    <Pressable onPress={() => console.log("Added to Favorites") }>
                        <Ionicons name="heart-outline" size={30} color="#fff" />
                    </Pressable>
                    <ActionMenu pattern={pattern} />
                </View>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{pattern.name}</Text>
                <Text style={styles.author}>by {pattern.pattern_author?.name || "Unknown Author"}</Text>
            </View>
            <ScrollView style={styles.container}>
                {/* Image Carousel */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
                    {pattern.photos?.map((photo, index) => (
                        <Image key={index} source={{ uri: photo.medium_url }} style={styles.image} />
                    ))}
                </ScrollView>

                {/* Pattern Information */}
                <View style={styles.priceDescription}>
                    {isFree ? <Text style={styles.price}>FREE</Text> : <Text style={styles.price}>{pattern.price && pattern.currency !== null
                        ? `${pattern.price.toFixed(2)} ${pattern.currency}`
                        : "Price not available"}</Text>}
                </View>
                <View style={styles.infoContainer}>
                    {/* Table Layout for Pattern Details */}
                    <View style={styles.detailTable}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Craft:</Text>
                            <Text style={styles.value}>
                                {isCrochet == true ? "Crochet" : "Knitting"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Category:</Text>
                            <Text style={styles.value}>
                                {Array.isArray(pattern.pattern_categories) && pattern.pattern_categories.length > 0
                                    ? pattern.pattern_categories.map((category) => category.name || "Unknown").join(", ")
                                    : "N/A"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Suggested Yarns:</Text>
                            <Text style={styles.value}>
                                {Array.isArray(pattern.packs) && pattern.packs.length > 0 ? pattern.packs.map((pack) => pack.yarn_name).join(", ") 
                                    : "N/A"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Yarn Weight:</Text>
                            <Text style={styles.value}>{pattern.yarn_weight_description || "N/A"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Gauge:</Text>
                            <Text style={styles.value}>{pattern.gauge_description || "N/A"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>{isCrochet == true ? "Hook Size:" : "Needle Size:"}</Text>
                            <Text style={styles.value}>
                                {Array.isArray(pattern.pattern_needle_sizes) && pattern.pattern_needle_sizes.length > 0 ? pattern.pattern_needle_sizes.map((pattern_needle_size) => pattern_needle_size.name).join(", ")
                                    : "N/A"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Yardage:</Text>
                            <Text style={styles.value}>{pattern.yardage_description || "N/A"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Sizes Available:</Text>
                            <Text style={styles.value}>{pattern.sizes_available || "One size"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Language:</Text>
                            <Text style={styles.value}>{Array.isArray(pattern.languages) && pattern.languages.length > 0 ? pattern.languages.map((language) => language.name).join(", ")
                                : "English"}</Text>
                        </View>
                    </View>
                </View>

                <Divider />

                 {/*Tags Section */}
                <View style={styles.tagsContainer}>
                    {pattern.pattern_attributes?.map((attribute) => (
                        <Pressable onPress={() => searchPatterns() }
                        <Text style={styles.tag}>{attribute.permalink}</Text>
                    ))}
                </View>


                {/* About Section */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.sectionTitle}>About this Pattern</Text>
                    {pattern.notes ? <Text style={styles.notes }>{pattern.notes}</Text> : pattern.notes_html ? <RenderHTML baseStyle={baseStyle} contentWidth={width} source={{ html: pattern.notes_html }} /> : <Text style={styles.value}>No description available.</Text>} 
                </View>

               
            </ScrollView>
        </View>
    );
}

const baseStyle = { // Styles for RenderHTML
    color: '#fff',
    fontSize: 16,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2c1b13",
        padding: 10,
    },
    carousel: {
        height: 250,
        marginBottom: 15,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginRight: 10,
    },
    infoContainer: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    titleContainer: {
        marginBottom: 5,
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    author: {
        fontSize: 16,
        color: "#fff",
    },
    detailTable: {
        width: "100%",
        marginTop: 10,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff",
        paddingRight: 10,
        maxWidth: "40%",
    },
    value: {
        fontSize: 16,
        color: "#fff",
        maxWidth: "60%",
        textAlign: "right",

    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 10,
    },
    tag: {
        backgroundColor: "#d4a373",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 15,
        fontSize: 14,
        color: "#fff",
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
/*        backgroundColor: "transparent",*/
    },
    rightActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    descriptionContainer: {
        padding: 10,
        marginBottom: 15,
    },
    notes: {
        fontSize: 16,
        color: "#fff",
        marginTop: 10,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
    },
    yarnsContainer: {
        marginTop: 15,
    },
    yarnItem: {
        alignItems: "center",
        marginRight: 10,
    },
    yarnImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    yarnName: {
        fontSize: 12,
        color: "#fff",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    priceDescription: {
/*        justifyContent: "center",*/
        alignItems: "flex-end",
        paddingRight: 10,
        marginBottom: 5,
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#801703",
        backgroundColor: "#d4a373",
        padding: 5,
    },
});
