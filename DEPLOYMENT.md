# 🚀 Quick Deployment Guide

## Step-by-Step Deployment

### 1️⃣ Set Up Email Service First

**Easiest Option: Gmail**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Factor Authentication
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate an app password for "Mail"
5. Copy the 16-character password

**Better Option: Resend (Free tier)**
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys and create one
3. Copy the API key

### 2️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

**For Gmail:**
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_TO=your-email@gmail.com
EMAIL_FROM=your-email@gmail.com
```

**For Resend:**
```env
EMAIL_SERVICE=resend
RESEND_API_KEY=re_your-api-key
EMAIL_TO=your-email@gmail.com
EMAIL_FROM=noreply@yourdomain.com
```

### 3️⃣ Deploy to Vercel (Recommended)

**Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Portfolio ready to deploy"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

**Step 2: Deploy on Vercel**
1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository
5. In "Environment Variables", add all variables from your `.env`:
   - `EMAIL_SERVICE`
   - `EMAIL_USER`
   - `EMAIL_PASS` (or `RESEND_API_KEY`)
   - `EMAIL_TO`
   - `EMAIL_FROM`
6. Click "Deploy"

✅ **Done!** Your portfolio is live at `https://your-project.vercel.app`

### 4️⃣ Test Your Contact Form

1. Visit your deployed portfolio
2. Scroll to the Contact section
3. Fill out and submit the form
4. Check your email!

## 🔗 Share Your Portfolio

Once deployed, you'll get a shareable link like:
- Vercel: `https://your-project.vercel.app`
- Netlify: `https://your-project.netlify.app`

Share this link with anyone!

## 📧 Receiving Messages

When someone submits the contact form:
- ✅ You'll receive an email at `EMAIL_TO`
- ✅ The email includes: Name, Email, Subject, and Message
- ✅ You can reply directly to their email
- ✅ (Optional) They'll receive a confirmation email if `SEND_CONFIRMATION=true`

## 🎯 Next Steps

1. Customize the content in `public/index.html`
2. Update your social media links
3. Add your projects
4. Replace placeholder images
5. Change colors in `public/styles.css`

## 🆘 Need Help?

**Contact form not working?**
- Double-check environment variables are set in your deployment platform
- Check the deployment logs for errors
- Test with a different email service

**Not receiving emails?**
- Check spam folder
- Verify `EMAIL_TO` is correct
- For Gmail: Make sure you're using an App Password

---

Happy deploying! 🎉

