import assert from "node:assert";
import test from "node:test";
import { sortBookmarks } from "./bookmarkDisplay.js";

test("sortBookmarks returns newest first without mutating input", () => {
  const oldest = { title: "oldest", createdAt: 10 };
  const newest = { title: "newest", createdAt: 30 };
  const middle = { title: "middle", createdAt: 20 };
  const input = [middle, oldest, newest];

  const sorted = sortBookmarks(input);

  assert.deepEqual(sorted, [newest, middle, oldest]);
  assert.deepEqual(input, [middle, oldest, newest]);
});
