import { useEffect, useState } from 'react'
import dummyData from "../../../data";
import axios from 'axios';

const ENDPOINT = "http://172.19.42.144:3001/api/cascading-dropdown?";
export default function useItems(selectedFilter: Record<string, string>) {
    const [data, setData] = useState(dummyData);

    useEffect(() => {
        async function getItems(selectedFilter: Record<string, string>) {
            let query = Object.entries(selectedFilter)
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
            try {
                const response = await axios.get(ENDPOINT + query);
                setData(response.data.data);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        // getItems(selectedFilter)

    }, [selectedFilter]);

    return { data }
}
