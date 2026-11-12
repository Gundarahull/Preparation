import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Dashboard</div>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        {" "}
        Logout
      </button>
    </>
  );
};

export default Dashboard;
