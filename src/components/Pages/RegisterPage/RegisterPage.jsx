import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginAbout from '../LoginPage/LoginAbout/LoginAbout';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="login-container">
      <div className="login-info">
        <LoginAbout />
      </div>

      <div className="login-page">

        <RegisterForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </button>
        </center>
      </div>
    </div>
  );
}

export default RegisterPage;
