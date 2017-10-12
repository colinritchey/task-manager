import React, { Component } from 'react';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Task from './Task';
import * as TaskAPI from './util/actions';
const shortid = require('shortid');

import './styles/Container.less';

class Container extends Component {
  constructor(props) {
    super(props);

    this.moveTask = this.moveTask.bind(this);
    this.saveTasks = this.saveTasks.bind(this);
    // this.addTasks = this.addTasks.bind(this);

    let tasks = [];

    if(this.props.tasks){
      tasks = Object.keys(this.props.tasks).map((el) => this.props.tasks[el]);
      tasks = tasks.sort((a, b) => a.index - b.index)
    }

    this.state = {
      tasks: tasks,
      saveDisabled: true
    }
  }

  componentDidMount() {
    this.props.requestTasks();

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tasks !== this.state.tasks){

      let tasks = nextProps.tasks.sort((a, b) => a.index - b.index)
      let saveDisabled = false;

      if(nextProps.error.error === true){
        console.log('error happened');
        this.props.requestTasks();
      }

      if(this.state.tasks.length === 0){
        saveDisabled = true;
      }

      this.setState({tasks: tasks, saveDisabled: saveDisabled})
    }
  }

  moveTask(dragIndex, hoverIndex) {
    const { tasks } = this.state;
    const dragTask = tasks[dragIndex];

    this.props.moveTasks(tasks[dragIndex], tasks[hoverIndex]);

    this.setState({saveDisabled: false});
  }

  saveTasks(){
    let result = {};

    this.state.tasks.forEach((el) => {
      result[el.id] = el;
    })

    this.props.saveTasks(result);
  }

  // addTasks(){
  //   this.props.addTask();
  //   // debugger;
  //   // this.setState({ addTask: true })
  // }

  render() {
    let tasks = this.state.tasks;

    return (
      <div className='container'>
        <div className="top-bar">
          <h3>Tasks</h3>
          <div className="button-container">
            <button
              onClick={() => this.props.addTask()}
              className='add'>Add Task</button>
            <button
              onClick={() => this.saveTasks(tasks)}
              type="button"
              disabled={this.state.saveDisabled}
              className='save'>Save</button>
          </div>
        </div>

        {tasks.map((task, i) => (
          <Task
            key={task.id}
            index={i}
            id={task.id}
            text={task.text}
            moveTask={this.moveTask}
            updateTask={this.props.updateTask}
            deleteTask={this.props.deleteTask}
          />
        ))}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
