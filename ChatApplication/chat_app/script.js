document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const sendBtn = document.getElementById("sendBtn");
    const chatBox = document.getElementById("chat-box");
  
    // Placeholder for user session (replace with real auth later)
    let username = "";
  
    registerBtn.addEventListener("click", () => {
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
      alert(`Register clicked\nUsername: ${user}\nPassword: ${pass}`);
      // TODO: Call backend API to register
    });
  
    loginBtn.addEventListener("click", () => {
      username = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
      alert(`Login clicked\nUsername: ${username}`);
      // TODO: Call backend API to authenticate
    });
  
    sendBtn.addEventListener("click", () => {
      const message = document.getElementById("messageInput").value;
      if (message.trim() === "") return;
  
      const msgDiv = document.createElement("div");
      msgDiv.textContent = `${username || "You"}: ${message}`;
      chatBox.appendChild(msgDiv);
      document.getElementById("messageInput").value = "";
  
      // TODO: Send message via WebSocket
    });
  });
  