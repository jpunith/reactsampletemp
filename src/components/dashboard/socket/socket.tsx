import axios from "axios";
import { useState } from "react";

const ENDPOINT = 'http://172.19.42.221:3001/api/openai'

export default function useOpenAi() {
    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState('')

    async function onGenerateCode() {

        if(searchText == ''){
            return ''
        }

        setIsLoading(true)
        try {
            const response = await axios.post(ENDPOINT, {
                'role': 'developer',
                'content': searchText
            })
            return response?.data?.data?.content
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setTimeout(() => {
                setIsLoading(false)

            }, 2000);
        }
    }

    function updateSearchText(text: string) {
        setSearchText(text)
    }

    return { isLoading, onGenerateCode, updateSearchText, searchText }
}
