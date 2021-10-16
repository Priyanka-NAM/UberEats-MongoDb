export function getUserDetail() {
  return localStorage.getItem("jwtToken");
}

export function getToken() {
  return `${getUserDetail()}`;
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function isOwnerSignedIn() {
  const owner = getCurrentUser();
  if (owner && owner.is_owner === 1) return true;
  return false;
}

export function isUserSignedIn() {
  const user = getCurrentUser();
  if (user && user.is_owner === 0) return true;
  return false;
}
