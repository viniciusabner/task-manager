import axios from "axios";

const API_URL = "http://localhost:3080/api";

export const addMember = async (member) => {
  try {
    const response = await axios.post(`${API_URL}/members`, member);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar membro:", error);
    throw error;
  }
};

export const getMembers = async () => {
  try {
    const response = await axios.get(`${API_URL}/members`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar membros:", error);
    throw error;
  }
};

export const updateMember = async (id, updatedMember) => {
  try {
    const response = await axios.put(`${API_URL}/members/${id}`, updatedMember);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar membro:", error);
    throw error;
  }
};

export const deleteMember = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/members/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar membro:", error);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    throw error;
  }
};

export const updateTask = async (id, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    throw error;
  }
};

export const assignTask = async (assignment) => {
  try {
    const response = await axios.post(`${API_URL}/assign`, assignment);
    return response.data;
  } catch (error) {
    console.error("Erro ao atribuir tarefa:", error);
    throw error;
  }
};

export const getTasksByMember = async (memberId) => {
  try {
    const response = await axios.get(`${API_URL}/members/${memberId}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar tarefas por membro:", error);
    throw error;
  }
};

export const getMembersWithAllocatedHours = async () => {
  try {
    const response = await axios.get(`${API_URL}/members-with-hours`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar membros com horas alocadas:", error);
    throw error;
  }
};
