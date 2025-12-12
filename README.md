# Sahanya's Portfolio - Full Stack

A modern, responsive full-stack portfolio website with a working contact form. Built with HTML, CSS, JavaScript, Node.js, and Express.

## ✨ Features

- 🎨 Modern and clean design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth animations and transitions
- 📧 **Working contact form** - Receives real messages via email
- 🚀 Ready for deployment with shareable links
- 🔒 Rate limiting to prevent spam
- ✅ Email validation and error handling

## 📁 Project Structure

```
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # CSS styles
│   └── script.js       # Frontend JavaScript
├── netlify/
│   └── functions/
│       └── server.js   # Netlify serverless function
├── server.js           # Express server (for Vercel/Railway)
├── package.json        # Dependencies
├── vercel.json         # Vercel configuration
├── netlify.toml        # Netlify configuration
└── env.example         # Environment variables template
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `env.example` to `.env` and fill in your email configuration:

```bash
# Windows
copy env.example .env

# Mac/Linux
cp env.example .env
```

### 3. Configure Email Service

Choose one of these email services:

#### Option A: Gmail (Easiest to start)
1. Enable 2-factor authentication on your Google account
2. Generate an [App Password](https://support.google.com/accounts/answer/185833)
3. In `.env`:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_TO=your-email@gmail.com
EMAIL_FROM=your-email@gmail.com
```

#### Option B: Resend (Recommended for production - Free tier)
1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. In `.env`:
```env
EMAIL_SERVICE=resend
RESEND_API_KEY=re_your-api-key-here
EMAIL_TO=your-email@gmail.com
EMAIL_FROM=noreply@yourdomain.com
```

#### Option C: SendGrid
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. In `.env`:
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_TO=your-email@gmail.com
EMAIL_FROM=your-email@gmail.com
```

### 4. Run Locally

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Visit `http://localhost:3000` to see your portfolio!

## 🌐 Deployment Options

### Option 1: Deploy to Vercel (Recommended - Easiest)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Add environment variables (from your `.env` file) in the Vercel dashboard
   - Click "Deploy"

3. **Your portfolio is live!** You'll get a shareable link like `https://your-project.vercel.app`

### Option 2: Deploy to Netlify

1. **Push code to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Click "New site from Git"
   - Select your repository
   - Build settings:
     - Build command: `npm install`
     - Publish directory: `public`
   - Add environment variables in Site settings → Environment variables
   - Click "Deploy site"

3. **Your portfolio is live!** You'll get a shareable link like `https://your-project.netlify.app`

### Option 3: Deploy to Railway

1. **Push code to GitHub**

2. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up/login with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Add environment variables in the Variables tab
   - Railway will auto-deploy!

3. **Your portfolio is live!** You'll get a shareable link

### Option 4: Deploy to Render

1. **Push code to GitHub**

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Sign up/login with GitHub
   - Click "New" → "Web Service"
   - Connect your repository
   - Settings:
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Add environment variables
   - Click "Create Web Service"

## 📧 Testing the Contact Form

1. Once deployed, visit your portfolio
2. Scroll to the Contact section
3. Fill out the form and submit
4. Check your email inbox (and spam folder) for the message!

## 🎨 Customization

### Update Content

Edit files in the `public/` folder:
- `index.html` - Update text, links, and content
- `styles.css` - Change colors, fonts, and styling
- `script.js` - Modify JavaScript behavior

### Change Colors

Edit CSS variables in `public/styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... */
}
```

### Add Your Photo

Replace the placeholder in the About section with your actual image.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_SERVICE` | Email service: `gmail`, `sendgrid`, `resend`, or `smtp` | Yes |
| `EMAIL_USER` | Your email address | Depends on service |
| `EMAIL_PASS` | Email password/app password | Depends on service |
| `EMAIL_TO` | Where to send contact form messages | Yes |
| `EMAIL_FROM` | From address for emails | Yes |
| `SEND_CONFIRMATION` | Send confirmation to sender (`true`/`false`) | No |

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Email**: Nodemailer
- **Deployment**: Vercel/Netlify/Railway compatible

## 📝 API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

## 🐛 Troubleshooting

### Contact form not working?

1. Check that environment variables are set correctly
2. For Gmail: Make sure you're using an App Password, not your regular password
3. Check server logs for error messages
4. Verify your email service credentials are correct

### Can't receive emails?

1. Check your spam/junk folder
2. Verify `EMAIL_TO` is set correctly
3. For Gmail: Check that "Less secure app access" is enabled (or use App Password)
4. Test with a different email service

## 📄 License

MIT License - Feel free to use this for your portfolio!

## 🙏 Support

If you encounter any issues, please check:
1. Your environment variables are set correctly
2. Your email service credentials are valid
3. Your deployment platform logs for errors

---

Made with ❤️ by Sahanya
