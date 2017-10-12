import { RECEIVE_TASKS,
         RECEIVE_TASK,
         RECEIVE_ERROR,
         REMOVE_TASK,
         ADD_TASK,
         MOVE_TASKS,
         TASK_ERROR } from '../actions/tasksActions';

import merge from 'lodash.merge';
const shortid = require('shortid');

const tasksReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch(action.type){
    case RECEIVE_TASKS:
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

    case ADD_TASK:
      nextState = merge({}, state);
      let task = { id: shortid.generate(), text: '', index: 0 };

      for(let id in nextState){
        nextState[id].index++;
      }

      nextState[task.id] = task;

      return nextState;
    case MOVE_TASKS:
      // debugger;

      nextState = merge({}, state);

      let dragIndex = nextState[action.dragTask.id].index;
      let hoverIndex = nextState[action.hoverTask.id].index;

      nextState[action.dragTask.id].index = hoverIndex;
      nextState[action.hoverTask.id].index = dragIndex;

      return nextState;
    // case RECEIVE_ERROR:
    //   debugger;
    //   nextState = merge({}, state);
    //   nextState.error = 'failed to fetch'
    //   return nextState;

    default:
      return state;
  }
};

export default tasksReducer;
