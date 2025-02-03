import axios from "axios";
import { useState } from "react";

const ENDPOINT = 'http://172.19.42.221:3001/api/openai'

export default function useOpenAi() {
    const [isLoading, setIsLoading] = useState(false)

    async function onGenerateCode() {
        setIsLoading(true)
        try {
            const response = await axios.post(ENDPOINT, {
                'role': 'developer',
                'content': 'integrate git with node js'
            })
            console.log(response)
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
    return { isLoading, onGenerateCode }
}
