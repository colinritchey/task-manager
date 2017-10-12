import merge from 'lodash.merge';

import {
  CLEAR_NOTE,
  DISPLAY_NOTE
} from '../actions/notificationActions';

const notificationReducer = (state = { display: false, message: '', success: true}, action) => {
  Object.freeze(state);
  let nextState;

  switch(action.type){
    case CLEAR_NOTE:
      // debugger;
      nextState = Object.assign({}, state);
      nextState.display = false;
      return nextState;

    case DISPLAY_NOTE:

      nextState = Object.assign({}, state);
      nextState.display = true;
      nextState.success = action.success
      nextState.message = action.message;

      return nextState;

    default:
      return state;
  }
};

export default notificationReducer;
