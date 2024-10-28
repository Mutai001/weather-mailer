import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Set up the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'omusekim@gmail.com', // Your email address
    pass: 'xlwf bgay sigx cnxc', // Your email password or app password
  },
});

// Email sending route
app.post('/send-email', async (req, res) => {
  const { email, location, temperature, weatherCondition } = req.body;

  // Validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  const mailOptions = {
    from: 'omusekim@gmail.com', // Your email address
    to: email, // Use the email from the request body
    subject: `Weather Update for ${location}`,
    text: `Hello,\n\nHere's the current weather in ${location}:\n\nTemperature: ${temperature}°C\nCondition: ${weatherCondition}\n\nStay prepared!\nWeather Notification App`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
