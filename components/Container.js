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
    this.updateTask = this.updateTask.bind(this); //todo delete
    this.saveTasks = this.saveTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this); //todo delete

    let tasks = [];

    if(this.props.tasks){
      tasks = Object.keys(this.props.tasks).map((el) => this.props.tasks[el]);
      tasks = tasks.sort((a, b) => a.index - b.index)
    }

    this.state = {
      tasks: tasks
    }
  }

  componentDidMount() {
    this.props.requestTasks();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tasks !== this.state.tasks){
      // let tasks = Object.keys(nextProps.tasks).map((el) => {
      //   return nextProps.tasks[el]
      // });

      let tasks = nextProps.tasks.sort((a, b) => a.index - b.index)

      this.setState({tasks: tasks})
    }
  }

  moveTask(dragIndex, hoverIndex) {
    const { tasks } = this.state;
    const dragTask = tasks[dragIndex];

    tasks[dragIndex].index = hoverIndex;
    tasks[hoverIndex].index = dragIndex;

    this.setState(update(this.state, {
      tasks: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragTask],
        ],
      },
    }));
  }

  updateTask(index, value){ //todo delete
    let newTasks = this.state.tasks;
    newTasks[index].text = value;

    this.setState({
      tasks: newTasks
    })
  }

  saveTasks(){
    let result = {};

    this.state.tasks.forEach((el) => {
      result[el.id] = el;
    })

    TaskAPI.postTasks(result).then(r => console.log('post made: ', r));
  }

  addTask(){
    let task = { id: shortid.generate(), text: '', index: 0 };
    let tasks = [task];

    this.state.tasks.forEach((el, i) => {
      el.index = i + 1;
      tasks.push(el)
    });

    this.setState({
      tasks: tasks
    });
  }

  deleteTask(index){
    let tasks = this.state.tasks;
    tasks = [...tasks.slice(0, index), ...tasks.slice(index+1)];

    this.setState({
      tasks: tasks
    });
  }

  render() {
    let tasks = this.state.tasks;

    console.log('in render, tasks: ', tasks);

    return (
      <div className='container'>
        <div className="top-bar">
          <h3>Tasks</h3>
          <div className="button-container">
            <button
              onClick={() => this.addTask()}
              className='add'>Add Task</button>
            <button
              onClick={() => this.saveTasks()}
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
