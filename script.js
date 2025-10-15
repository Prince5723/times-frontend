// Configuration
const API_CONFIG = {
    storiesUrl: 'https://times-backend-2fhb.onrender.com/getTimeStories',
    imagesUrl: 'https://times-backend-2fhb.onrender.com/getImages',
    fallbackImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&h=800&fit=crop'
};

const IMAGE_CREDITS = {
    center: 'Getty Images—Jacques Julien',
    left: 'Denver Post via Getty Images—Copyright · 2025 The Denver Post, MediaNews Group.',
    right: 'Photograph by Natalija Gormalova for TIME'
};

const AUTHORS = {
    left: 'by Rebecca Schneid',
    center: 'by Chantelle Lee',
    right: 'by Charlie Campbell / Kumasi, Ghana'
};

const CATEGORIES = ['POLITICS', 'WORLD', 'WORLD'];

// State
let storyImages = [];

// DOM Elements
const contentContainer = document.getElementById('content');

//Initialize the application
function init() {
    fetchData();
}

// Fetch stories and images from API
async function fetchData() {

    try {
        const [storiesResponse, imagesResponse] = await Promise.all([
            fetch(API_CONFIG.storiesUrl),
            fetch(API_CONFIG.imagesUrl)
        ]);
        
        if (!storiesResponse.ok || !imagesResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const stories = await storiesResponse.json();
        storyImages = await imagesResponse.json();
        
        displayStories(stories);
    } catch (error) {
        console.error('Error fetching data:', error);
        showError('Unable to load stories. Please check your connection.');
    }
}

// Get image URL for a story by index
function getImageForStory(index) {
    const imageMap = [0, 1, 2];
    const imageIndex = imageMap[index];
    return storyImages[imageIndex] || API_CONFIG.fallbackImage;
}

//Create HTML for the center featured story
function createCenterStory(story) {
    return `
        <div class="story-center">
            <a href="${escapeHtml(story.link)}" target="_blank" rel="noopener noreferrer">
                <img src="${escapeHtml(getImageForStory(0))}" alt="${escapeHtml(story.title)}" loading="lazy">
                <div class="story-center-content">
                    <div class="image-credit">${IMAGE_CREDITS.center}</div>
                    <h2 class="story-title-large">${escapeHtml(story.title)}</h2>
                    <div class="story-author">${AUTHORS.center}</div>
                </div>
            </a>
        </div>
    `;
}

// Create HTML for a side story
function createSideStory(story, position) {
    const imageIndex = position === 'left' ? 1 : 2;
    const credit = IMAGE_CREDITS[position];
    const author = AUTHORS[position];

    return `
        <div class="story-side">
            <a href="${escapeHtml(story.link)}" target="_blank" rel="noopener noreferrer">
                <img src="${escapeHtml(getImageForStory(imageIndex))}" alt="${escapeHtml(story.title)}" loading="lazy">
                <div class="image-credit">${credit}</div>
                <h2 class="story-title-side">${escapeHtml(story.title)}</h2>
                <div class="story-author">${author}</div>
            </a>
        </div>
    `;
}

// Create HTML for a bottom grid story
function createBottomStory(story, index) {
    const category = CATEGORIES[index] || 'NEWS';
    
    return `
        <div class="bottom-story">
            <a href="${escapeHtml(story.link)}" target="_blank" rel="noopener noreferrer">
                <div class="category-badge">${category}</div>
                <h3 class="bottom-story-title">${escapeHtml(story.title)}</h3>
            </a>
        </div>
    `;
}

// Display stories on the page
function displayStories(stories) {
    if (!stories || stories.length === 0) {
        showError('No stories available');
        return;
    }

    const [centerStory, leftStory, rightStory, ...bottomStories] = stories;
    let html = '<div class="main-grid">';

    // Center featured story
    if (centerStory) {
        html += createCenterStory(centerStory);
    }

    // Left side story
    if (leftStory) {
        html += createSideStory(leftStory, 'left');
    }

    // Right side story
    if (rightStory) {
        html += createSideStory(rightStory, 'right');
    }

    html += '</div>';

    // Bottom grid stories
    if (bottomStories.length > 0) {
        html += '<div class="bottom-grid">';
        bottomStories.slice(0, 3).forEach((story, index) => {
            html += createBottomStory(story, index);
        });
        html += '</div>';
    }

    contentContainer.innerHTML = html;
}

// Show error message
function showError(message) {
    contentContainer.innerHTML = `
        <div class="loading" role="alert">${escapeHtml(message)}</div>
    `;
}

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}