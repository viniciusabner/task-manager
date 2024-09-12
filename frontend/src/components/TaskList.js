import React, { useState, useEffect } from "react";
import {
  getTasks,
  updateTask,
  deleteTask,
  assignTask,
  getMembers,
} from "../services/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    deadline: "",
    priority: "",
    estimatedTime: "",
    assignedTo: "",
  });

  useEffect(() => {
    loadTasks();
    loadMembers();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  const loadMembers = async () => {
    try {
      const response = await getMembers();
      setMembers(response);
    } catch (error) {
      console.error("Erro ao carregar membros:", error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditFormData({
      name: task.name,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority,
      estimatedTime: task.estimatedTime,
      assignedTo: task.assignedTo ? task.assignedTo.id : "",
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(editingTaskId, {
        ...editFormData,
        assignedTo: editFormData.assignedTo
          ? members.find((m) => m.id === editFormData.assignedTo)
          : null,
      });
      setEditingTaskId(null);
      loadTasks();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const handleAssignMember = async (taskId, memberId) => {
    try {
      await assignTask({ taskId, memberId });
      loadTasks();
    } catch (error) {
      console.error("Erro ao atribuir membro:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  console.log(tasks, 'tasks');
  

  return (
    <div className="container mt-4">
      <h3>Lista de Tarefas</h3>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            {editingTaskId === task.id ? (
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label>Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Descrição</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Prazo</label>
                  <input
                    type="date"
                    className="form-control"
                    name="deadline"
                    value={editFormData.deadline}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Prioridade</label>
                  <select
                    className="form-control"
                    name="priority"
                    value={editFormData.priority}
                    onChange={handleEditChange}
                    required
                  >
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
                    value={editFormData.estimatedTime}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Atribuir Membro</label>
                  <select
                    className="form-control"
                    name="assignedTo"
                    value={editFormData.assignedTo}
                    onChange={handleEditChange}
                  >
                    <option value="">Selecione um membro</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-success mt-2">
                  Salvar
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mt-2 ms-2"
                  onClick={() => setEditingTaskId(null)}
                >
                  Cancelar
                </button>
              </form>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Nome: </strong> {task.name} <br />
                  <strong>Descrição: </strong> {task.description} <br />
                  <strong>Prazo: </strong>{" "}
                  {new Date(task.deadline).toLocaleDateString()} <br />
                  <strong>Prioridade: </strong> {task.priority} <br />
                  <strong>Tempo Estimado: </strong> {task.estimatedTime} horas{" "}
                  <br />
                  <strong>Membro Atribuído: </strong>{" "}
                  {task.assignedTo ? task.assignedTo.name : "Nenhum"}
                </div>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(task)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
