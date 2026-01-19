# Deployment Guide

## Quick Start

### Local Testing
```bash
cd /Users/saurabhpandey/Documents/website_wedding
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## Deploy to Production

### Option 1: Netlify (Recommended - Free & Easy)

1. **Via Netlify Drop:**
   - Go to https://app.netlify.com/drop
   - Drag and drop the entire `website_wedding` folder
   - Your site will be live instantly!

2. **Via Git:**
   - Push your code to GitHub
   - Connect your repo to Netlify
   - Deploy automatically on every push

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### Option 3: GitHub Pages

1. Create a GitHub repository
2. Push your code
3. Go to Settings > Pages
4. Select main branch and `/root` folder
5. Your site will be at `username.github.io/repo-name`

### Option 4: Traditional Web Hosting

Upload all files via FTP/SFTP to your web server's public_html directory.

## RSVP Form Integration

The RSVP form currently saves to localStorage. To enable email notifications:

### Using EmailJS (Free tier available)

1. Sign up at https://www.emailjs.com/
2. Create a service and template
3. Uncomment and configure the EmailJS code in `script.js` (around line 150)
4. Add EmailJS script to `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

### Using Formspree (Free tier available)

1. Sign up at https://formspree.io/
2. Get your form endpoint
3. Update the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Using Your Own Backend

Update the RSVP form handler in `script.js` to send data to your API endpoint.

## Customization

### Change Colors
Edit `styles.css` - modify the `:root` CSS variables:
```css
:root {
    --saffron: #FF9933;
    --maroon: #8B0000;
    --gold: #FFD700;
    /* ... */
}
```

### Add/Remove Photos
Edit `script.js` - update the `photoFiles` array:
```javascript
const photoFiles = [
    'your-photo-1.jpg',
    'your-photo-2.jpg',
    // ...
];
```

### Update Event Details
Edit `index.html` - modify the timeline section with your event details.

## Performance Tips

1. **Optimize Images:**
   - Compress photos before uploading
   - Use WebP format for better compression
   - Recommended max size: 2MB per image

2. **Enable Caching:**
   - Add `.htaccess` file for Apache servers
   - Configure caching headers in Netlify/Vercel

3. **CDN:**
   - Use a CDN for faster global delivery
   - Netlify and Vercel include CDN automatically

## Troubleshooting

### Photos Not Loading
- Check file names match exactly (case-sensitive)
- Ensure photos are in the `photos/` folder
- Check browser console for errors

### RSVP Form Not Working
- Check browser console for errors
- Verify form fields have `name` attributes
- Test localStorage is enabled in browser

### Styling Issues
- Clear browser cache
- Check CSS file is linked correctly
- Verify font files are loading

## Support

For issues or questions, check:
- Browser console for errors
- Network tab for failed requests
- Ensure all files are uploaded correctly

---

**Ready to go live!** 🎉
