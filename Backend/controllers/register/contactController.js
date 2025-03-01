
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const multer = require('multer');
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

// ✅ Multer setup for in-memory file uploads with allowed MIME types
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4', // ✅ Allow MP4 files
    'video/quicktime', // ✅ .mov
    'video/x-msvideo', // ✅ .avi
    'video/x-matroska', // ✅ .mkv
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // ✅ Accept the file
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}`), false); // ❌ Reject the file
  }
};

// ✅ Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: { files: 5 }, // ✅ Limit uploads to 5 files
});

// ✅ Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: false,
  debug: false,
});

// ✅ Contact form controller
const handleContactForm = async (req, res) => {
  try {
    console.log('Received Form Data:', req.body);
    console.log('Received Files:', req.files);

    const { name, email, phone, description } = req.body;

    // Validation
    if (!name || !email || !phone || !description) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Attach files from memory
    const attachments = req.files.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
    }));

    // Prepare email content
    const emailContent = `
  <div style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
      <!-- Logo Section -->
      <div style="background-color: #000; padding: 20px; text-align: center;">
        <img src="https://boogieboys.com/logo.png" alt="Boogie Boys Logo" style="max-width: 200px; height: auto;">
      </div>

      <!-- Main Content Section -->
      <div style="padding: 30px;">
        <h1 style="font-size: 24px; color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New Contact Form Submission</h1>
        
        <p style="font-size: 16px; color: #555; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
          <strong>Name:</strong> ${name}
        </p>

        <p style="font-size: 16px; color: #555; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
          <strong>Email:</strong> ${email}
        </p>

        <p style="font-size: 16px; color: #555; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
          <strong>Phone:</strong> ${phone}
        </p>

        <p style="font-size: 16px; color: #555; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
          <strong>Description:</strong> ${description}
        </p>

        ${
          attachments.length > 0
            ? `<p style="font-size: 16px; color: #555; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                <strong>Uploaded Files:</strong> ${attachments.map((file) => file.filename).join(', ')}
              </p>`
            : ''
        }

        <!-- Footer -->
        <p style="font-size: 12px; color: #888; text-align: center; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
          This email was sent from the Boogie Boys appointment form. Please do not reply directly to this message.
        </p>
      </div>
    </div>
  </div>
`;

    // Send email
    let mailOptions = {
      from: `"Boogie Boys" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Appointment Request from ${name}`,
      html: emailContent,
      attachments,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({ message: 'Your message has been sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send your message. Please try again later.' });
  }
};

// ✅ Error-handling route to capture Multer errors
router.post('/', (req, res, next) => {
  upload.array('files', 5)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Multer upload error: ' + err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message }); // Custom error (unsupported file type)
    }
    next();
  });
}, handleContactForm);

// ✅ Export router and middleware
module.exports = {
  handleContactForm,
  upload,
  router,
};
