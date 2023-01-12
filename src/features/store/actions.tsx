import {
  SET_JOB,
  ADD_JOB,
  REMOVE_JOB,
  STATE_JOBS,
  REMOVE_ALL,
  SET_EDIT_JOB,
  EDIT_JOB,
} from './constants';
import { TaskAction } from '../todo';

export const setJob = (payload: string): TaskAction => {
  return {
    type: SET_JOB,
    payload,
  };
};
export const addJob = (payload: string): TaskAction => {
  return {
    type: ADD_JOB,
    payload,
  };
};
export const remove = (payload: number): TaskAction => {
  return {
    type: REMOVE_JOB,
    payload,
  };
};
export const complete = (payload: number): TaskAction => {
  return {
    type: STATE_JOBS,
    payload,
  };
};
export const removeAll = (): TaskAction => {
  return { type: REMOVE_ALL };
};
export const setEdit = (payload: number): TaskAction => {
  return {
    type: SET_EDIT_JOB,
    payload,
  };
};
export const edit = (payload: string): TaskAction => {
  return {
    type: EDIT_JOB,
    payload,
  };
};
