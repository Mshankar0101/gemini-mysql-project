const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Import API routes
const apiRoutes = require('./routes/api');

// --- 2. MIDDLEWARE ---
// Enable CORS for all routes
app.use(cors());
// Enable the express server to parse JSON formatted request bodies
app.use(express.json());
// Serve static files (like index.html) from the 'public' directory
app.use(express.static('public'));

// --- 3. ROUTES ---
// Tell the app to use the routes defined in './routes/api.js' for any URL starting with '/api'
app.use('/api', apiRoutes);


// --- 4. START THE SERVER ---
// Start listening for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // You can also access the frontend at http://localhost:3000
});
