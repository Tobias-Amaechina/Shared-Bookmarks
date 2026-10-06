/**
 * Bookmark Display Module
 *
 * This module handles the display of bookmarks with the following features:
 * 1. Displays bookmarks in reverse chronological order (newest first)
 * 2. Shows title, description, and created timestamp for each bookmark
 * 3. Makes the title a clickable link to the bookmark's URL
 * 4. Provides copy-to-clipboard functionality for each bookmark
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
 * Sort bookmarks in reverse chronological order (newest first)
 * @param {Array} bookmarks - Array of bookmark objects
 * @returns {Array} Sorted array without mutating the input
 */
export function sortBookmarks(bookmarks) {
  return [...bookmarks].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

/**
 * Display bookmarks sorted in reverse chronological order
 * @param {Array} bookmarks - Array of bookmark objects
 * @param {HTMLElement} container - Container element to render bookmarks into
 */
export function displayBookmarks(bookmarks, container) {
  // Sort bookmarks in reverse chronological order (newest first)
  const sortedBookmarks = sortBookmarks(bookmarks);

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

  // Create actions container
  const actionsContainer = document.createElement("div");
  actionsContainer.style.cssText = `
    margin-top: 12px;
    display: flex;
    gap: 8px;
    align-items: center;
  `;

  // Create copy button
  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.textContent = "Copy to clipboard";
  copyButton.style.cssText = `
    padding: 6px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  `;

  // Create copy status message (accessible live region)
  const copyStatus = document.createElement("span");
  copyStatus.setAttribute("role", "status");
  copyStatus.setAttribute("aria-live", "polite");
  copyStatus.style.cssText = `
    font-size: 13px;
    color: #28a745;
    margin-left: 8px;
    min-height: 20px;
  `;

  // Copy to clipboard handler
  copyButton.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(bookmark.url);
        copyStatus.textContent = "✓ Copied URL to clipboard";
        copyStatus.style.color = "#28a745";

        // Clear message after 2 seconds
        setTimeout(() => {
          copyStatus.textContent = "";
        }, 2000);
      } else {
        // Fallback for older browsers
        copyStatus.textContent = "✗ Copy not supported";
        copyStatus.style.color = "#dc3545";
      }
    } catch (err) {
      copyStatus.textContent = "✗ Unable to copy URL";
      copyStatus.style.color = "#dc3545";
    }
  });

  // Append all elements to the bookmark container
  bookmarkElement.appendChild(titleHeading);
  bookmarkElement.appendChild(description);
  bookmarkElement.appendChild(timestamp);
  actionsContainer.appendChild(copyButton);
  actionsContainer.appendChild(copyStatus);
  bookmarkElement.appendChild(actionsContainer);

  return bookmarkElement;
}
