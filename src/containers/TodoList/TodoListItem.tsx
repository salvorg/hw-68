import React, {useState} from 'react';
import {TaskMutation} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {changeStatus, deleteTask, fetchTodoList} from "./TodoListSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

interface Props {
  props: TaskMutation;
}

const  TodoListItem: React.FC<Props> = ({props}) => {
  const updateLoading = useSelector((state: RootState) => state.list.updateLoading);

  const dispatch = useAppDispatch();
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
  }


  return (
    <div className='border border-1 d-flex justify-content-between p-2 mb-3'>
      <h4>{props.title}</h4>
      <div className="d-flex">
        {updateLoading && <p> Loading...</p>}
        <input type="checkbox"
               checked={props.status}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}/>
        <button className='btn btn-danger ms-4' disabled={disabled} id={props.id} onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};


export default TodoListItem;