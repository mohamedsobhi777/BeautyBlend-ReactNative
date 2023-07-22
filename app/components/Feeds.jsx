import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { FeedDetail } from ".";

const Feeds = ({ feeds }) => {
    return (
        <View className="flex-row items-center flex-wrap justify-center">
            {feeds?.length > 0 ? (
                <>
                    {feeds?.map((item, i) => (
                        <FeedDetail key={i} data={item} />
                    ))}
                </>
            ) : (
                <View className="w-full h-64 flex items-center justify-center">
                    <ActivityIndicator size={"large"} color="teal" />
                    <Text>No Data</Text>
                </View>
            )}
            {/* <Text>{JSON.stringify(feeds)}</Text> */}
        </View>
    );
};

export default Feeds;
