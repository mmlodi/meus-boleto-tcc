const API_URL = process.env.REACT_APP_JAVA_APP_API_BACKEND_URL; // Replace with your actual API URL


const request = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    // Add any other headers here, e.g., Authorization tokens
  };

  const config = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export const api = {
  get: (endpoint) => request(endpoint, 'GET'),
  post: (endpoint, body) => request(endpoint, 'POST', body),
  put: (endpoint, body) => request(endpoint, 'PUT', body),
  delete: (endpoint) => request(endpoint, 'DELETE'),
};
