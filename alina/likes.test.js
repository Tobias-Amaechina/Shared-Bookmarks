import assert from "node:assert";
import test from "node:test";
import { getLikeCount, likeBookmark } from "./likes.js";

const storage = new Map();

global.localStorage = {
  getItem(key) {
    return storage.get(key) || null;
  },

  setItem(key, value) {
    storage.set(key, value);
  },

  removeItem(key) {
    storage.delete(key);
  },
};

test("likeBookmark increases the like count", () => {
  storage.clear();

  const bookmark = {
    url: "https://example.com",
    title: "Example",
    description: "An example bookmark",
    createdAt: 1000,
  };

  assert.equal(getLikeCount(bookmark), 0);

  assert.equal(likeBookmark(bookmark), 1);
  assert.equal(getLikeCount(bookmark), 1);

  assert.equal(likeBookmark(bookmark), 2);
  assert.equal(getLikeCount(bookmark), 2);
});

test("different bookmarks have independent like counts", () => {
  storage.clear();

  const bookmarkOne = {
    url: "https://example.com/one",
    title: "One",
    description: "First bookmark",
    createdAt: 1000,
  };

  const bookmarkTwo = {
    url: "https://example.com/two",
    title: "Two",
    description: "Second bookmark",
    createdAt: 2000,
  };

  likeBookmark(bookmarkOne);
  likeBookmark(bookmarkOne);
  likeBookmark(bookmarkTwo);

  assert.equal(getLikeCount(bookmarkOne), 2);
  assert.equal(getLikeCount(bookmarkTwo), 1);
});
