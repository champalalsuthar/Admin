import React, { createContext, useState, useContext, useEffect } from "react";
import { verifyToken } from "../API/common/verifyToken";
import Loader2 from "../Admin/Components/Loader/Loader2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const verifyUserToken = async () => {
      const adminUser = localStorage.getItem("adminUser");
      const authToken = localStorage.getItem("AuthToken");
      if (adminUser && authToken) {
        try {
          const response = await verifyToken(authToken, adminUser);
          console.log("Token verification response:", response);
          setIsAuthenticated(true);
          setuserData(response.data);
          setRole(response.data.type);
        } catch (error) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("authUser");
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    verifyUserToken();
  }, []);

  const login = (user, token, userRole, userdata) => {
    localStorage.setItem("adminUser", user);
    localStorage.setItem("AuthToken", token);
    setuserData(userdata);
    sessionStorage.setItem("role", userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("AuthToken");
    setuserData(null);
    sessionStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          blockSize: "100vh",
          inlineSize: "100%",
          alignItems: "center",
        }}
      >
        <Loader2 />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, role, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
const styleSheet = document.createElement("style");

styleSheet.innerText = `
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}`;
document.head.appendChild(styleSheet);
