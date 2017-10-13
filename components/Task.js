import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
const flow = require('lodash.flow');
import './styles/Task.less';

/*
  taskSource & taskTarget are functions that came from an example
  project given by the React DND repo. Their primary purpose is
  to handle the dragging UI.

  https://github.com/react-dnd/react-dnd

*/

const taskSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const taskTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    let hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    let hoverMidHoz = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    let clientOffset = monitor.getClientOffset();

    let hoverClientHoz = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientHoz < hoverMidHoz) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientHoz > hoverMidHoz) {
      return;
    }

    props.moveTask(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};

class Task extends Component {
  constructor(props){
    super(props);

    this.state = {
      text: this.props.text
    }

    this.updateTask = this.updateTask.bind(this);
    this.getFocused = this.getFocused.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.text !== this.state.text){
      this.setState({text: nextProps.text})
    }
  }

  updateTask(e){
    this.props.updateTask(this.props.id, e.target.value);
  }

  deleteTask(e){
    this.props.deleteTask(this.props.id)
  }

  getFocused(component){
    if (component &&
      this.props.index === 0 &&
      this.props.text === '') {
      component.focus();
    }
  }

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div
        className='task-item'
        style={{ opacity }}>
        <div className='task-actions'>
          <div className='left-actions'>
            <span className='three-ellipsis'>
              <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
              <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
              <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
            </span>
            <span>Task</span>
          </div>

          <i className="fa fa-trash-o" onClick={() => this.deleteTask()} aria-hidden="true"></i>
        </div>

        <textarea
          ref={this.getFocused}
          onChange={this.updateTask}
          value={this.state.text}></textarea>
      </div>,
    ));
  }
}

module.exports = flow(

  DragSource('task', taskSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),

  DropTarget('task', taskTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(Task);
