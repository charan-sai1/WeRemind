import React from "react";
import PropTypes from "prop-types";

export default function TaskDue(props) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "brown";
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "#2BFF3C";
      default:
        return "black";
    }
  };

  return (
    <div className="Task DueTAsk">
      <p>{props.title}</p>
      <div style={{ width: "60%", fontFamily: 'Lato',display: "flex", justifyContent: "flex-end",gap:"15px", alignItems: "center" }}>
        <p style={{ fontSize: "12px",  fontWeight: "400" }}>Complete by </p>
        <p style={{ fontWeight: "1000", color: getPriorityColor(props.priority) }}>{props.dueDate}</p>
      </div>
    </div>
  );
}

TaskDue.propTypes = {
  title: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired
};
