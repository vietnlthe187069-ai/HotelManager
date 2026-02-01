import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header"; 
import Footer from "../Footer/Footer";  


export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <Header user={user} role={user?.role} onLogout={handleLogout} />
      <div style={{ padding: 20 }}>
        <h2>Home (User)</h2>
        <p>Trang dành cho user/customer.</p>
      </div>
      <Footer />
    </>
  );
}