# Sri Amman Modern Rice Mill - Static Website

A modern, animated single-page website built with pure HTML, CSS, and JavaScript. Ready to host anywhere!

## Files Structure

```
amman/
├── index.html      # Main HTML file with all sections
├── styles.css      # All styling and animations
├── script.js       # JavaScript for interactivity
└── images/         # Place your images here
```

## Features

- ✅ Pure HTML, CSS, and JavaScript (no build process needed)
- ✅ Modern, attractive design with light green color scheme
- ✅ Smooth animations and transitions
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth scrolling navigation
- ✅ Image gallery with lightbox
- ✅ Contact form with validation
- ✅ Google Maps integration
- ✅ No dependencies to install

## How to Use

### Option 1: Open Directly
Simply open `index.html` in your web browser!

### Option 2: Local Server
For better testing (especially for form submissions), use a local server:

**Python:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx http-server
```

Then open `http://localhost:8000` in your browser.

### Option 3: Host Online
Upload all files to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any traditional web hosting (cPanel, FTP, etc.)

Just upload:
- `index.html`
- `styles.css`
- `script.js`
- `images/` folder (with your images)

## Adding Images

1. Add your images to the `images/` folder:
   - `mill-building.jpg`
   - `machinery.jpg`
   - `workers.jpg`
   - `rice-varieties.jpg`
   - `packaging.jpg`
   - `storage.jpg`

2. Update the gallery items in `index.html` to use actual images:
   ```html
   <img src="images/mill-building.jpg" alt="Rice mill building">
   ```

## Updating Social Media Links

Edit the social media links in `index.html` (in the footer section):
```html
<a href="YOUR_FACEBOOK_URL" class="social-link">
<a href="YOUR_INSTAGRAM_URL" class="social-link">
<a href="YOUR_YOUTUBE_URL" class="social-link">
```

## Customization

- **Colors**: Edit CSS variables in `styles.css` (lines 7-16)
- **Content**: Edit text directly in `index.html`
- **Animations**: Modify animation keyframes in `styles.css`
- **Form Submission**: Update form handler in `script.js` (line ~200)

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Contact Form

The contact form currently shows a success message. To actually send emails, you'll need to:
1. Set up a backend service (e.g., Formspree, EmailJS, or your own server)
2. Update the form submission handler in `script.js`

## License

© 2025 Sri Amman Modern Rice Mill. All Rights Reserved.

