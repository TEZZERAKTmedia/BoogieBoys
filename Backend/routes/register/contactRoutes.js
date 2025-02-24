const express = require('express');
const { handleContactForm, upload } = require('../../controllers/register/contactController'); // Import controller and multer

const router = express.Router();

// ✅ Set up the route to handle file uploads (max 5 files, including mp4s)
router.post('/', upload.array('files', 5), handleContactForm); // Accepts up to 5 files

module.exports = router;
