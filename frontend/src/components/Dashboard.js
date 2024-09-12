import React from "react";
import TaskList from "./TaskList";
import Header from "./Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="container mt-4">
        <TaskList />
      </div>
    </>
  );
};

export default Dashboard;
