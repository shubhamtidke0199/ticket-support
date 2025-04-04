import React from "react";

import NotificationCard from "./NotificationCard";

function NotificationDropDown({notifications}) {
  
  return( <div className="dropdown-container">
        <hr />
        <div className="n-header-tray">
        <span className="n-tray-Header">Notifications</span>
        <button className="btn ">clear all</button>
        </div>
        {notifications.map(notification =>{
          return (<>
            <NotificationCard id={notification.id} notification={notification}/>
            <hr />
            </>
          )
        })}
      
  </div>

)}

export default NotificationDropDown;


