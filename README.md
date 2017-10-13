# Task-Manager

LIVE

This single page application fetches tasks from an api endpoint and displays them in a specific order. You can drag the items to change the order, add new tasks or edit existing text within a task. Saving will send a POST request to the same endpoint and the application will notify you if the save was successful or not.

### Libraries Used

This application uses React, Redux, Webpack, Less, and React Drag and Drop.

React Drag and Drop is used to handle the dragging UI when moving the tasks.

Redux is used to keep track of one store object:

```javascript
  store: {
    tasks: {
      tasks: {
        1: {id: 1, text: 'hello', index: 0},
        2: {id: 2, text: 'hello', index: 1},
      }
    },
    notification: {
      display: false,
      success: true,
      message: 'Successful Save'
    },
    error: {
      error: false,
      count: 0
    }
  }

```

### How to Test

git clone the repo and npm install. Once done npm test to run the reducer and actions test. (Note: you may need Jest install globally to run properly).
