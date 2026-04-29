const API_URL = import.meta.env.VITE_JAVA_APP_API_BACKEND_URL;
const token = localStorage.getItem('jwt');

// Login Function
export const login = async (username, password) => {
    try {
        const response = await fetch(API_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            
            if (data.token) {                
                return data; // return user info (if needed)
            } else {
                console.error('No token found in the response');
                return { error: 'No token found' };
            }
        } else {
            const errorData = await response.json();
            console.error('Login failed', errorData);
            return { error: 'Login failed', details: errorData };
        }
    } catch (error) {
        console.error('An error occurred during login:', error);
        return { error: 'An unexpected error occurred', details: error.message };
    }
};

export const createNewUser = async (username, senha, email) => {
    try {
        const response = await fetch(API_URL + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: username,
                senha: senha,
                email: email
            }),
        });

        if (response.ok) {
            const data = await response.json();
            
            if (data) {                
                return data; // return user info (if needed)
            } else {
                console.error('No token found in the response');
                return { error: 'No token found', details: 'No token found in the response' };
            }
        } else {
            const errorData = await response.json();
            console.error('User Creation failed', errorData);
            return { error: 'User Creation failed', details: errorData };
        }
    } catch (error) {
        console.error('An error occurred during login:', error);
        return { error: 'An unexpected error occurred', details: error.message };
    }
};

// Check Authentication Function
export const checkAuth = async (token) => {

    try {
        const response = await fetch(API_URL + '/auth/verify-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the JWT token for verification
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        console.log(response)
        if (response.ok) {
            return true;
        } else {
            const errorData = await response.json();
            console.error('Token verification failed', errorData);
            return false;
        }
    } catch (error) {
        console.error('An error occurred during token verification:', error);
        return false;
    }
};

// Logout Function
export const logout = async () => {
    try {
        const response = await fetch(API_URL + '/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the JWT token for logout (if needed)
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            localStorage.removeItem('jwt'); // Clear the JWT from local storage on successful logout
            localStorage.removeItem('userinfo'); // Clear the JWT from local storage on successful logout
            return { success: true };
        } else {
            const errorData = await response.json();
            console.error('Logout failed', errorData);
            return { success: false, error: 'Logout failed', details: errorData };
        }
    } catch (error) {
        console.error('An error occurred during logout:', error);
        return { success: false, error: 'An unexpected error occurred', details: error.message };
    }
};
