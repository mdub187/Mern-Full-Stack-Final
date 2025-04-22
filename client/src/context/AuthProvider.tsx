import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../utils/Auth"; // 👈 Import from new location

interface User {
  id: string;
  email: string;
  exp: number;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedUser: User = jwtDecode(token);
        if (decodedUser.exp * 1000 > Date.now()) {
          setUser(decodedUser);
          console.log("✅ User persisted:", decodedUser);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    try {
      const decodedUser: User = jwtDecode(token);
      localStorage.setItem("token", token);
      setUser(decodedUser);
      navigate("/home");
    } catch (error) {
      console.error("❌ Invalid login token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
