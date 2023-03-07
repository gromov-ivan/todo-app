import { useEffect, useState } from "react";
import './tasks.css';
import TaskListItem from "./taskListItem";


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({id: '', name: ''});
    const [id, setId] = useState(4);
    // const [listdb, setListdb] = useState([]);


    useEffect(() => {
        const fetchTasks = async() => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/v1/tasks`);
            const data = await response.json();
            console.log(data);
            setTasks(data);
        }
        fetchTasks();
    }, []);

    const addTask= async (event)=>{
        await event.preventDefault();
        if(newTask.name === ''){
            return;
        } else {
            setTasks([...tasks, newTask]);
            setId(id+1);
        }
        setNewTask({id:'', name:''});
    }

    const inputChanged = (event) =>{
        setNewTask({id: id, name: event.target.value});
    }

    const deleteTask=(row)=>{
        setTasks(tasks.filter((todo, index) => index !== row));
    }

    const markDone=(index)=>{
        const newtasks = [...tasks];
        const task = newtasks.find(task => task.id === index);
        if (task.name.substring(task.name.length-1, task.name.length)=== '✔')
            task.name = task.name.substring(0, task.name.length-2);
        else
            task.name = task.name + '    ✔';
        setTasks(newtasks);
    }

    const savedb = () =>{
        tasks.map(async item => {
            await fetch(`${process.env.REACT_APP_BACKEND}/v1/task/list`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
        })
    }


    const loadFromDb = () =>{
        const fetchList = async() => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/v1/task/list`);
            const list = await response.json();
            setTasks(list);
        }
        fetchList();
    }

    return(
        <>
            <h2>To-Do list</h2>
            <form onSubmit={addTask}>
            <input id = "input" type="text" placeholder="Type a task" name="name" value={newTask.name} onChange={inputChanged}></input>
            <input id='submitBtn' type="submit" value = "Add"/>
            </form>
            <TaskListItem tasks={tasks} deleteTask={deleteTask} markDone={markDone} loadFromDb={loadFromDb} savedb={savedb}/>
        </>
    )
};

export default TaskList;
