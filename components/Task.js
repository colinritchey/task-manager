import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
// import ItemTypes from './ItemTypes';
const flow = require('lodash.flow');
import './styles/Task.less';

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

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveTask(dragIndex, hoverIndex);

    // debugger;
    // monitor.getItem().isDragging = false;
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
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
      // debugger;
      component.focus();
    }
  }

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    // console.log(props);
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
