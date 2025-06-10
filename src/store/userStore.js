let currentUser = null;

export function setUser(utilisateurs) {
  currentUser = utilisateurs;
}

export function getUser() {
  return currentUser;
}

export function isAuthenticated() {
  return !!currentUser;
}

// let utilisateurs = null;

// export function setUser(utilisateurs) {
//   utilisateurs = utilisateurs;
//   localStorage.setItem("user", JSON.stringify(utilisateurs));
// }

// export function getUser() {
//   if (utilisateurs) return utilisateurs;
//   const fromStorage = localStorage.getItem("user");
//   if (fromStorage) {
//     utilisateurs = JSON.parse(fromStorage);
//     return utilisateurs;
//   }
//   return null;
// }

// export function isAuthenticated() {
//   return getUser() !== null;
// }

// export function logout() {
//   localStorage.removeItem("user");
//   utilisateurs = null;
// }
