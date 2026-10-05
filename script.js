

import { getUserIds } from "./storage.js";

window.onload = function () {
  const users = getUserIds();
  document.querySelector("body").innerText = `There are ${users.length} users`;
};
