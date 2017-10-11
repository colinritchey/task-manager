import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';

const RootReducer = combineReducers({
  tasks: tasksReducer
});

export default RootReducer;
