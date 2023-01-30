import React, { useState } from "react"
import { nanoid } from "nanoid"
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTask(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTask(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map((task) => {

      if (id === task.id) {
        return {...task, name: newName}
      }
      return task
    });
    setTask(editedTasks)
  }

  const [tasks, setTask] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed= {name === filter}
      setFilter={setFilter}
    />

  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} tasks remaining`;

  function addTask(name) {
    const newTask = {id: `id-${nanoid()}`, name: name, completed: false}
    setTask([...tasks, newTask])
  }


  


  

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
          {filterList}
      </div>
      
      <h2 id="list-heading">{headingText} </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}
