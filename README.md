# TIME Magazine Frontend

**Production link:** https://times-frontend.netlify.app/

A responsive, modern web application that displays TIME magazine's latest stories and articles. Built with vanilla HTML, CSS, and JavaScript, featuring a clean design that closely matches TIME's official website.

## 🎨 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, magazine-style layout with TIME branding
- **Dynamic Content**: Fetches latest stories and images from the backend API
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- **Performance**: Lazy loading images and optimized CSS
- **Interactive Elements**: Hover effects and smooth transitions

## 📁 Project Structure

```
frontend/
├── index.html         # Main HTML file
├── style.css          # All styling and responsive design
├── script.js          # JavaScript functionality and API integration
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Backend API running (see backend README)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd times/frontend
   ```

2. **Open in browser**
   ```bash
   open index.html
   ```


## 🎯 API Configuration

The frontend connects to the backend API. Update the API endpoints in `script.js`:

```javascript
const API_CONFIG = {
    storiesUrl: 'https://times-backend-2fhb.onrender.com/getTimeStories',
    imagesUrl: 'https://times-backend-2fhb.onrender.com/getImages',
    fallbackImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&h=800&fit=crop'
};
```

### For Local Development
```javascript
const API_CONFIG = {
    storiesUrl: 'http://localhost:3000/getTimeStories',
    imagesUrl: 'http://localhost:3000/getImages',
    fallbackImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&h=800&fit=crop'
};
```

### Core Features

1. **API Integration**
   ```javascript
   async function fetchData() {
       const [storiesResponse, imagesResponse] = await Promise.all([
           fetch(API_CONFIG.storiesUrl),
           fetch(API_CONFIG.imagesUrl)
       ]);
       // Process and display data
   }
   ```

2. **Dynamic Content Generation**
   - Creates HTML templates for different story types
   - Handles image fallbacks
   - Manages loading states

3. **Error Handling**
   - Network error handling
   - Fallback image support
   - User-friendly error messages

### Content Structure

- **Center Story**: Featured article with large image
- **Side Stories**: Left and right articles with smaller images
- **Bottom Stories**: Additional articles in grid format
- **Authors**: Displayed for all main stories
- **Image Credits**: Proper attribution
