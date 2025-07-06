import axios from "axios"

export async function getTopAnime(malClientId: string, user?: string, limit?: number) {
    if (!malClientId) throw new Error('invalid or no malClientId passed in from getTopAnime()')
    try {
        const url = `https://fi33pdj3wujpi4ycfvwkazbuye0ppmdi.lambda-url.us-east-2.on.aws/`
        const response = await axios(url, {
            params: {
                malClientId: malClientId,
                user: user,
                limit: limit
            }
        })

        return response.data.animelist
    } catch (error) {
        console.log('error fetching anime list due to:', error)
        return []
    }
}