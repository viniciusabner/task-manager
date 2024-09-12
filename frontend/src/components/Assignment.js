import React, { useState } from "react";

const Assignment = ({ members, tasks, assignTask }) => {
  const [assignment, setAssignment] = useState({ memberId: "", taskId: "" });

  const handleChange = (e) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    assignTask(assignment);
  };

  return (
    <div className="container mt-4">
      <h2>Atribuir Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Membro do Time</label>
          <select
            className="form-control"
            name="memberId"
            value={assignment.memberId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Tarefa</label>
          <select
            className="form-control"
            name="taskId"
            value={assignment.taskId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.description}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Atribuir Tarefa
        </button>
      </form>
    </div>
  );
};

export default Assignment;
