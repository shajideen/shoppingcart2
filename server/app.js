const express = require('express');
const cors = require("cors");
const nodemailer = require('nodemailer');

const app = express();

app.use(cors())
app.use(express.json()); // To parse JSON bodies

// Replace these with your actual SMTP credentials
const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587, // use 465 for secure connections
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'mmnisha8983@gmail.com',
    pass: 'judupmcbfagvjbsq',
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

app.post('/send-email', async (req, res) => {
  const { email,cate, desc } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  const mailOptions = {
    from: '"Shaji" shajimusthfa3007@gmail.com', // sender address
    to: email, // recipient address
    subject: 'Order Confirmation Mail', // Plain text body
    text: `Your order for ${cate} with product ${desc} will be delivery in 3-4 working days`, // Subject line
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
