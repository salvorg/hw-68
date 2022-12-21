import React, {useState} from 'react';
import {fetchTodoList, onFormSubmit} from "../../containers/TodoList/TodoListSlice";
import {useAppDispatch} from "../../app/hooks";
import {Task} from "../../types";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import ButtonSpinner from "../Spinner/ButtonSpinner";

const TaskForm = () => {
  const [task, setTask] = useState<Task>({title: '', status: false});
  const dispatch = useAppDispatch();
  const onFormLoading = useSelector((state: RootState) => state.list.onFormLoading);

  const createTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(prev => ({...prev, title: e.target.value, status: false}));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(onFormSubmit(task));
    setTask({title: '', status: false});
    await dispatch(fetchTodoList());
  };

  return (
    <form onSubmit={onSubmit} className='container-fluid w-50 ms-5'>
      <h4 className='m-2'>Add new task</h4>
      <div className="form-group">
        <input type="text" name='title'
               className='form-control'
               placeholder='Title'
               value={task.title}
               onChange={createTask}/>
      </div>
      <button disabled={onFormLoading} className='btn btn-primary mt-4' type='submit'>{onFormLoading && <ButtonSpinner/>}Add</button>
    </form>
  );
};

export default TaskForm;