import {
  CLEAR_NOTE,
  DISPLAY_NOTE,
  clearNotification,
  displayNotification
} from '../components/actions/notificationActions';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('task actions', () => {
  describe('task constants', () => {
    it('should contain a CLEAR_NOTE constant', () => {
      expect(CLEAR_NOTE).toEqual('CLEAR_NOTE');
    });

    it('should contain a DISPLAY_NOTE constant', () => {
      expect(DISPLAY_NOTE).toEqual('DISPLAY_NOTE');
    });
  });

  describe('thunks', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ notification: {} });
    });

    describe('clearNotification', () => {
      it('should export a clearNotification function', () => {
        expect(typeof clearNotification).toEqual('function');
      });

      it('dispatches CLEAR_NOTE when tasks have been fetched', () => {
        const notification = { display: false, message: '', success: true };

        const expectedActions = [{ type: "CLEAR_NOTE"}];

        store.dispatch(clearNotification());
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('displayNotification', () => {
      it('should export a displayNotification function', () => {
        expect(typeof displayNotification).toEqual('function');
      });

      it('dispatches CLEAR_NOTE when tasks have been fetched', () => {
        const notification = { display: false, message: '', success: true };

        const expectedActions = [{
          type: "DISPLAY_NOTE",
          message: notification.message,
          success: notification.success
        }];

        store.dispatch(displayNotification(notification.message, notification.success));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
