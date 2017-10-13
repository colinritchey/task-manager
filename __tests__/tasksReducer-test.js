import TasksReducer from '../components/reducer/tasksReducer';
import ErrorReducer from '../components/reducer/errorReducer';
import RootReducer from '../components/reducer/rootReducer';
import { createStore } from 'redux';

describe('Reducers', () => {

  describe('TasksReducer', () => {
    it('exports an function', () => {
      expect(typeof TasksReducer).toEqual('function');
    });

    it('should initialize with an empty object as the default state', () => {
      expect(TasksReducer(undefined, {})).toEqual({});
    });

    it('should return the previous state if an action is not matched', () => {
      const oldState = { 1: 'oldState' };
      const newState = TasksReducer(oldState, { type: 'unmatchedtype' });
      expect(newState).toEqual(oldState);
    });

    describe('handling the RECEIVE_TASKS action', () => {
      let action,
          testTasks;

      beforeEach(() => {
        let testTask1 = { id: 1, text: 'testTask', index: 0 };
        let testTask2 = { id: 2, text: 'testTask', index: 1 };

        testTasks = { 1: testTask1, 2: testTask2 };
        action = {
          type: 'RECEIVE_TASKS',
          tasks: testTasks
        };
      });

      it('should replace the state with the action\'s posts', () => {
        const state = TasksReducer(undefined, action);
        expect(state).toEqual(testTasks);
      });
    });

    describe('handling the RECEIVE_QUESTION action', () => {
      let action,
        firstAction,
        secondAction,
        value,
        testTask;

      beforeEach(() => {
        let testTask1 = { id: 1, text: 'testTask', index: 0 };
        let testTask2 = { id: 2, text: 'testTask', index: 1 };

        let testTasks = { 1: testTask1, 2: testTask2 };
        firstAction = {
          type: 'RECEIVE_TASKS',
          tasks: testTasks
        };

        testTask = { id: 1, text: 'testTasks', index: 0 };
        secondAction = {
          type: 'RECEIVE_TASK',
          taskId: testTask.id,
          value: testTask.text
        };
      });

      it('should add the post to the state using the post id as a key', () => {
        let state = TasksReducer(undefined, firstAction);
        state = TasksReducer(state, secondAction);
        expect(state[1]).toEqual(testTask);
      });

    });

    describe('handling the MOVE_TASKS action', () => {
      let action,
        firstAction,
        secondAction,
        value,
        testTask;

      beforeEach(() => {
        let testTask1 = { id: 1, text: 'testTask', index: 0 };
        let testTask2 = { id: 2, text: 'testTask', index: 1 };

        let testTasks = { 1: testTask1, 2: testTask2 };
        firstAction = {
          type: 'RECEIVE_TASKS',
          tasks: testTasks
        };

        testTask = { id: 1, text: 'testTasks', index: 0 };
        secondAction = {
          type: 'MOVE_TASKS',
          dragTask: testTask1,
          hoverTask: testTask2
        };
      });

      it('should add the post to the state using the post id as a key', () => {
        let state = TasksReducer(undefined, firstAction);
        state = TasksReducer(state, secondAction);
        expect(state[1].index).toEqual(1);
      });
    });

    describe('handling the ADD_TASK action', () => {
      let action,
          testTasks;

      beforeEach(() => {
        action = {
          type: 'ADD_TASK'
        };
      });

      it('should replace the state with the action\'s posts', () => {
        const state = TasksReducer(undefined, action);
        expect(Object.keys(state).length).toEqual(1);
      });

    });

    describe('handling the CLEAR_ERROR action', () => {
      let action,
          testTasks;

      beforeEach(() => {
        action = {
          type: 'CLEAR_ERROR'
        };
      });

      it('should replace the state with the action\'s posts', () => {
        const state = ErrorReducer(undefined, action);
        expect(state.error).toEqual(false);
      });

    });

    describe('handling the RECEIVE_ERROR action', () => {
      let action,
          testTasks;

      beforeEach(() => {
        action = {
          type: 'RECEIVE_ERROR'
        };
      });

      it('should replace the state with the action\'s posts', () => {
        const state = ErrorReducer(undefined, action);
        expect(state.error).toEqual(true);
      });
    });
  });

});
