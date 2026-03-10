# Premium Portfolio Website

A modern, sophisticated portfolio website with a focus on aesthetics, performance, and user experience. This portfolio features custom animations, a cohesive color system, and responsive design.

## Features

- **Modern Design**: Clean aesthetic with sophisticated typography and spacing
- **Interactive Elements**: Custom cursor, hover effects, and scroll animations
- **Responsive Layout**: Optimized for all device sizes
- **Performance Optimized**: Lightweight and fast loading
- **Accessibility Focused**: WCAG compliant with reduced motion support
- **Customizable**: Easy to customize colors, fonts, and content
- **Background-Integrated Media**: Images and videos that merge seamlessly with design
- **Reference Links**: A curated section for useful development resources and project references.
- **Enhanced Visual Depth**: Multi-layered visual effects with proper content legibility
- **Content-Friendly Overlays**: Ensuring text remains readable over media backgrounds

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with design tokens
├── script.js           # Interactive JavaScript
├── tokens.md           # Design system documentation
├── README.md           # This file
└── assets/             # Optional assets folder
    ├── images/         # Project images
    └── icons/          # Icon files
```

## Color Palette

- **Primary**: `#8A2BE2` (Vibrant Purple)
- **Secondary**: `#00D4FF` (Bright Cyan)
- **Accent**: `#FF6B6B` (Coral)
- **Dark**: `#0F172A` (Deep Blue-Black)
- **Light**: `#F8FAFC` (Light Gray)
- **Gray**: `#94A3B8` (Muted Gray)

## Typography

- **Headings**: Space Grotesk (Bold geometric sans-serif)
- **Body**: Inter (Highly readable sans-serif)
- **Code**: JetBrains Mono (For technical text)

## Components

### Navigation
- Fixed header with backdrop blur
- Smooth scrolling to sections
- Active state highlighting

### Hero Section
- Staggered title animation
- Custom cursor effect
- Floating elements with animation
- Scroll indicator

### Project Cards
- Glass-morphism design
- Hover effects with elevation
- Featured project option
- Responsive grid layout
 
### Reference Links
- Categorized link cards for resources
- Clean grid layout with fade-in animations
- External link support with security best practices
 
### About Section
- Skills grid with category breakdown
- Process diagram with hover effects
- Detailed description

### Contact Form
- Validation for all fields
- Success and error messages
- Accessible form controls

### Background-Merged Imagery & Video
- Integrated image and video backgrounds that blend with design
- No frames, borders, or hard edges
- Maintained content legibility with overlays
- Responsive behavior for all media types

### Footer
- Minimal design with essential links
- Copyright information

## Customization

### Colors
Update CSS variables in `:root` to change the color scheme:

```css
:root {
  --primary: #YOUR_COLOR;
  --secondary: #YOUR_COLOR;
  --dark: #YOUR_COLOR;
}
```

### Typography
Change fonts by updating the font-family declarations:

```css
body {
  font-family: 'Your-Body-Font', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Your-Heading-Font', sans-serif;
}
```

### Content
- Update personal information in `index.html`
- Modify project details in the work section
- Change contact form action in `script.js`

## Accessibility

This portfolio follows accessibility best practices:

- Proper color contrast ratios (AA compliance)
- Semantic HTML structure
- Keyboard navigation support
- Focus indicators
- Reduced motion support
- Proper ARIA attributes

## Performance

### Optimization Techniques Used:
- CSS containment where appropriate
- Efficient animations using transforms and opacity
- Image lazy loading
- Minimal JavaScript
- Optimized font loading

### Loading Speed Tips:
- Compress images before adding to the project
- Use modern formats (WebP) when possible
- Minimize JavaScript where possible
- Use a CDN for production deployment

## Browser Support

- Chrome/Firefox latest versions
- Safari 14+
- Edge latest version
- Mobile Safari/Chrome

## Development

### Running Locally
1. Clone or download the repository
2. Open `index.html` in your browser
3. Customize as needed

### Adding Your Content
1. Update the hero section with your name and tagline
2. Add your projects to the work section
3. Update the about section with your information
4. Modify contact details in the contact section
5. Update social links in the footer

### Customization Tips
- Use the `tokens.md` file as a reference for color and spacing
- Maintain the same spacing scale when adding elements
- Keep animations subtle and purposeful
- Test on multiple devices before publishing

## Deployment

To deploy this portfolio:

1. Upload all files to your hosting provider
2. Ensure all paths are relative (no absolute paths)
3. Test functionality after deployment
4. Set up custom domain if needed

For GitHub Pages:
1. Push code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source (usually gh-pages branch or /root)
4. Your site will be available at `username.github.io/repository`

## Support

For issues or questions:
1. Check the browser console for errors
2. Ensure all file paths are correct
3. Verify HTML structure matches the example
4. Confirm CSS and JS files are linked properly

## Credits

- Design inspiration from modern portfolio examples
- Icons from system fonts or custom SVGs
- Fonts from Google Fonts: Space Grotesk and Inter

## License

This project is free to use and modify for personal and commercial purposes.