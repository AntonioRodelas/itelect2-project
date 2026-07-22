const USERS_URL = "https://jsonplaceholder.typicode.com/users";
 
export async function fetchSampleUsers() {
  try {
    const res = await fetch(USERS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const users = await res.json();
    return users.map(({ id, name, email }) => ({ id, name, email }));
  } catch (err) {
    console.error("fetchSampleUsers error:", err.message);
    return [];
  } finally {
    console.log("fetchSampleUsers: done.");
  }
}
 
export function fetchSampleUsersPromise() {
  return fetch(USERS_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((users) => users.map(({ id, name, email }) => ({ id, name, email })))
    .catch((err) => {
      console.error("fetchSampleUsersPromise error:", err.message);
      return [];
    });
}
 