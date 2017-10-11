import * as APIUtil from '../util/actions';
// import { receiveErrors, clearErrors } from './error_actions';

export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const RECEIVE_TASK = "RECEIVE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const TASK_ERROR = "TASK_ERROR";


// sync actions
export const receiveTasks = tasks => ({
  type: RECEIVE_TASKS,
  tasks: tasks.tasks
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

// export const taskError = error => ({
//   type: TASK_ERROR,
//   error
// })



// async actions
export const fetchTasks = () => dispatch => (
  APIUtil.getTasks().then(tasks => dispatch(receiveTasks(tasks)))
);

export const postTasks = () => dispatch => (
  APIUtil.postTasks().then(tasks => dispatch(receiveTasks(tasks)))
);

// export const fetchTask = id => dispatch => (
//   TaskAPIUtil.fetchTask(id).then(task => dispatch(receiveTask(task)))
// );
//
// export const createTask = task => dispatch => (
//   TaskAPIUtil.createTask(task)
//   .then(task => { dispatch(receiveTask(task)); dispatch(clearErrors())},
//   err => dispatch(receiveErrors(err.responseJSON)))
// );
//
// export const updateTask = (taskId, value) => dispatch => {
//   // debugger;
//   return (
//     (taskId, value) => dispatch(receiveTask(taskId, value))
//   );
// }
export const updateTask = (taskId, value) => dispatch => dispatch(receiveTask(taskId, value));

export const deleteTask = taskId => dispatch => (
  dispatch(removeTask(taskId))
);
