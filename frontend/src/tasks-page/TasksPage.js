import React, {useEffect, useState} from 'react';
import {RiDeleteBinLine, RiEdit2Line, RiInformationLine} from 'react-icons/ri';
import "./TasksPage.css";
import Axios from "axios";
import {useCookies} from "react-cookie";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    useEffect(() => {
        Axios.get('http://localhost:5000/api/lists', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
            .then(data => {
                const lists = data[0].Lists;
                setTasks(lists);
            });
    }, [cookies.token]);

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleAddTask = () => {
        if (newTask.trim() !== '') {

            Axios.post('http://localhost:5000/api/lists', {name: newTask, description: ''}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => response.data).then(data => {
                const newTaskObj = data;
                setTasks([...tasks, newTaskObj]);
                setNewTask('');
            })
        }
    };

    const handleRemoveTask = (index) => {
        const {id} = tasks[index]
        Axios.delete(`http://localhost:5000/api/lists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleEditTask = (index) => {
        // Handle the edit functionality here
        console.log('Edit task at index:', index);
    };

    const handleShowDetails = (index) => {
        // Handle the show details functionality here
        console.log('Show details for task at index:', index);
    };

    return (
        <div className="tasks-page">
            <h1>Tasks</h1>
            <div className="tasks-container">
                <div className="tasks-list">
                    <h2>Task List</h2>
                    {tasks.length === 0 ? (
                        <p>No tasks found.</p>
                    ) : (
                        <ul>
                            {tasks.map((task, index) => (
                                <li key={index}>
                                    <div className="task-info">
                                        <h3>{task.name}</h3>
                                        <p>{task.description}</p>
                                    </div>
                                    <div className="task-actions">
                                        <button onClick={() => handleRemoveTask(index)}>
                                            <RiDeleteBinLine/>
                                        </button>
                                        <button onClick={() => handleEditTask(index)}>
                                            <RiEdit2Line/>
                                        </button>
                                        <button onClick={() => handleShowDetails(index)}>
                                            <RiInformationLine/>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="add-task">
                    <h2>Add Task</h2>
                    <input type="text" value={newTask} onChange={handleInputChange}/>
                    <button onClick={handleAddTask}>Add Task</button>
                </div>
            </div>
        </div>
    );
};

export default TasksPage;
