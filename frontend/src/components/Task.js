import React, { useState, useEffect } from "react";
import { addTask, updateTask, getMembers } from "../services/api";
import TaskList from "./TaskList";
import Header from "./Header";

const Task = () => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    deadline: "",
    priority: "",
    estimatedTime: "",
    assignedTo: "",
  });

  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await getMembers();
      setMembers(response);
    } catch (error) {
      console.error("Erro ao carregar membros:", error);
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task.id) {
        await updateTask(task.id, task);
      } else {
        await addTask(task);
      }
      setTask({
        name: "",
        description: "",
        deadline: "",
        priority: "",
        estimatedTime: "",
        assignedTo: "",
      });
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>{task.id ? "Editar Tarefa" : "Cadastro de Tarefas"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={task.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={task.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Prazo</label>
            <input
              type="date"
              className="form-control"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Prioridade</label>
            <select
              className="form-control"
              name="priority"
              value={task.priority}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tempo Estimado (horas)</label>
            <input
              type="number"
              className="form-control"
              name="estimatedTime"
              value={task.estimatedTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Atribuir Membro</label>
            <select
              className="form-control"
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um membro</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {task.id ? "Atualizar Tarefa" : "Adicionar Tarefa"}
          </button>
        </form>

        <TaskList />
      </div>
    </>
  );
};

export default Task;
