import React, { useReducer, useRef } from 'react';
import { faTrash ,faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/css/todo.css';
interface Task {
  name: string;
  complete: boolean;
}
interface TaskState {
  task: Task;
  tasks: Task[];
  taskActive?: number;
}
interface TaskAction {
  type: string;
  payload?: string | number;
}
const initialState = {
  task: {
    name: '',
    taskState: '',
  },
  tasks: [],
  taskActive: 0,
};

const SET_JOB = 'setJob';
const ADD_JOB = 'addJob';
const REMOVE_JOB = 'removeJob';
const STATE_JOBS = 'state';
const REMOVE_ALL = 'removeAll';

function setJob(payload: string): TaskAction {
  return {
    type: SET_JOB,
    payload,
  };
}
function addJob(payload: string): TaskAction {
  return {
    type: ADD_JOB,
    payload,
  };
}
function remove(payload: number): TaskAction {
  return {
    type: REMOVE_JOB,
    payload,
  };
}
function complete(payload: number): TaskAction {
  return {
    type: STATE_JOBS,
    payload,
  };
}
function removeAll(): TaskAction {
  return { type: REMOVE_ALL };
}
function reducer(state: TaskState, action: TaskAction): any {
  const { type, payload } = action;
  switch (type) {
    case SET_JOB: {
      return {
        ...state,
        task: {
          name: payload,
          complete: false,
        },
      };
    }
    case ADD_JOB: {
      if (typeof payload === 'string') {
        const newTask: Task = {
          name: payload,
          complete: false,
        };
        return {
          ...state,
          tasks: [...state.tasks, newTask],
        }
      }
      break;
    }
    case REMOVE_JOB: {
      const newTask: Task[] = [...state.tasks];
      if (typeof payload === 'number') {
        newTask.splice(payload, 1);
        return {
          ...state,
          tasks: newTask,
          taskActive: newTask.reduce((acc, cur) => {
            if (cur.complete) acc = acc + 1;
            return acc;
          }, 0),
        };
      }
      break;
    }
    case STATE_JOBS: {
      const newTask: Task[] = [...state.tasks];
      if (typeof payload === 'number') {
        if (newTask[payload].complete) {
          newTask[payload] = {
            ...newTask[payload],
            complete: false,
          };
        } else {
          newTask[payload] = {
            ...newTask[payload],
            complete: true,
          };
        }
        return {
          ...state,
          tasks: newTask,
          taskActive: newTask.reduce((acc, cur) => {
            if (cur.complete) acc = acc + 1;
            return acc;
          }, 0),
        };
      }
      break;
    }
    case REMOVE_ALL: {
      const newTask: Task[] = [];
      state.tasks.map((task) => (task.complete ? newTask : newTask.push(task)));
      if (newTask.length === state.tasks.length) {
        return {
          ...state,
          tasks: [],
          taskActive: 0,
        };
      } else {
        return {
          ...state,
          tasks: newTask,
          taskActive: newTask.reduce((acc, cur) => {
            if (cur.complete) acc = acc + 1;
            return acc;
          }, 0),
        };
      }
    }
  }
}
const Todo = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { task, tasks, taskActive } = state;
  const inputRef = useRef<HTMLInputElement>(null);
  function handleSubmit(): void {
    if (task.name !== '') {
      dispatch(addJob(task.name));
    }
    dispatch(setJob(''));
    if (inputRef.current !== null) {
      inputRef.current.focus();
      inputRef.current.value = '';
    }
  }
  return (
    <React.Fragment>
      <h1 className="todo-title">To do app</h1>
      <div className="todo-status-list">
        <div className="todo-status-item">All {tasks.length}</div>
        <div className="todo-status-item">
          Completed {taskActive} / {tasks.length}
        </div>
        <div className="todo-status-item">
          Active {tasks.length - taskActive} / {tasks.length}
        </div>
      </div>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter task"
          ref={inputRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            dispatch(setJob(e.target.value));
          }}
        />
        <div className="task-add" onClick={handleSubmit}>
        <FontAwesomeIcon icon={faAdd} />
        </div>
      </div>
      <div className="todo-list">
        {tasks.map((task: Task, index: number) => (
          <div
            className={`todo-list-item ${task.complete ? 'active' : ''}`}
            key={index}
          >
            <input
              type="checkbox"
              name={index.toString()}
              onChange={() => dispatch(complete(index))}
              checked={task.complete}
            />
            <label className="task-name" htmlFor={index.toString()}>
              {task.name.trim()}
            </label>
            <div className="item-status">
              <div
                className="task-delete"
                onClick={() => dispatch(remove(index))}
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="todo-footer">
        <button onClick={() => dispatch(removeAll())}>
          {taskActive > 0 && taskActive < tasks.length
            ? `Delete ${taskActive} task`
            : `Delete All`}
        </button>
      </div>
    </React.Fragment>
  );
};
export default Todo;
