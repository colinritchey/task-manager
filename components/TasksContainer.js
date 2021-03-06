import { connect } from 'react-redux';
import Container from './Container';

// Actions
import {
  fetchTasks,
  updateTask,
  deleteTask,
  postTasks,
  addTask,
  moveTasks
} from './actions/tasksActions';

const mapStateToProps = state => {
  let tasks = [];
  let error = false;
  if(state.tasks){
    tasks = Object.keys(state.tasks).map(el => state.tasks[el]);
  }

  if(state.error){
    error = state.error;
  }

  return {
    tasks: tasks,
    error
  }
};

const mapDispatchToProps = dispatch => ({
  requestTasks: () => dispatch(fetchTasks()),
  saveTasks: (tasks) => dispatch(postTasks(tasks)),
  updateTask: (taskId, value) => dispatch(updateTask(taskId, value)),
  deleteTask: (taskId) => dispatch(deleteTask(taskId)),
  addTask: () => dispatch(addTask()),
  moveTasks: (dragTask, hoverTask) => dispatch(moveTasks(dragTask, hoverTask))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
