const express = require("express");
const teamMemberController = require("./controllers/teamMemberController");
const taskController = require("./controllers/taskController");
const assignmentController = require("./controllers/assignmentController");

const router = express.Router();

// Rotas de Membros
router.post("/members", teamMemberController.addMember);
router.get("/members", teamMemberController.getMembers);
router.put("/members/:id", teamMemberController.updateMember);
router.delete("/members/:id", teamMemberController.deleteMember);
router.get(
  "/members-with-hours",
  teamMemberController.getMembersWithAllocatedHours
);

// Rotas de Tarefas
router.post("/tasks", taskController.addTask);
router.get("/tasks", taskController.getTasks);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

// Rotas de Atribuições
router.post("/assign", assignmentController.assignTask);

module.exports = router;
