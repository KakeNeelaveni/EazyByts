document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const credentials = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };

  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials)
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', credentials.username); // ✅ Store username
    window.location.href = 'chat.html'; // ✅ Redirect
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});
