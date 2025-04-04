import React from "react";

function NotificationCard({notification}) {
  const momentsAgo =(Math.abs(notification.createdAt - (new Date())));
  // console.log(momentsAgo);
  console.log(Date.UTC(notification.createdAt), new Date());
  return (<div>{notification.notification}</div>)
}

export default NotificationCard;
