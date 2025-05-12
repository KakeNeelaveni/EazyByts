document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const user = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    name:document.getElementById('name').value,
    email:document.getElementById('email').value
  };

  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(user)
    });

    if (!response.ok) throw new Error("Registration failed");

    alert("Registration successful");
    window.location.href = "index.html";
  } catch (err) {
    alert("Registration failed: " + err.message);
  }
});
