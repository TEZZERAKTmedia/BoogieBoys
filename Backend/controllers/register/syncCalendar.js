const dav = require('dav');
const Schedule = require('../../models/Schedule');
const EmailSubscribers = require('../../models/EmailSubscribers');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Setup email sender (Hostinger SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, 
  port: process.env.EMAIL_PORT, 
  secure: process.env.EMAIL_SECURE === 'true', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  logger: true, // Enable logging
  debug: true   // Debugging
});

async function fetchAppleCalendarEvents() {
    try {
        console.log('🔄 Fetching Apple Calendar via DAV...');

        const serverUrl = 'https://caldav.icloud.com/';
        const credentials = new dav.Credentials({
            username: process.env.ICLOUD_USERNAME,
            password: process.env.ICLOUD_PASSWORD
        });

        // Create a DAV client
        const xhr = new dav.transport.Basic(credentials);
        const client = new dav.Client(xhr);

        // Discover user principal URL (needed for iCloud)
        const account = await client.createAccount({
            server: serverUrl,
            loadObjects: true
        });

        if (!account.calendars.length) {
            console.error('❌ No calendars found.');
            return;
        }

        // Get the first available calendar
        const calendar = account.calendars[0];
        console.log(`✅ Found Calendar: ${calendar.displayName}`);

        // Fetch events from the calendar
        const events = await client.syncCollection({
            collection: calendar,
            loadObjects: true
        });

        console.log(`📅 Found ${events.objects.length} events`);
        for (const event of events.objects) {
            console.log(`✅ Event: ${event.calendarData}`);
        }

    } catch (error) {
        console.error('❌ Error fetching Apple Calendar:', error);
    }
}


async function notifySubscribers(slots) { 
  try {
    const subscribers = await EmailSubscribers.findAll();
    if (subscribers.length === 0) return;

    const slotDetails = slots
      .map(slot => `- ${slot.summary} on ${new Date(slot.start).toLocaleString()}`)
      .join("\n");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: subscribers.map(sub => sub.email),
      subject: '📅 New Appointment Slots Available',
      text: `New slots are available for booking:\n\n${slotDetails}\n\nBook your spot before they're gone!`
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Sent update emails to ${subscribers.length} subscribers.`);
  } catch (error) {
    console.error('❌ Error notifying subscribers:', error);
  }
}

function startCalendarSyncJob() {
  console.log("🚀 Starting Apple Calendar sync cron job...");
  cron.schedule('* * * * *', fetchAppleCalendarEvents);
}

module.exports = { startCalendarSyncJob };
