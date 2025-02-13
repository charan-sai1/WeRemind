import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TaskStats = ({
  totalTasks,
  completedTasks,
  pendingTasks,
  delayedTasks,
}) => {
  const completedPercentage = (completedTasks / totalTasks) * 100;
  const pendingPercentage = (pendingTasks / totalTasks) * 100;
  const delayedPercentage = (delayedTasks / totalTasks) * 100;

  return (
    <div className="task-stats">
      <h3>Task Statistics</h3>
      <div className="Stats">
      <div className="stats-details">
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Pending Tasks: {pendingTasks}</p>
        <p>Delayed Tasks: {delayedTasks}</p>
      </div>
      <div className="progress-bar">
        <CircularProgressbarWithChildren
          value={100}
          styles={buildStyles({
            pathColor: "#E8E8E8",
            trailColor: "transparent",
          })}
        >
          <CircularProgressbarWithChildren
            value={completedPercentage}
            styles={buildStyles({
              pathColor: "green",
              trailColor: "transparent",
            })}
          >
            <CircularProgressbarWithChildren
              value={pendingPercentage}
              styles={buildStyles({
                pathColor: "orange",
                trailColor: "transparent",
              })}
            >
              <CircularProgressbarWithChildren
                value={delayedPercentage}
                styles={buildStyles({
                  pathColor: "red",
                  trailColor: "transparent",
                })}
              >
                <div style={{ fontSize: 12, marginTop: -5 }}>
                  <strong>{`${completedPercentage.toFixed(1)}%`}</strong>{" "}
                  Completed
                </div>
                <div style={{ fontSize: 12, marginTop: 5 }}>
                  <strong>{`${pendingPercentage.toFixed(1)}%`}</strong> Pending
                </div>
                <div style={{ fontSize: 12, marginTop: 5 }}>
                  <strong>{`${delayedPercentage.toFixed(1)}%`}</strong> Delayed
                </div>
              </CircularProgressbarWithChildren>
            </CircularProgressbarWithChildren>
          </CircularProgressbarWithChildren>
        </CircularProgressbarWithChildren>
      </div>
    </div>
    </div>
  );
};

export default TaskStats;
