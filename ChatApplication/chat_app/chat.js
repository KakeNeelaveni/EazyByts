const token = localStorage.getItem('token');
const sender = localStorage.getItem('username'); // stored during login
const receiver = 'all'; // or a specific user if implementing private chat

if (!token || !sender) {
  window.location.href = 'index.html';
}

const socket = new WebSocket("ws://localhost:8080/chat");

socket.onopen = () => {
  console.log("Connected to WebSocket");
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const msgDiv = document.createElement("div");
  msgDiv.className = message.sender === sender ? 'my-message' : 'other-message';
  msgDiv.textContent = `[${message.timestamp}] ${message.sender}: ${message.content}`;
  document.getElementById('chat-window').appendChild(msgDiv);
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};

socket.onerror = (event) => {
  console.error("WebSocket error:", event);
};

document.getElementById('sendMessageBtn').addEventListener('click', () => {
  const content = document.getElementById('message').value.trim();
  const receiver = document.getElementById('receiver').value.trim() || 'all';

  if (content && receiver) {
    const message = {
      sender,
      receiver,
      content,
      timestamp: new Date().toISOString()
    };
    socket.send(JSON.stringify(message));
    document.getElementById('message').value = '';
  }
});


document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'index.html';
});
