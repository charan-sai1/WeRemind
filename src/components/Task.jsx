import React from "react";
import PropTypes from "prop-types";
import EditIcon from "../img/editlogo.gif";

export default function Task(props) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "brown";
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "black";
    }
  };

  return (
    <div className="Task">
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={props.onSelect}
        className="task-checkbox"
      />
      <div style={{ width: "60%", display: "flex", justifyContent: "space-around", gap: "10px", alignItems: "center" }}>
        <h3>{props.title}</h3>
        <p className="description">{props.description}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly", gap: "10px", alignItems: "center", width: "40%" }}>
        <p className="priority" style={{ color: getPriorityColor(props.priority) }}>{props.priority}</p>
        <div className="status">
          <div className="status-circle" style={{ backgroundColor: props.status ? "green" : "orange" }}></div>
          <p>{props.status ? "Completed" : "Pending"}</p>
        </div>
      </div>
      <img src={EditIcon} alt="Edit" className="task-edit-button" onClick={props.onEdit} />
    </div>
  );
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired, // handler for the edit event
  isSelected: PropTypes.bool.isRequired, // whether the task is selected
  onSelect: PropTypes.func.isRequired, // handler for the select event
};
