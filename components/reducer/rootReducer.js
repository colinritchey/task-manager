import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import notificationReducer from './notificationReducer';

const RootReducer = combineReducers({
  tasks: tasksReducer,
  notification: notificationReducer
});

export default RootReducer;
