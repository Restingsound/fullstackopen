import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  if (props.notification === null) {
    return <div></div>;
  }
  return (
    <div className={props.notification.type}>{props.notification.message}</div>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notifications,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
