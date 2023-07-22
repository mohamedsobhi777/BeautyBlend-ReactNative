import {
    View,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import { Screen3 } from "../assets";
import { useEffect } from "react";
import { fetchFeeds } from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import { SET_FEEDS } from "../context/actions/feedsActions";
import Feeds from "../components/Feeds";

const HomeScreen = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const feeds = useSelector((state) => state.feeds);
    const [filteredFeeds, setFilteredFeeds] = useState(null);
    const handleSearchTerm = (text) => {
        setSearchTerm(text);
        setFilteredFeeds(
            feeds?.feeds.filter((item) => item.title.includes(text))
        );
    };
    useEffect(() => {
        setIsLoading(true);
        try {
            fetchFeeds().then((res) => {
                dispatch(SET_FEEDS(res));
                console.log(feeds?.feeds);
                // console.log(res);
                setInterval(() => {
                    setIsLoading(false);
                }, 1000);
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        } finally {
        }
    }, []);

    return (
        <SafeAreaView className="flex-1 items-center justify-start bg-[#EBEAEF]">
            <View className="w-full flex-row items-center justify-between px-4 py-2">
                <MaterialIcons name="chevron-left" size={24} color="black" />
                <Image
                    source={Screen3}
                    className="w-12 h-12 rounded-xl "
                    resizeMode="cover"
                />
            </View>
            <View className="flex-row items-center justify-between px-4 py-2 w-full space-x-6">
                <View className="px-4 py-2 bg-white rounded-xl flex-1 flex-row justify-center items-center space-x-2">
                    <MaterialIcons name="search" size={24} color="#7f7f7f" />
                    <TextInput
                        className="text-base font-semibold text-[#555] flex-1 py-1 -mt-1"
                        placeholder="Search here..."
                        value={searchTerm}
                        onChangeText={handleSearchTerm}
                    />
                </View>
                <TouchableOpacity className="w-12 h-12 rounded-xl flex items-center justify-center bg-white">
                    <FontAwesome name="filter" size={24} color="#7f7f7f" />
                </TouchableOpacity>
            </View>
            <ScrollView className="flex-1 w-full h-full">
                {isLoading ? (
                    <View className="flex-1 h-80 items-center justify-center">
                        <ActivityIndicator size="large" color="teal" />
                    </View>
                ) : (
                    <Feeds
                        feeds={
                            filteredFeeds || filteredFeeds?.length > 0
                                ? filteredFeeds
                                : feeds?.feeds
                        }
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
