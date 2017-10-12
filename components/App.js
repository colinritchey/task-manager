import React from 'react';
import { Provider } from 'react-redux'

import Container from './Container';
import TasksContainer from './TasksContainer';
import NotificationContainer from './NotificationContainer';

import * as TaskAPI from './util/actions';
import './styles/App.less';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Provider store={store}>
        <div className='App'>
          <div className='navbar'></div>
          <TasksContainer/>
          <NotificationContainer/>
        </div>
      </Provider>
    )
  }
}

export default App;
