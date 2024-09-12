const { db } = require("../firebaseConfig");

// Adicionar Tarefa
const addTask = async (req, res) => {
  try {
    const { name, description, deadline, priority, estimatedTime } = req.body;
    const task = { name, description, deadline, priority, estimatedTime };

    await db.collection("tasks").add(task);
    res.status(201).send("Tarefa adicionada com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Listar Tarefas
const getTasks = async (req, res) => {
  try {
    const snapshot = await db.collection("tasks").get();
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Atualizar Tarefa
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, deadline, priority, estimatedTime } = req.body;

    await db
      .collection("tasks")
      .doc(id)
      .update({ name, description, deadline, priority, estimatedTime });
    res.status(200).send("Tarefa atualizada com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Deletar Tarefa
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection("tasks").doc(id).delete();
    res.status(200).send("Tarefa deletada com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
};
