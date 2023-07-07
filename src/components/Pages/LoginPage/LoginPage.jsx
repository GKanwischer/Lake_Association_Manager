import React from 'react';
import { useHistory } from 'react-router-dom';
import './LoginPage.css'
// component imports
import LoginForm from './LoginForm';
import LoginAbout from './LoginAbout/LoginAbout';

// this component constructs and houses all things related to the login page

function LoginPage() {
  const history = useHistory();

  return (
    <div className="login-container">
      <div className="login-info">
        <LoginAbout />
      </div>
      <div className="login-page">
        <LoginForm />
        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </button>
        </center>
      </div>
    </div>
  );
}

export default LoginPage;
