import React, { Component } from 'react';
import './styles/Notification.less';

class Notification extends Component {
  constructor(props){
    super(props);
    this.state = this.props;

    this.clearNote = this.clearNote.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.notification !== this.state.notification){
      this.setState({notification: nextProps.notification});
    }
  }

  clearNote(){
    this.props.clearNotification();
  }

  render(){
    let notification = this.state.notification;
    let visible = notification.display ? '' : 'hidden';
    let color = notification.success ? 'lightgreen' : 'lightred'

    return (
      <div
        className='notification'
        style={{ visibility: visible, color: color, borderColor: color}}>
        {`${notification.message}`}
        <button
          onClick={() => this.clearNote()}
          className='remove' style={{ color: color }}>X</button>
      </div>
    )
  }
}

export default Notification;
