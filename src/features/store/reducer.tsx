import { TaskState, TaskAction, Task } from '../todo';
import {
  SET_JOB,
  ADD_JOB,
  REMOVE_JOB,
  STATE_JOBS,
  REMOVE_ALL,
  EDIT_JOB,
  SET_EDIT_JOB,
} from './constants';

export const initialState =
  window.localStorage.getItem('task') !== null
    ? JSON.parse(window.localStorage.getItem('task') || '')
    : {
        task: {
          name: '',
          complete: false,
        },
        tasks: [],
        taskActive: 0,
        edit: false,
        editIndex: 0,
      };
export const reducer = (state: TaskState, action: TaskAction): any => {
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
          edit: false,
          editIndex: 0,
        };
      }
      window.localStorage.setItem('task', JSON.stringify(state));
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
      window.localStorage.setItem('task', JSON.stringify(state));
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
      window.localStorage.setItem('task', JSON.stringify(state));
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
    case SET_EDIT_JOB: {
      if (typeof payload === 'number') {
        return {
          ...state,
          edit: true,
          editIndex: payload,
          task: { ...state.task, name: state.tasks[payload].name },
        };
      }
      window.localStorage.setItem('task', JSON.stringify(state));
      break;
    }
    case EDIT_JOB: {
      if (typeof payload === 'string') {
        const newTask = [...state.tasks];
        newTask[state.editIndex] = {
          ...newTask[state.editIndex],
          name: state.task.name,
        };
        return {
          ...state,
          tasks: newTask,
          edit: false,
        };
      }
      window.localStorage.setItem('task', JSON.stringify(state));
      break;
    }
  }
};
