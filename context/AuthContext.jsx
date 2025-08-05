import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "MY_APP_TOKEN";
const API_URL = "https://biletesmart.ro/api";

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		token: null,
		isAuthenticated: false,
	});

	const register = async (email, password) => {
		try {
			const response = await fetch(`${API_URL}/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (response.ok) {
				setAuthState({
					token: data.token,
					isAuthenticated: true,
				});
			} else {
				throw new Error(data.message || "Registration failed");
			}
		} catch (error) {
			console.error("Error registering user:", error);
		}
	};

	const login = async (email, password) => {
		try {
			const response = await fetch(`${API_URL}/auth`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (response.ok) {
				setAuthState({
					token: data.token,
					isAuthenticated: true,
				});
				await SecureStore.setItemAsync(TOKEN_KEY, data.token);
			} else {
				throw new Error(data.message || "Login failed");
			}
		} catch (error) {
			console.error("Error logging in user:", error);
		}
	};

	const logout = async () => {
		setAuthState({
			token: null,
			isAuthenticated: false,
		});
		await SecureStore.deleteItemAsync(TOKEN_KEY);
	};

	return (
		<AuthContext.Provider value={{ register, login, logout, ...authState }}>
			{children}
		</AuthContext.Provider>
	);
};

/*
Example ideal backend response on login or register:
{
  "user": { "id": 123, "email": "alex@example.com" },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
*/
