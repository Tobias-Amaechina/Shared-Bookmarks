import assert from "node:assert";
import test from "node:test";
import { addBookmark } from "./bookmarkForm.js";
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

test("addBookmark adds a bookmark for the correct user", () => {
  storage.clear();

  const bookmark = {
    url: "https://example.com",
    title: "Example",
    description: "An example bookmark",
    createdAt: 1000,
  };

  const result = addBookmark("1", bookmark);

  assert.deepEqual(result, [bookmark]);

  assert.deepEqual(JSON.parse(storage.get("stored-data-user-1")), [bookmark]);
});
