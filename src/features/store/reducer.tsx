import { TaskState, TaskAction ,Task } from "../Todo";
import {SET_JOB, ADD_JOB, REMOVE_JOB, STATE_JOBS, REMOVE_ALL } from './constants'

export const initialState = {
    task: {
      name: '',
      taskState: '',
    },
    tasks: window.localStorage.getItem('task') !== null ? JSON.parse(window.localStorage.getItem('task') || '') : [],
    taskActive: 0,
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
          };
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