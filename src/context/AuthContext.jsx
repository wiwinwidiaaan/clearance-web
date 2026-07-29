import { createContext, useContext, useState } from "react";
import { api, saveToken, clearToken, hasToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("clearance_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(hasToken());

  async function login(email, password) {
    const data = await api.login({ email, password });
    saveToken(data.token);
    const userData = { email: data.email, fullName: data.fullName };
    localStorage.setItem("clearance_user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  }

  async function register(fullName, email, password) {
    const data = await api.register({ fullName, email, password });
    saveToken(data.token);
    const userData = { email: data.email, fullName: data.fullName };
    localStorage.setItem("clearance_user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  }

  function logout() {
    clearToken();
    localStorage.removeItem("clearance_user");
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
