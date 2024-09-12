const { db } = require("../firebaseConfig");

// Adicionar Membro
const addMember = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const member = { name, email, role };

    await db.collection("teamMembers").add(member);
    res.status(201).send("Membro adicionado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Listar Membros
const getMembers = async (req, res) => {
  try {
    const snapshot = await db.collection("teamMembers").get();
    const members = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(members);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Atualizar Membro
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    await db.collection("teamMembers").doc(id).update(updatedData);
    res.status(200).send("Membro atualizado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Deletar Membro
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection("teamMembers").doc(id).delete();
    res.status(200).send("Membro deletado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Buscar todos os membros do time e calcular as horas alocadas
const getMembersWithAllocatedHours = async (req, res) => {
  try {
    const memberSnapshot = await db.collection("teamMembers").get();
    const members = memberSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const taskSnapshot = await db.collection("tasks").get();
    const tasks = taskSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const membersWithHours = members.map((member) => {
      const allocatedTasks = tasks.filter(
        (task) => task.assignedTo && task.assignedTo.id === member.id
      );
      const totalAllocatedHours = allocatedTasks.reduce(
        (sum, task) => sum + (task.estimatedTime || 0),
        0
      );

      return {
        ...member,
        allocatedHours: totalAllocatedHours,
      };
    });

    res.status(200).json(membersWithHours);
  } catch (error) {
    res
      .status(500)
      .send(
        "Erro ao buscar membros e calcular horas alocadas: " + error.message
      );
  }
};

module.exports = {
  addMember,
  getMembers,
  updateMember,
  deleteMember,
  getMembersWithAllocatedHours,
};
