import merge from 'lodash.merge';

import {
  CLEAR_ERROR,
  RECEIVE_ERROR
} from '../actions/tasksActions';

const errorReducer = (state = { error: false, count: 0 }, action) => {
  Object.freeze(state);
  let nextState;

  switch(action.type){
    case CLEAR_ERROR:
      nextState = Object.assign({}, state);
      nextState.error = false;
      nextState.count = 0;
      return nextState;

    case RECEIVE_ERROR:
      nextState = Object.assign({}, state);
      nextState.error = true;
      nextState.count++;
      return nextState;

    default:
      return state;
  }
};

export default errorReducer;
