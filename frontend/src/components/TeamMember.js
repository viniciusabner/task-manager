import React, { useState, useEffect } from "react";
import {
  addMember,
  getMembersWithAllocatedHours,
  updateMember,
  deleteMember,
} from "../services/api";
import Header from "./Header";

const TeamMember = () => {
  const [member, setMember] = useState({ name: "", email: "", role: "" });
  const [members, setMembers] = useState([]);
  const [editingMemberId, setEditingMemberId] = useState(null);

  useEffect(() => {
    loadMembersWithHours();
  }, []);

  const loadMembersWithHours = async () => {
    try {
      const response = await getMembersWithAllocatedHours();
      setMembers(response);
    } catch (error) {
      console.error("Erro ao carregar membros:", error);
    }
  };

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMemberId) {
        await updateMember(editingMemberId, member);
        setEditingMemberId(null);
      } else {
        await addMember(member);
      }
      setMember({ name: "", email: "", role: "" });
      loadMembersWithHours();
    } catch (error) {
      console.error("Erro ao salvar membro:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMember(id);
      loadMembersWithHours();
    } catch (error) {
      console.error("Erro ao excluir membro:", error);
    }
  };

  const handleEdit = (member) => {
    setMember({ name: member.name, email: member.email, role: member.role });
    setEditingMemberId(member.id);
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>Cadastro de Membro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={member.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={member.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Função</label>
            <input
              type="text"
              className="form-control"
              name="role"
              value={member.role}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {editingMemberId ? "Atualizar Membro" : "Adicionar Membro"}
          </button>
        </form>

        <h3 className="mt-5">Lista de Membros</h3>
        <ul className="list-group">
          {members.map((member) => (
            <li
              key={member.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>Nome: </strong> {member.name} <br />
                <strong>E-mail: </strong> {member.email} <br />
                <strong>Função: </strong> {member.role} <br />
                <strong>Horas Alocadas: </strong> {member.allocatedHours || 0}{" "}
                horas
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(member)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(member.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TeamMember;
