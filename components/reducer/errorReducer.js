import merge from 'lodash.merge';

import {
  CLEAR_ERROR,
  RECEIVE_ERROR
} from '../actions/tasksActions';

const errorReducer = (state = { error: false }, action) => {
  Object.freeze(state);
  let nextState;

  switch(action.type){
    case CLEAR_ERROR:
      nextState = Object.assign({}, state);
      nextState.error = false;
      return nextState;

    case RECEIVE_ERROR:
      nextState = Object.assign({}, state);
      nextState.error = true;
      return nextState;

    default:
      return state;
  }
};

export default errorReducer;
