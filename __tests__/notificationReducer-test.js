import NotificationReducer from '../components/reducer/notificationReducer';
import RootReducer from '../components/reducer/rootReducer';
import { createStore } from 'redux';

describe('Reducers', () => {

  describe('NotificationReducer', () => {
    it('exports an function', () => {
      expect(typeof NotificationReducer).toEqual('function');
    });

    let defaultStore = {display: false, message: '', success: true};

    it('should initialize with an set object as the default state', () => {
      expect(NotificationReducer(undefined, defaultStore)).toEqual(defaultStore);
    });

    it('should return the previous state if an action is not matched', () => {
      const oldState = defaultStore;
      const newState = NotificationReducer(oldState, { type: 'unmatchedtype' });
      expect(newState).toEqual(oldState);
    });

    describe('handling the CLEAR_NOTE action', () => {
      let action,
          testNotes;

      beforeEach(() => {
        let testNotes = { display: false, message: '', success: true };

        action = {
          type: 'CLEAR_NOTE'
        };
      });

      it('should replace the state with the action\'s posts', () => {
        const state = NotificationReducer(undefined, action);
        expect(state).toEqual({display: false, message: '', success: true});
      });
    });

    describe('handling the DISPLAY_NOTE action', () => {
      let action,
        testNotes;

      beforeEach(() => {
        let testNotes = { display: true, message: 'Shown', success: false };

        action = {
          type: 'DISPLAY_NOTE',
          success: testNotes.success,
          message: testNotes.message
        };
      });

      it('should add the post to the state using the post id as a key', () => {
        let state = NotificationReducer(undefined, action);
        expect(state).toEqual({display: true, message: 'Shown', success: false});
      });

    });
  });

});
