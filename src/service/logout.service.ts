export async function logout() {
  await fetch(`http://localhost:5000/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "/login";
}
