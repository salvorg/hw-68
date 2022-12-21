import React, {useState} from 'react';
import {TaskMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {changeStatus, deleteTask, fetchTodoList} from "./TodoListSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";

interface Props {
  props: TaskMutation;
}

const  TodoListItem: React.FC<Props> = ({props}) => {
  const updateLoading = useAppSelector((state: RootState) => state.list.updateLoading);

  const dispatch = useAppDispatch();
  const onDeleteLoading = useSelector((state: RootState) => state.list.onDeleteLoading);
  const [disabled, setDisabled] = useState(false);
  const [task, setTask] = useState<TaskMutation>(props);

  const onDelete = async () => {
    setDisabled(true);
    await dispatch(deleteTask(props.id));
    await dispatch(fetchTodoList());
  };

  const onChange = async (status: boolean) => {
    setTask(prev => ({...prev, status: status}));
    await dispatch(changeStatus({...task, status: status}));
    await dispatch(fetchTodoList());
  };

  return (
    <div className='border border-1 rounded d-flex justify-content-between p-3 mb-3'>
      <h4>{props.title}</h4>
      <div className='d-flex align-items-center'>
        {updateLoading && updateLoading === props.id && (<ButtonSpinner/>)}
        <input type='checkbox'
               className='form-check-input'
               checked={props.status}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}/>
        <button className='btn btn-danger ms-4 p-2' disabled={disabled} id={props.id} onClick={onDelete}>{onDeleteLoading && onDeleteLoading === props.id && <ButtonSpinner/>}Delete</button>
      </div>
    </div>
  );
};


export default TodoListItem;