import { connect } from 'react-redux';
import Notification from './Notification';

// Actions
import {
  clearNotification,
} from './actions/notificationActions';

const mapStateToProps = state => {
  // debugger;
  return {
    notification: state.notification
  }
};

const mapDispatchToProps = dispatch => ({
  clearNotification: () => dispatch(clearNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
