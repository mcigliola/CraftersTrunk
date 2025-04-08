import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, Image, FlatList, Pressable } from "react-native";
import { SearchBar } from '@rneui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { checkLoginStatus, logout } from '../utils/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Pattern } from '../utils/types';
import PatternGrid from '../components/PatternGrid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type PatternSearchNavigationProp = StackNavigationProp<RootStackParamList, "PatternSearch">;
type PatternSearchRouteProp = RouteProp<RootStackParamList, "PatternSearch">;

type Props = {
    navigation: PatternSearchNavigationProp;
    route: PatternSearchRouteProp;
    currentPatterns: Pattern[];
}
export default function PatternSearchScreen({ navigation, route, currentPatterns }: Props) {
    const initialToken = route.params?.accessToken || null;
    const [accessToken, setAccessToken] = useState(initialToken);
    const [searchQuery, setSearchQuery] = useState('');
    const [patterns, setPatterns] = useState<Pattern[]>([]);
    const [numColumns, setNumColumns] = useState(2);
    const isGridView = numColumns === 2;
    const timestamp = Date.now();

    const toggleColumns = () => {
        setNumColumns((numColumns) => (numColumns === 2 ? 1 : 2));
    };

    if (currentPatterns) {
        setPatterns(currentPatterns);
    }

    useEffect(() => {
        if (!accessToken) {
            const getToken = async () => {
                console.log("Getting access token...");
                const token = await checkLoginStatus();
                setAccessToken(token);
            };
            getToken();
            
        }

        const fetchHotPatterns = async () => {
            console.log("Fetching hot patterns for timestamp:", timestamp);
            try {
                const response = await fetch(`https://api.ravelry.com/patterns/search.json?page_size=20&sort=hot_right_now&nocache=${timestamp}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();
                console.log("Highlights Data:", data);
                setPatterns(data.patterns as Pattern[]);
            } catch (error) {
                console.error("Error fetching hot patterns:", error);
            }
        };
        fetchHotPatterns();
    }, []);


    const searchPatterns = async () => {
        console.log("Searching patterns...");
        try {
            const response = await fetch(`https://api.ravelry.com/patterns/search.json?query=${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();

            if (data.patterns && Array.isArray(data.patterns)) {
                setPatterns(data.patterns as Pattern[]);
            } else {
                console.log("No patterns found!");
            }
        } catch (error) {
            console.error("Error fetching patterns:", error);
        }
    }  

    const handleLogout = async () => {
        console.log("Logging out...");
        await logout();

        if (!navigation) {
            console.log("Navigation is undefined!");
            return;
        } else {
            navigation.navigate("Login");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchRow}>
                <Pressable onPress={() => console.log("Filters pressed")}>
                    <Icon name="filter" size={30} color="#fff" />
                </Pressable>
                <SearchBar
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchBar}
                    placeholder="Search patterns..."
                    onChangeText={setSearchQuery}
                    onSubmitEditing={() => searchPatterns()}
                    value={searchQuery}
                    lightTheme={false}
                    round={true}
                />
                <Pressable onPress={toggleColumns} /*style={styles.iconButton}*/>
                    <Icon name={isGridView ? 'view-list' : 'view-grid'}
                        size={30}
                        color='#fff' />
                </Pressable>
            </View>
            <PatternGrid patterns={patterns} numColumns={numColumns}  />

            <Button title="Logout"
                onPress={handleLogout}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2c1b13",
        padding: 10,
    },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    searchBarContainer: {
        flex: 1,
        backgroundColor: "transparent", 
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    searchBar: {
        backgroundColor: "#fff",
        borderRadius: 10,
        height: 40,
    },
    iconButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#ddd",
        marginLeft: 10,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        alignItems: "center",
        elevation: 3, // for Android shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    imagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    designer: {
        fontSize: 14,
        color: "#666",
    },
    status: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#007bff",
    },
});
//const styles = StyleSheet.create({
//    parent: {
//        flex: 1,
//    },
//    SearchBar: {
//        justifyContent: "center",
//        alignItems: "center",
//        minWidth: 300,
//    },
//    header: {
//        flexDirection: "row",
//        justifyContent: "space-between",
//        alignItems: "center",
//        marginTop: 40,
//        paddingHorizontal: 20,
//        paddingVertical: 10,
//        backgroundColor: '#456396',
//    },
//    container: {
//        flex: 1,
//        backgroundColor: '#c1e3ce',
//        alignItems: 'center',
//        justifyContent: 'center',
//        paddingHorizontal: 20,
//        paddingVertical: 40,
//    },
//})
