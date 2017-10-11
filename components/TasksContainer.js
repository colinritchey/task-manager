import { connect } from 'react-redux';
import Container from './Container';

// Actions
import { fetchTasks, updateTask, deleteTask } from './actions/tasksActions';

const mapStateToProps = state => {
  // debugger;
  let tasks = [];
  if(state.tasks){
    tasks = Object.keys(state.tasks).map(el => state.tasks[el]);
  }

  return {
    tasks: tasks
  }
};

const mapDispatchToProps = dispatch => ({
  requestTasks: () => dispatch(fetchTasks()),
  updateTask: (taskId, value) => dispatch(updateTask(taskId, value)),
  deleteTask: (taskId) => dispatch(deleteTask(taskId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
