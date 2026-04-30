import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkAuth, createNewUser, login } from '../Service/authAPI'; // Assuming checkAuth is for token validation with backend
import i18n from '../i18n';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        const storedUser = JSON.parse(localStorage.getItem("userInfo"));

        const validateAuthentication = async () => {
            if (token) {

                // TODO: Validate token with the backend
                console.log("AuthContext: ", token);
                
                // For example, you could use an API call here to validate the token:
                // const validToken = await checkAuth(hasToken); (Assuming `checkAuth` does that)
                const validToken = await checkAuth(token); // Mocked token validation for now
                console.log("Token JWT is valid? ",validToken);

                if (validToken) {
                    setIsAuthenticated(true);
                    setUser({id: storedUser.id,username: storedUser.username, email: storedUser.email});
                } else {
                    SignOut();
                }
            }
        }

        validateAuthentication();

        setLoading(false); // Loading is complete after checking token

    }, []);

    const SignIn = async (username, password) => {
        try {
            const response = await login(username, password); // Wait for API response
            console.log(response);

            if (response.token) {
                localStorage.setItem('jwt', response.token); // Save JWT to localStorage
                setUser({id: response.id,username: response.username, email: response.email}); // Set user details
                localStorage.setItem('userInfo', JSON.stringify({id: response.id,username: response.username, email: response.email}));
                setIsAuthenticated(true); // Set user as authenticated
                return null;
            } else {
                return i18n.t('auth.invalidCredentials'); // User not found or invalid credentials
            }
        } catch (error) {
            console.error('SignIn error:', error);
            return i18n.t('auth.signInError'); // Handle login error
        }
    };

    const SignUp = async (userName, senha, email) => {
        try {
            const response = await createNewUser(userName, senha, email);

            if (response.id) {
                console.log("AuthContext: usuário criado id: ",response.id, "userName:",response.userName)
                return response;
            } else {
                return i18n.t('auth.signUpError'); // User not found or invalid credentials
            }
        } catch (error) {
            console.error('SignUp error:', error);
            return i18n.t('auth.signUpException');  // Handle login error
        }
    };

    const SignOut = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, SignIn, SignUp, SignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
