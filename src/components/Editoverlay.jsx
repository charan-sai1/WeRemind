import React, { useState, useEffect, useRef } from 'react';
import BorderInputBox from './BorderInput';
import { editTask } from '../pages/firebase'; // Import the editTask function
import BlackButton from './BlackButton';

const EditOverlay = ({ taskId, title: initialTitle, description: initialDescription, dueDate: initialDueDate, onSave, onClose, position }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.top = `${position.top}px`;
      overlayRef.current.style.left = `${position.left}px`;
    }
  }, [position]);

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedTask = { title, description, dueDate };
    await editTask(taskId, updatedTask); // Update the task in the database
    onSave(updatedTask);
    onClose();
  };

  return (
    <div className="edit-overlay" ref={overlayRef} style={{ position: 'absolute', display: 'block' }}>
      <div className="edit-overla-content">
        <div style={{width:"100%",display:'flex',justifyContent:"space-between"}}>
        <h3 style={{margin:"0"}}>Edit Task</h3>
        <button type="button" onClick={onClose}>Cancel</button>
        </div>
        <form onSubmit={handleSave}>
          <BorderInputBox
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <BorderInputBox
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <BorderInputBox
            type="datetime-local"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          
          <BlackButton type = "submit">Save</BlackButton>
        </form>
      </div>
    </div>
  );
};

export default EditOverlay;
