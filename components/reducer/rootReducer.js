import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import errorReducer from './errorReducer';
import notificationReducer from './notificationReducer';

const RootReducer = combineReducers({
  tasks: tasksReducer,
  notification: notificationReducer,
  error: errorReducer
});

export default RootReducer;
