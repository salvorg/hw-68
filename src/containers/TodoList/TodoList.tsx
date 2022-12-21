import React, {useEffect} from 'react';
import {AppDispatch, RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchTodoList} from "./TodoListSlice";
import TodoListItem from "./TodoListItem";
import Spinner from "../../components/Spinner/Spinner";

const TodoList = () => {
  const dispatch: AppDispatch = useDispatch();
  const todoListValue = useSelector((state: RootState) => state.list.value);
  const todoListLoading = useSelector((state: RootState) => state.list.loading);

  useEffect(() => {
    dispatch(fetchTodoList());
  }, [dispatch]);

  return (
    <div className='w-50 me-5 container-fluid'>
      <div className="d-flex">
        <h4 className="m-2">To Do List</h4>
        {todoListLoading && <Spinner/>}
      </div>
      {todoListValue.map(item => (
        <TodoListItem key={Math.random()} props={item}/>
      ))}
    </div>
  );
};

export default TodoList;