const axios = require('axios'); 
require('dotenv').config();

// This function is responsible for communicating with the Gemini API
async function askGemini(prompt) {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not defined in the .env file.');
    }
    
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    try {
        console.log('Sending prompt to Gemini:', prompt);
        const modifiedPrompt = `Please provide a plain text response only, without any formatting like Markdown, bullet points, or special characters. Your response should be concise and directly answer the following: ${prompt}`;

        const response = await axios.post(GEMINI_API_URL, {
            contents: [{
                parts: [{ text: modifiedPrompt }]
            }]
        });

        const resultText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!resultText) {
            console.error('Unexpected Gemini API response structure:', response.data);
            throw new Error('Could not parse Gemini response.');
        }

        console.log('Received response from Gemini.');
        return resultText;

    } catch (error) {
        console.error('Gemini API Error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get response from Gemini API.');
    }
}

// Export the function to be used by the controller
module.exports = {
    askGemini
};
