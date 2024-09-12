const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "seu-email@gmail.com",
    pass: "sua-senha",
  },
});

exports.checkTaskDeadlines = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context) => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    const tasksSnapshot = await admin
      .firestore()
      .collection("tasks")
      .where("deadline", ">=", now)
      .where("deadline", "<=", tomorrow)
      .get();

    const tasks = tasksSnapshot.docs.map((doc) => doc.data());

    for (const task of tasks) {
      if (task.assignedTo && task.assignedTo.email) {
        const mailOptions = {
          from: "seu-email@gmail.com",
          to: task.assignedTo.email,
          subject: `Lembrete: Tarefa "${task.name}" próxima do prazo`,
          text: `A tarefa "${task.name}" está próxima do prazo. Lembre-se de completá-la antes de ${task.deadline}.`,
        };

        await transporter.sendMail(mailOptions);
      }
    }

    return null;
  });
