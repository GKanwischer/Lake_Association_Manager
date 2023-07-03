import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div className="nav-left">
        <Link to="/home">
          {/* <h2 className="nav-title">Lake Association Manager</h2> */}
          <img src="/images/Nav_logo_1.5.png" />
        </Link>
      </div>
      <div className="nav-right">
        <div className="nav-right-top"></div>
        <div>
          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
          )}

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <Link className="navLink" to="/home">
                Home
              </Link>

              <Link className="navLink" to="/user">
                User
              </Link>

              <Link className="navLink" to="/proposals">
                Proposals
              </Link>

              {user.is_admin && (
                <Link className="navLink" to="/admin">
                  Admin
                </Link>
              )}
              <LogOutButton className="navLink" />
            </>
          )}

          {/* <Link className="navLink" to="/about">
            About
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Nav;
