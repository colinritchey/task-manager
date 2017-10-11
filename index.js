import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore from './components/store/store';

document.addEventListener("DOMContentLoaded", function(){
  const store = configureStore();
  window.store = store;
  ReactDOM.render(<App store={store}/>, document.getElementById('root'));
});
