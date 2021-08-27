import React from "react";

const Notification = ({ eMessage, sMessage }) => {
  if (eMessage === null && sMessage === null) {
    return null;
  }
  if (eMessage !== null) {
    return <div className="error">{eMessage}</div>;
  }
  if (sMessage !== null) {
    return <div className="success">{sMessage}</div>;
  }
};

export default Notification;
