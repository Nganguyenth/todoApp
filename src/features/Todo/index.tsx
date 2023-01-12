import React, { useRef, useEffect } from 'react';
import {
  faTrash,
  faAdd,
  faEdit,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStore, actions } from '../store';
import '../../assets/css/todo.css';
export interface Task {
  name: string;
  complete: boolean;
}
export interface TaskState {
  task: Task;
  tasks: Task[];
  taskActive?: number;
  edit: boolean;
  editIndex: number;
}
export interface TaskAction {
  type: string;
  payload?: string | number;
}

const Todo = (): JSX.Element => {
  const [state, dispatch] = useStore();
  const { task, tasks, taskActive, edit, editIndex } = state;
  const inputRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLInputElement>(null);

  function handleSubmit(): void {
    if (task.name !== '') {
      dispatch(actions.addJob(task.name));
    } else {
      alert('Please enter Task');
    }
    dispatch(actions.setJob(''));
    if (inputRef.current !== null) {
      inputRef.current.focus();
      inputRef.current.value = '';
    }
  }
  function handleEditSubmit(): void {
    dispatch(actions.edit(task.name));
    dispatch(actions.setJob(''));
    if (editRef.current !== null) {
      editRef.current.focus();
    }
  }
  function handleEnter(e: React.KeyboardEvent): void {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }
  function handleEditEnter(e: React.KeyboardEvent): void {
    if (e.key === 'Enter') {
      handleEditSubmit();
    }
  }
  function handleEdit(index: number): void {
    dispatch(actions.setEdit(index));
  }
  useEffect(() => {
    window.localStorage.setItem('task', JSON.stringify(state));
  }, [state]);
  return (
    <div className="todo-app">
      <div className="todo-head">
        <h1 className="todo-title">TO DO LIST</h1>
        <div className="todo-status-list">
          <div className="todo-status-item">All {tasks.length}</div>
          <div className="todo-status-item">
            Completed {taskActive} / {tasks.length}
          </div>
          <div className="todo-status-item">
            Active {tasks.length - taskActive} / {tasks.length}
          </div>
        </div>
      </div>
      <div className="todo-body">
        <div className="todo-input">
          <input
            type="text"
            placeholder="Enter task"
            ref={inputRef}
            onKeyDown={handleEnter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              dispatch(actions.setJob(e.target.value));
            }}
          />
          <div className="task-add btn" onClick={handleSubmit}>
            <FontAwesomeIcon className="task-add-icon" icon={faAdd} />
          </div>
        </div>
        <div className="todo-list">
          {tasks.map((task: Task, index: number) => (
            <>
              <div
                className={`todo-list-item ${task.complete ? 'active' : ''}`}
                key={index}
              >
                <div
                  className="checkbox-rect"
                  onClick={() => dispatch(actions.complete(index))}
                >
                  <input
                    type="checkbox"
                    id={index.toString()}
                    name="check"
                    onChange={() => dispatch(actions.complete(index))}
                    checked={task.complete}
                  />
                  <label className="task-name" htmlFor={index.toString()}>
                    {task.name.trim()}
                  </label>
                </div>
                <div className="task-action">
                  <div
                    className="task-delete"
                    onClick={() => dispatch(actions.remove(index))}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                  <div className="task-edit" onClick={() => handleEdit(index)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>
                </div>
              </div>
              <div
                className={`input-change ${
                  index === editIndex && edit ? 'change' : ''
                }`}
              >
                <input
                  type="text"
                  placeholder="edit task"
                  ref={editRef}
                  onKeyDown={handleEditEnter}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    dispatch(actions.setJob(e.target.value));
                  }}
                />
                <div
                  className="task-check"
                  onClick={() => {
                    handleEditSubmit();
                  }}
                >
                  <FontAwesomeIcon className="task-check-icon" icon={faCheck} />
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="todo-footer">
        <button onClick={() => dispatch(actions.removeAll())}>
          {taskActive > 0 && taskActive < tasks.length
            ? `Delete ${taskActive} task`
            : `Delete All`}
        </button>
      </div>
    </div>
  );
};
export default Todo;
