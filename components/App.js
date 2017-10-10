import React from 'react';
import Container from './Container';

import * as TaskAPI from './util/actions';
import './styles/App.less';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { tasks: {} }
  }

  componentDidMount(){
    let response = TaskAPI.getTasks();
    this.setState({ tasks: response });
  }

  render(){
    return(
      <div className='App'>
        <div className='navbar'></div>
        <Container tasks={this.state.tasks}/>
      </div>
    )
  }
}

export default App;
