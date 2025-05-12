// api.js

const API_BASE_URL = 'http://localhost:8080/auth';

// Login function
export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Ensures cookies are sent with the request
    body: JSON.stringify(credentials),
  });

  // Check if response is successful
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  // Parse and return the JSON response if successful
  return await response.json();
}

// Register function
export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // This ensures cookies/session info is sent
    body: JSON.stringify(userData),
  });

  // Handle unsuccessful registration attempt
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  // Return response if successful
  return await response.json();
}
