const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rate limiting to prevent spam
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per windowMs
    message: 'Too many contact requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Email transporter configuration
const createTransporter = () => {
    // Option 1: Gmail (requires app password)
    if (process.env.EMAIL_SERVICE === 'gmail') {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Gmail App Password
            },
        });
    }
    
    // Option 2: SendGrid
    if (process.env.EMAIL_SERVICE === 'sendgrid') {
        return nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: 'apikey',
                pass: process.env.SENDGRID_API_KEY,
            },
        });
    }
    
    // Option 3: Resend (recommended for production)
    if (process.env.EMAIL_SERVICE === 'resend') {
        return nodemailer.createTransport({
            host: 'smtp.resend.com',
            port: 465,
            secure: true,
            auth: {
                user: 'resend',
                pass: process.env.RESEND_API_KEY,
            },
        });
    }
    
    // Option 4: Custom SMTP
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required',
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email address',
            });
        }

        const transporter = createTransporter();

        // Email to you (the portfolio owner)
        const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER,
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366f1;">New Contact Form Submission</h2>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="color: #666; font-size: 12px;">
                        This message was sent from your portfolio contact form.
                    </p>
                </div>
            `,
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Optional: Send confirmation email to the sender
        if (process.env.SEND_CONFIRMATION === 'true') {
            const confirmationMail = {
                from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
                to: email,
                subject: 'Thank you for contacting me!',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #6366f1;">Thank you for reaching out!</h2>
                        <p>Hi ${name},</p>
                        <p>I've received your message and will get back to you as soon as possible.</p>
                        <p>Best regards,<br>Sahanya</p>
                    </div>
                `,
            };
            await transporter.sendMail(confirmationMail);
        }

        res.json({
            success: true,
            message: 'Message sent successfully!',
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send message. Please try again later.',
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Serve frontend for production
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

