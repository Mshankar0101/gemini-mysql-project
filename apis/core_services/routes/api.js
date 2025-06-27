const express = require('express');
const router = express.Router();

// Import the controller function
const chatController = require('../controllers/chatController');


router.post('/ask', chatController.handleAskRequest);
router.get('/history', chatController.getHistory);


// Export the router to be used by the main server.js file
module.exports = router;
