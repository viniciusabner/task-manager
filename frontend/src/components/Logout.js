import React from "react";
import { logout } from "../services/auth";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logout();
      alert("Logout bem-sucedido!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default Logout;
