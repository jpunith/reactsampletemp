// import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
// import clientPromise from "../../lib/mongodb";
import OpenAI from "openai";
import axios from "axios";
import { useState } from "react";


export default function useOpenAi() {
    const [isLoading, setIsLoading] = useState(false)

    async function onGenerateCode() {
        setIsLoading(true)
        try {
            const response = await axios.get('')
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
