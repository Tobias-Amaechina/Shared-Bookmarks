


export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}


export function getData(userId) {
  return JSON.parse(localStorage.getItem(`stored-data-user-${userId}`));
}


export function setData(userId, data) {
  localStorage.setItem(`stored-data-user-${userId}`, JSON.stringify(data));
}


export function clearData(userId) {
  localStorage.removeItem(`stored-data-user-${userId}`);
}
