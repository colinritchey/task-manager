import React, { Component } from 'react';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Task from './Task';
import * as TaskAPI from './util/actions';

import './styles/Container.less';

class Container extends Component {
  constructor(props) {
    super(props);

    this.moveTask = this.moveTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.saveTasks = this.saveTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    let tasks = [];

    if(this.props.tasks){
      tasks = Object.keys(this.props.tasks).map((el) => this.props.tasks[el]);
      tasks = tasks.sort((a, b) => a.id - b.id)
    }

    this.state = {
      tasks: tasks
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tasks !== this.state.tasks){

      let tasks = Object.keys(nextProps.tasks.tasks).map((el) => {
        return nextProps.tasks.tasks[el]
      });

      tasks = tasks.sort((a, b) => a.id - b.id)

      this.setState({tasks: tasks})
    }
  }

  moveTask(dragIndex, hoverIndex) {
    const { tasks } = this.state;
    const dragTask = tasks[dragIndex];

    this.setState(update(this.state, {
      tasks: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragTask],
        ],
      },
    }));
  }

  updateTask(index, value){
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
    let task = { id: this.state.tasks.length + 1, text: '' };
    let tasks = this.state.tasks;
    tasks.unshift(task)

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

    console.log('tasks: ', tasks);

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

        {tasks.map((tasks, i) => (
          <Task
            key={tasks.id}
            index={i}
            id={tasks.id}
            text={tasks.text}
            moveTask={this.moveTask}
            updateTask={this.updateTask}
            deleteTask={this.deleteTask}
          />
        ))}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
