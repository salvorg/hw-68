import React from 'react';
import TodoList from "./containers/TodoList/TodoList";
import TaskForm from "./components/TaskForm/TaskForm";

function App() {
  return (
    <div className='container-fluid d-flex'>
      <TodoList/>
      <TaskForm/>
    </div>
  );
}

export default App;
