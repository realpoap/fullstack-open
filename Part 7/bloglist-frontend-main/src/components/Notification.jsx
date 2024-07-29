const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  } else {
    return <div className={type}>{message}</div>;
  }
};

export default Notification;
