# Deployment Guide

## Quick Deploy Options

### Option 1: GitHub Pages (Recommended - Free & Easy)

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Wedding website"
   ```

2. **Create a new repository on GitHub** (github.com → New Repository)
   - Name it: `wedding-website` (or any name you prefer)
   - Make it **Public** (required for free GitHub Pages)
   - Don't initialize with README

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/wedding-website.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **main** branch
   - Click **Save**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/wedding-website/`

### Option 2: Netlify (Easiest - Drag & Drop)

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Drag and drop your entire `website_wedding` folder onto Netlify
3. Your site will be live instantly with a random URL
4. You can customize the domain name in settings

### Option 3: Vercel (Fast & Free)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in your project directory
3. Follow the prompts
4. Your site will be deployed instantly

### Option 4: Surge.sh (Simple CLI)

1. Install: `npm install -g surge`
2. Run: `surge`
3. Follow prompts to deploy

## Important Notes

- **Audio File Size**: The MP3 file is ~4.5MB. Make sure your hosting supports files this size.
- **HTTPS Required**: Modern browsers require HTTPS for audio autoplay to work properly.
- **Custom Domain**: All platforms above support custom domains (you may need to purchase one).

## Recommended: GitHub Pages

GitHub Pages is recommended because:
- ✅ Free forever
- ✅ HTTPS by default
- ✅ Easy to update (just push changes)
- ✅ Reliable and fast
- ✅ Supports custom domains
