const { db } = require("../firebaseConfig");

// Atribuir Tarefa a Membro
const assignTask = async (req, res) => {
  try {
    const { taskId, memberId } = req.body;

    // Obter o nome do membro atribuído
    const memberRef = db.collection("teamMembers").doc(memberId);
    const memberDoc = await memberRef.get();
    const memberData = memberDoc.data();

    // Atualizar a tarefa com o ID e nome do membro atribuído
    await db
      .collection("tasks")
      .doc(taskId)
      .update({
        assignedTo: { id: memberId, name: memberData.name },
      });

    res.status(200).send("Tarefa atribuída ao membro com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  assignTask,
};
