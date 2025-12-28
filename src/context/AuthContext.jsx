import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // при загрузке приложения
  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }

  if (token) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${token}`;
  }

  setLoading(false);
}, []);

  const login = (userData) => {
  setUser(userData);

  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("token", userData.token);

   axios.defaults.headers.common[
    "Authorization"
  ] = `Token ${userData.token}`;
};

  const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);

}

