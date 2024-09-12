import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container mt-4">
      <h1>Bem-vindo à Gestão de Tarefas</h1>
      <p>Faça login ou registre-se para continuar.</p>
      <div className="mt-3">
        <button className="btn btn-primary me-3" onClick={handleLogin}>
          Login
        </button>
        <button className="btn btn-secondary" onClick={handleRegister}>
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Home;
