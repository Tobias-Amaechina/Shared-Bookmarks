# Testing

## Five users in the dropdown

I tested the website and confirmed that the user dropdown contains five users.

- Tested manually in the browser.
- The dropdown uses `getUserIds()` from `storage.js`.

## Selecting a user

I selected different users from the dropdown and confirmed that the bookmarks displayed belong to the selected user.

- Tested manually in the browser.

## User with no bookmarks

I selected a user with no bookmarks and confirmed that the message:

"This user has no bookmarks yet."

is displayed.

- Tested manually in the browser.

## Reverse chronological order

I tested the website with bookmarks having different creation times and confirmed that the newest bookmark is displayed first.

- Tested manually in the browser.
- The `sortBookmarks()` function sorts bookmarks using their `createdAt` timestamp.

## Bookmark information

I tested that each bookmark displays:

- Title
- Description
- Created timestamp
- Link to the bookmark URL

- Tested manually in the browser.

## Bookmark title links to URL

I clicked bookmark titles and confirmed that they open the correct bookmark URL.

- Tested manually in the browser.

## Copy to clipboard

I tested the "Copy to clipboard" button.

- Tested manually in the browser.
- The button copies the bookmark URL to the clipboard.
- A status message is displayed after copying.

## Like counter

I tested that clicking the like button increases the like count.

- Unit tests in `likes.test.js`.
- The test checks that the count increases from 0 to 1 and then to 2.

## Independent like counters

I tested that different bookmarks have independent like counts.

- Unit tests in `likes.test.js`.
- The test creates two different bookmarks and checks that their counts are stored separately.

## Like persistence

I tested that like counts are stored in local storage.

- Unit tests in `likes.test.js`.
- Tested manually by refreshing the page and checking that the like count remains.

## Bookmark form

I tested the form with:

- URL input
- Title input
- Description input
- Submit button

- Tested manually in the browser.
- All fields are required.

## Adding a bookmark

I tested submitting the form with a new bookmark.

- Unit tests in `bookmarkForm.test.js`.
- The test checks that `addBookmark()` adds the bookmark for the correct user.

## Bookmark added to the correct user

I selected a user, added a bookmark, and confirmed that the bookmark appeared for that user.

- Tested manually in the browser.
- Unit test in `bookmarkForm.test.js`.

## Updated bookmark list

After submitting a new bookmark, I confirmed that the updated bookmark list is displayed and includes the new bookmark.

- Tested manually in the browser.

## Data persistence

I refreshed the page and confirmed that the bookmark data remains available.

- Tested manually in the browser.
- The project uses the supplied `storage.js` for bookmark data.

## Accessibility

I tested the website using Chrome Lighthouse in Desktop mode.

I checked:

- Form labels
- Keyboard navigation
- Visible keyboard focus
- User dropdown accessibility
- Button accessibility
- Text and background contrast
- Status messages

Lighthouse Accessibility score: **100%**

## Automated tests

I ran `npm test`.

Result:

- 3 tests passed
- 0 tests failed

The tests are:

- `bookmarkForm.test.js` — tests that a bookmark is added for the correct user.
- `likes.test.js` — tests that likes increase.
- `likes.test.js` — tests that different bookmarks have independent like counts.
