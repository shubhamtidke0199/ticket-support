import React from 'react';
import { FaBell } from 'react-icons/fa';
import NotificationDropDown from './NotificationDropDown';
import { useState } from 'react';
const Notification = () => {
   const [dropdown, setDropdown] = useState(false);
  return (<div className="notification-container">
   <button className="btn-notification"
   onClick={()=>setDropdown(!dropdown)} >
     <div className='notification-div'> 
   <FaBell className="notification-icon" ></FaBell><span class="notification-badge">0</span> 
   </div>
   
 </button>{dropdown?(<NotificationDropDown />):null}
 
 </div>
  )};

  export default Notification;