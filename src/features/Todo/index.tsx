// import React, { useReducer } from 'react';
import React from 'react';
import { faCheck, faRemove, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/css/todo.css';
// const initJob = {
//   task: {
//     nameTask: '',
//     state: ''
//   },
//   tasks: []
// };
// const ADD_TASK = 'addTask';
// const REMOVE_TASK = 'removeTask';
// const DONE_TASK = 'doneTask';
// const STATE_TASK = 'state';

// const reducer = (state, action)=>{
//   switch(){

//   }
// }

const Todo = (): JSX.Element => {
  // const [state, dispash] = useReducer(reducer, initJob);
  // const { task, tasks } = state
  return (
    <React.Fragment>
      <h1 className="todo-title">To do app</h1>
      <div className="todo-status-list">
        <div className="todo-status-item">All</div>
        <div className="todo-status-item">Completed</div>
        <div className="todo-status-item">Active</div>
      </div>
      <div className="todo-input">
        <input type="text" placeholder='Enter task' />
        <FontAwesomeIcon icon = {faPlus} className="task__add"/>
      </div>
      <div className="todo-list">
        <div className="todo-list-item">
          <h3 className="item-name">Name</h3>
          <div className="item-status">
            <FontAwesomeIcon icon={faRemove} className="task__delete" />
            <FontAwesomeIcon icon={faCheck} className="task__check" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Todo;
