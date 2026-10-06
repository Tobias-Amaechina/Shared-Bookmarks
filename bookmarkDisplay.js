/**
 * Bookmark Display Module
 *
 * This module handles the display of bookmarks with the following features:
 * 1. Displays bookmarks in reverse chronological order (newest first)
 * 2. Shows title, description, and created timestamp for each bookmark
 * 3. Makes the title a clickable link to the bookmark's URL
 *
 * All existing functionality is preserved and integrated seamlessly.
 */

/**
 * Format a timestamp into a human-readable date string
 * @param {number} timestamp - JavaScript timestamp in milliseconds
 * @returns {string} Formatted date string
 */
function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

/**
 * Display bookmarks sorted in reverse chronological order
 * @param {Array} bookmarks - Array of bookmark objects
 * @param {HTMLElement} container - Container element to render bookmarks into
 */
export function displayBookmarks(bookmarks, container) {
  // Sort bookmarks in reverse chronological order (newest first)
  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    return (b.createdAt || 0) - (a.createdAt || 0);
  });

  // Clear existing content
  container.innerHTML = "";

  // Render each bookmark
  sortedBookmarks.forEach((bookmark) => {
    const bookmarkElement = createBookmarkElement(bookmark);
    container.appendChild(bookmarkElement);
  });
}

/**
 * Create a bookmark DOM element with all required information
 * @param {Object} bookmark - Bookmark object containing url, title, description, and createdAt
 * @returns {HTMLElement} The bookmark element
 */
function createBookmarkElement(bookmark) {
  const bookmarkElement = document.createElement("div");
  bookmarkElement.className = "bookmark-item";
  bookmarkElement.style.cssText = `
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 12px;
    background-color: #f9f9f9;
  `;

  // Create title as a clickable link
  const titleLink = document.createElement("a");
  titleLink.href = bookmark.url;
  titleLink.textContent = bookmark.title;
  titleLink.target = "_blank";
  titleLink.rel = "noopener noreferrer";
  titleLink.style.cssText = `
    color: #0066cc;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
  `;
  titleLink.onmouseover = () => (titleLink.style.textDecoration = "underline");
  titleLink.onmouseout = () => (titleLink.style.textDecoration = "none");

  const titleHeading = document.createElement("h3");
  titleHeading.style.margin = "0 0 8px 0";
  titleHeading.appendChild(titleLink);

  // Create description
  const description = document.createElement("p");
  description.textContent = bookmark.description;
  description.style.cssText = `
    color: #555;
    margin: 8px 0;
    line-height: 1.5;
  `;

  // Create timestamp
  const timestamp = document.createElement("p");
  timestamp.textContent = `Created: ${formatDate(bookmark.createdAt)}`;
  timestamp.style.cssText = `
    color: #999;
    font-size: 12px;
    margin: 8px 0 0 0;
  `;

  // Append all elements to the bookmark container
  bookmarkElement.appendChild(titleHeading);
  bookmarkElement.appendChild(description);
  bookmarkElement.appendChild(timestamp);

  return bookmarkElement;
}

/**
 * Get bookmarks for a specific user
 * @param {string} userId - The user ID
 * @returns {Array} Array of bookmark objects, or empty array if none exist
 */
export function getBookmarksForUser(userId) {
  const stored = localStorage.getItem(`stored-data-user-${userId}`);
  return stored ? JSON.parse(stored) : [];
}
