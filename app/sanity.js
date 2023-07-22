import { createClient } from "@sanity/client";
import { fetchQuery } from "./utils/supports";

const client = createClient({
    projectId: "51fmpxln",
    dataset: "production",
    apiVersion: "2023-07-22",
    useCdn: true,
});

export const fetchFeeds = async () => {
    let data = await client.fetch(fetchQuery).then((feeds) => {
        return feeds;
    });
    return data;
};
