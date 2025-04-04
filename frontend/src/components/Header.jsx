import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import {useAuthStatus} from '../hooks/useAuthStatus'
import Notification from './Notification';
import { getNotifications } from "../features/notification/notificationSlice";
import React, { useEffect } from 'react';

function Header() {
  const { Admin } = useAuthStatus()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {notifications, newNotificationsCount} = useSelector((state) =>
    state.notification
  );
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  useEffect(() => {
    dispatch(getNotifications());
    //eslint-disable-next-line
  },[])
  
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <><li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li><li>
              {!Admin ? (<Notification 
                  notifications={notifications}
                  newNotificationsCount={newNotificationsCount} />) : 
               (null)}
            </li></>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
