export const CLEAR_NOTE = "CLEAR_NOTE";
export const DISPLAY_NOTE = "DISPLAY_NOTE";

export const clearNote = () => ({
  type: CLEAR_NOTE
});

export const displayNote = (message, success) => ({
  type: DISPLAY_NOTE,
  message,
  success
});

export const clearNotification = () => dispatch => dispatch(clearNote());

export const displayNotification = (message, success) => dispatch => (
  dispatch(displayNote(message, success))
);
