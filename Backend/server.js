const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
console.log("🛠 Loading .env from:", path.resolve(__dirname, '.env'));

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { startCalendarSyncJob } = require('./controllers/register/syncCalendar');
const db = require('./models/index'); // Sequelize models
const sequelize = require('./config/database'); // Sequelize instance
const registerContactRoutes = require('./routes/register/contactRoutes');

// Initialize Express app
const app = express();

// CORS setup
const allowedOrigins =
  process.env.NODE_ENV === 'production' ? [] : [
    process.env.USER_FRONTEND, 
    process.env.ADMIN_FRONTEND, 
    process.env.REGISTER_FRONTEND, 
    
  ];

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: allowedOrigins, methods: ['GET', 'POST'], credentials: true }));
  console.log('CORS middleware enabled for development');
}

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false, // Adjust as needed
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Register contact route
app.use('/register-contact', registerContactRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// ------------------- Database Initialization -------------------
async function initializeDatabase() {
  try {
    console.log('✅ Connecting to the database...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    const enableSync = process.env.ENABLE_SYNC === 'true'; // Toggle with .env
    if (enableSync) {
      await db.sequelize.sync({ alter: true });
      console.log('✅ Database synchronized successfully.');
    } else {
      console.log('⚠️ Database sync skipped (ENABLE_SYNC = false).');
    }
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1); // Exit if DB connection fails
  }
}

// ------------------- Initialize Cron Jobs -------------------
function initializeCronJobs() {
  console.log('🕒 Initializing cron jobs...');
  
}

// ------------------- Start Server -------------------
const PORT = process.env.PORT || 3452;

async function startServer() {
  await initializeDatabase(); // Connect to DB
  initializeCronJobs(); // Start cron jobs

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();
