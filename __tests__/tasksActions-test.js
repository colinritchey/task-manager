import * as APIUtil from '../components/util/actions';

import {
  fetchTasks,
  updateTask,
  deleteTask,
  postTasks,
  addTask,
  moveTasks,
  RECEIVE_TASKS,
  RECEIVE_TASK,
  RECEIVE_ERROR,
  CLEAR_ERROR,
  REMOVE_TASK,
  ADD_TASK,
  MOVE_TASKS,
  TASK_ERROR
} from '../components/actions/tasksActions';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('task actions', () => {
  describe('task constants', () => {
    it('should contain a RECEIVE_TASKS constant', () => {
      expect(RECEIVE_TASKS).toEqual('RECEIVE_TASKS');
    });

    it('should contain a RECEIVE_TASK constant', () => {
      expect(RECEIVE_TASK).toEqual('RECEIVE_TASK');
    });

    it('should contain a REMOVE_TASK constant', () => {
      expect(RECEIVE_ERROR).toEqual('RECEIVE_ERROR');
    });

    it('should contain a RECEIVE_ANSWER constant', () => {
      expect(CLEAR_ERROR).toEqual('CLEAR_ERROR');
    });

    it('should contain a REMOVE_ANSWER constant', () => {
      expect(REMOVE_TASK).toEqual('REMOVE_TASK');
    });

    it('should contain a RECEIVE_COMMENT constant', () => {
      expect(ADD_TASK).toEqual('ADD_TASK');
    });

    it('should contain a REMOVE_COMMENT constant', () => {
      expect(MOVE_TASKS).toEqual('MOVE_TASKS');
    });

    it('should contain a RECEIVE_TASK constant', () => {
      expect(TASK_ERROR).toEqual('TASK_ERROR');
    });

  });

  describe('thunks', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ tasks: {} });
    });

    describe('fetchTasks', () => {
      it('should export a fetchTasks function', () => {
        expect(typeof fetchTasks).toEqual('function');
      });

      it('dispatches RECEIVE_TASKS when tasks have been fetched', () => {
        const tasks = { tasks: {id: 1, text: "Test", index: 0} };
        APIUtil.getTasks = jest.fn(() => (
          Promise.resolve(tasks)
        ));

        const expectedActions = [{ type: "RECEIVE_TASKS",
          tasks: {id: 1, text: "Test", index: 0 }},
          {type: 'CLEAR_ERROR'}];

        return store.dispatch(fetchTasks()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('dispatches RECEIVE_ERROR when tasks cant be fetched', () => {
        const error = { error: "Can't fetch"};
        APIUtil.getTasks = jest.fn(() => (
          Promise.reject(error)
        ));

        const expectedActions = [{ type: "RECEIVE_ERROR",
          error: {error: "Can't fetch"}}];

        return store.dispatch(fetchTasks()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('postTasks', () => {
      it('should export a postTasks function', () => {
        expect(typeof postTasks).toEqual('function');
      });

      it('dispatches RECEIVE_TASKS when a tasks has been created', () => {
        const tasks = { tasks: {id: 1, text: "Test", index: 0} };
        APIUtil.postTasks = jest.fn((task) => (
          Promise.resolve(tasks)
        ));
        const expectedActions = [{ type: "RECEIVE_TASKS",
          tasks: {id: 1, text: "Test", index: 0 }},
          {"message": "Save Success", "success": true, "type": "DISPLAY_NOTE"}
        ];

        return store.dispatch(postTasks(tasks)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('updateTask', () => {
      it('should export a updateTask function', () => {
        expect(typeof updateTask).toEqual('function');
      });

      it('dispatches RECEIVE_TASKS when tasks have been fetched', () => {
        const tasks = { tasks: {id: 1, text: "Test", index: 0} };
        let taskId = 1;
        let value = 'Test example';

        const expectedActions = [{ type: "RECEIVE_TASK",
          taskId,
          value,
        }];

        store.dispatch(updateTask(taskId, value))

        return expect(store.getActions()).toEqual(expectedActions);

      });
    });

    describe('addTask', () => {
      it('should export a updateTask function', () => {
        expect(typeof addTask).toEqual('function');
      });

      it('dispatches RECEIVE_TASKS when tasks have been fetched', () => {
        const tasks = { tasks: {id: 1, text: "Test", index: 0} };

        const expectedActions = [{ type: "ADD_TASK" }];

        store.dispatch(addTask())

        return expect(store.getActions()).toEqual(expectedActions);

      });
    });

    describe('moveTasks', () => {
      it('should export a moveTasks function', () => {
        expect(typeof moveTasks).toEqual('function');
      });

      it('dispatches MOVE_TASKS when', () => {
        const tasks = {
          tasks: {
            1: {id: 1, text: "Test", index: 0},
            2: {id: 2, text: "example", index: 1}
          }
        };

        let dragTask = tasks.tasks[1]
        let hoverTask = tasks.tasks[2]
        const expectedActions = [{ type: "MOVE_TASKS", dragTask, hoverTask }];

        store.dispatch(moveTasks(dragTask, hoverTask))

        return expect(store.getActions()).toEqual(expectedActions);

      });
    });

    describe('deleteTask', () => {
      it('should export a deleteTask function', () => {
        expect(typeof deleteTask).toEqual('function');
      });

      it('dispatches REMOVE_TASK', () => {
        const tasks = { tasks: {id: 1, text: "Test", index: 0} };
        let taskId = 1;

        const expectedActions = [{ type: "REMOVE_TASK", taskId }];

        store.dispatch(deleteTask(taskId))

        return expect(store.getActions()).toEqual(expectedActions);

      });
    });
  });
});
