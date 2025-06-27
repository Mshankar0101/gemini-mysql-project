// Import the database connection pool
const dbPool = require('../config/db');
// Import the Gemini service
const geminiService = require('../services/geminiService');

// This is the main controller function for the /ask endpoint
const handleAskRequest = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // 1. Get the response from the Gemini API via the service
        const geminiResultText = await geminiService.askGemini(prompt);

        // 2. Save the request and response to the database
        try {
            console.log('Saving conversation to database...');
            const sqlQuery = "INSERT INTO gemini (request, response) VALUES (?, ?)";
            await dbPool.execute(sqlQuery, [prompt, geminiResultText]);
            console.log('Successfully saved to database.');
        } catch (dbError) {
            // Log database errors but don't block sending the response to the user
            console.error('Database Save Error:', dbError);
        }

        // 3. Send the successful response back to the frontend
        res.json({ response: geminiResultText });

    } catch (error) {
        // Handle any errors that occurred in the service or elsewhere
        console.error('Controller Error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get all conversation history from the database
const getHistory = async (req, res) => {
    try {
        const [rows] = await dbPool.query('SELECT * FROM gemini ORDER BY id ASC');
        res.json({ history: rows });
    } catch (error) {
        console.error('Get History Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};

// Export the controller function
module.exports = {
    handleAskRequest,
    getHistory
};
