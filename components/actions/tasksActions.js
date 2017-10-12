import * as APIUtil from '../util/actions';
import { displayNotification } from '../actions/notificationActions';

export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const RECEIVE_TASK = "RECEIVE_TASK";
export const RECEIVE_ERROR = "RECEIVE_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const REMOVE_TASK = "REMOVE_TASK";
export const ADD_TASK = "ADD_TASK";
export const MOVE_TASKS = "MOVE_TASKS";
export const TASK_ERROR = "TASK_ERROR";

export const receiveTasks = tasks => ({
  type: RECEIVE_TASKS,
  tasks: tasks.tasks
});

export const receiveError = res => ({
  type: RECEIVE_ERROR,
  error: res
});

export const clearError = () => ({
  type: CLEAR_ERROR
});

export const receiveTask = (taskId, value) => ({
  type: RECEIVE_TASK,
  taskId,
  value
});

export const removeTask = taskId => ({
  type: REMOVE_TASK,
  taskId
});

export const addNewTask = () => ({
  type: ADD_TASK
});

export const moveTwoTasks = (dragTask, hoverTask) => ({
  type: MOVE_TASKS,
  dragTask,
  hoverTask
});

export const fetchTasks = () => dispatch => {
  // console.log('within fetchTasks: ');
  return APIUtil.getTasks()
    .done(tasks => { dispatch(receiveTasks(tasks)); dispatch(clearError()); })
    .catch((r) => dispatch(receiveError(r)))
};

export const postTasks = (tasks) => dispatch => {
  return (
    APIUtil.postTasks(tasks)
      .then(tasks => dispatch(receiveTasks(tasks)))
      .then(res => dispatch(displayNotification('Save Success', true)))
      .catch(res => dispatch(displayNotification('Save Failed', false)))
  );
}

export const updateTask = (taskId, value) => dispatch => (
  dispatch(receiveTask(taskId, value))
);

export const addTask = () => dispatch => dispatch(addNewTask());

export const moveTasks = (dragTask, hoverTask) => dispatch => {
  dispatch(moveTwoTasks(dragTask, hoverTask))
};

export const deleteTask = taskId => dispatch => (
  dispatch(removeTask(taskId))
);
