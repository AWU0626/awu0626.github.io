const axios = require("axios");

exports.handler = async (event) => {
    try {
        const userName = event.queryStringParameters?.user || 'awu0626';
        const limit = event.queryStringParameters?.limit || 25;
        const clientId = event.queryStringParameters.malClientId;

        if (!clientId) throw new Error('MAL Client ID is required but not found');

        // fetch anime list from mal
        const url = `https://api.myanimelist.net/v2/users/${userName}/animelist?limit=${limit}&sort=list_score&fields=list_status`;
        
        const response = await axios.get(url, {
            headers: {
                'X-MAL-CLIENT-ID': clientId
            }
        });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                animelist: response.data.data
            })
        };
    } catch (error) {
        console.error('Error:', error);
        
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify({
                error: error.message,
                details: error.response?.data || 'Unknown error occurred'
            })
        };
    }
};