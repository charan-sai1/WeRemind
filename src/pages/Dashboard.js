import React, { useState, useEffect, useCallback } from 'react';
import DashNav from '../components/DashNav';
import BorderInputBox from '../components/BorderInput';
import BlackButton from '../components/BlackButton';
import { getCurrentUserId, addTask, getTasks, editTask, deleteTask } from './firebase'; // Ensure the correct import path
import Task from '../components/Task';
import TaskDue from '../components/TaskDue';
import EditOverlay from '../components/Editoverlay';
import TaskStats from '../components/TaskStats'; // Import the TaskStats component

function Dashboard() {
    const [seeMore, setMore] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Low");
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [dueTasks, setDueTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [editOverlayPosition, setEditOverlayPosition] = useState({ top: 0, left: 0 });

    const formatDueDate = (dueDate) => {
        const date = new Date(dueDate);
        const options = { day: 'numeric', month: 'short' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
        return `${formattedDate}, ${formattedTime}`;
    };

    const filterDueTasks = useCallback((tasks) => {
        const currentDate = new Date();
        const filteredTasks = tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            const timeDiff = dueDate - currentDate;
            const daysDiff = timeDiff / (1000 * 3600 * 24);
            return task.priority === "Urgent" || (daysDiff <= 3 && daysDiff >= 0);
        }).map(task => ({
            ...task,
            formattedDueDate: formatDueDate(task.dueDate)
        }));
        setDueTasks(filteredTasks);
    }, []);

    useEffect(() => {
        getTasks(getCurrentUserId(), (tasks) => {
            setTasks(tasks);
            filterDueTasks(tasks);
        });
    }, [filterDueTasks]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic here
        try {
            if (!title || !description || !dueDate || priority === undefined) {
                console.log(title, description, dueDate, priority)
                throw new Error("All task properties must be defined");
            }

            const newTask = {
                title: title,
                description: description,
                dueDate: dueDate,
                status: false,
                priority: priority,
                createdAt: new Date().toISOString()
            };
            addTask(getCurrentUserId(), newTask.title, newTask.description, newTask.dueDate, newTask.status, newTask.priority); // Pass userId and newTask properties
            console.log("Task Created Successfully");
            // Reset form fields
            setTitle("");
            setDescription("");
            setDueDate("");
            setMore(false);
            setPriority("Medium");
            getTasks(getCurrentUserId(), (tasks) => {
                setTasks(tasks);
                filterDueTasks(tasks);
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleTaskSelect = (taskId) => {
        setSelectedTasks((prevSelectedTasks) =>
            prevSelectedTasks.includes(taskId)
                ? prevSelectedTasks.filter((id) => id !== taskId)
                : [...prevSelectedTasks, taskId]
        );
    };

    const handleDeleteTasks = () => {
        selectedTasks.forEach((taskId) => {
            deleteTask(getCurrentUserId(), taskId);
        });
        setSelectedTasks([]);
        getTasks(getCurrentUserId(), (tasks) => {
            setTasks(tasks);
            filterDueTasks(tasks);
        }); // Refresh tasks after deletion
    };

    const handleMarkAsCompleteOrPending = () => {
        selectedTasks.forEach((taskId) => {
            const task = tasks.find(task => task.id === taskId);
            if (task) {
                editTask(getCurrentUserId(), taskId, { status: !task.status });
            }
        });
        setSelectedTasks([]);
        getTasks(getCurrentUserId(), (tasks) => {
            setTasks(tasks);
            filterDueTasks(tasks);
        }); // Refresh tasks after status change
    };

    const isAnyTaskCompleted = selectedTasks.some(taskId => {
        const task = tasks.find(task => task.id === taskId);
        return task && task.status;
    });

    const handleEditTask = (task, event) => {
        const rect = event.target.getBoundingClientRect();
        setEditOverlayPosition({ top: rect.top, left: rect.right });
        setEditingTask(task); // Ensure all task values are retrieved
    };

    const handleSaveTask = async (updatedTask) => {
        if (!editingTask.id) {
            console.error("Task ID is missing");
            return;
        }
        await editTask(updatedTask);
        setEditingTask(null);
        getTasks(getCurrentUserId(), (tasks) => {
            setTasks(tasks);
            filterDueTasks(tasks);
        }); // Refresh tasks after editing
    };

    const completedTasks = tasks.filter(task => task.status).length;
    const pendingTasks = tasks.filter(task => !task.status).length;
    const delayedTasks = tasks.filter(task => new Date(task.dueDate) < new Date() && !task.status).length;

    return (
        <div className="dashboard-page">
            <DashNav />
            <h1 className='Manage-TItle'>Manage Your Tasks</h1>
            <div className="CreateTask">
                <h3>Create Task</h3>
                <form onSubmit={handleSubmit} className='showmore-contaier'>
                    <div className='inputsboxes'>
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
                        {seeMore && (
                            <select
                                placeholder="Priority"
                                className='select-priority'
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="Urgent">Urgent</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        )}
                    </div>
                    <p onClick={() => setMore(!seeMore)}>{seeMore ? 'Show Less' : 'Show More'}</p>
                    <BlackButton type="submit">Create Task</BlackButton>
                </form>
            </div>
            <div style={{ margin: "0 2.5%", display: "flex", gap: "10px", width: "95%", justifyContent: "center" }}>
                <div className="Tasks">
                    <div className="TasksHeader">
                        <h3>Tasks</h3>
                        {selectedTasks.length > 0 && (
                            <div className='buttonbox' style={{ display: "flex", gap: "2px", justifyContent: "center", alignItems: "center" }}>
                                <button className='ChangeButtons' onClick={handleMarkAsCompleteOrPending}>
                                    {isAnyTaskCompleted ? "Mark as Pending" : "Mark as Complete"}
                                </button>
                                <button className='ChangeButtons delete' onClick={handleDeleteTasks}>Delete</button>
                            </div>
                        )}
                    </div>
                    <div className="tasks-container">
                        {tasks && tasks.map(task => (
                            <Task
                                key={task.id}
                                taskId={task.id} // Pass taskId to Task component
                                priority={task.priority}
                                title={task.title}
                                description={task.description}
                                status={task.status}
                                isSelected={selectedTasks.includes(task.id)}
                                onSelect={() => handleTaskSelect(task.id)}
                                onEdit={(event) => handleEditTask(task, event)}
                            />
                        ))}
                    </div>
                </div>
                <div className='row2'>
                    <div className="Due">
                        <h3>Action Needed</h3>
                        {dueTasks.length > 0 ? (
                            dueTasks.map(task => (
                                <TaskDue
                                    key={task.id}
                                    title={task.title}
                                    dueDate={task.formattedDueDate}
                                    priority={task.priority}
                                />
                            ))
                        ) : (
                            <p className='noAction'>There aren't any urgent works and we have more than 3 days to due dates.</p>
                        )}
                    </div>
                    <TaskStats
                        totalTasks={tasks.length}
                        completedTasks={completedTasks}
                        pendingTasks={pendingTasks}
                        delayedTasks={delayedTasks}
                    />
                    {editingTask && <h1>{editingTask.id}</h1>}
                </div>
            </div>
            {editingTask && (
                <EditOverlay
                    taskId={editingTask.id}
                    title={editingTask.title}
                    description={editingTask.description}
                    dueDate={editingTask.dueDate}
                    onSave={handleSaveTask}
                    onClose={() => setEditingTask(null)}
                    position={editOverlayPosition}
                />
                
            )}
        </div>
    );
}

export default Dashboard;
