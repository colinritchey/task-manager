import React, { Component } from 'react';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Task from './Task';

import './styles/Container.less';

class Container extends Component {
  constructor(props) {
    super(props);
    this.moveTask = this.moveTask.bind(this);

    let tasks = [];

    if(this.props.tasks){
      tasks = Object.keys(this.props.tasks).map((el) => this.props.tasks[el]);
    }

    this.state = {
      tasks: tasks
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tasks !== this.props.tasks){

      let tasks = Object.keys(nextProps.tasks.tasks).map((el) => {
        return nextProps.tasks.tasks[el]
      });

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

  render() {
    const { tasks } = this.state;

    return (
      <div className='container'>
        <div className="top-bar">
          <h3>Tasks</h3>
          <div className="button-container">
            <button className='add'>Add Task</button>
            <button className='save'>Save</button>
          </div>
        </div>

        {tasks.map((tasks, i) => (
          <Task
            key={tasks.id}
            index={i}
            id={tasks.id}
            text={tasks.text}
            moveTask={this.moveTask}
          />
        ))}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
