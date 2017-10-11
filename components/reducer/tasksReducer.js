import { RECEIVE_TASKS,
         RECEIVE_TASK,
         REMOVE_TASK,
         TASK_ERROR } from '../actions/tasksActions';
import merge from 'lodash.merge';

const tasksReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch(action.type){
    case RECEIVE_TASKS:
      debugger;
      nextState = Object.assign({}, action.tasks);

      return nextState;
    case RECEIVE_TASK:
      let nextState = Object.assign({}, state);
      let newTask = state[action.taskId];
      newTask.text = action.value;
      nextState[action.taskId] = newTask;
      return nextState;
    case REMOVE_TASK:
      nextState = merge({}, state);
      delete nextState[action.taskId];
      return nextState;
    // case TODO_ERROR:
    //   alert(action.error);
    default:
      return state;
  }
};

export default tasksReducer;
