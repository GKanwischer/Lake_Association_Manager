import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

// header and footer components
import Nav from './Shared/Nav/Nav';
import Footer from './Shared/Footer/Footer';

import ProtectedRoute from './Shared/ProtectedRoute/ProtectedRoute';

// main components
import UserPage from './Pages/UserPage/UserPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import MainProps from './Pages/MainProps/MainProps';
import Home from './Pages/Home/Home';
import AdminPage from './Pages/Admin/AdminPage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Proposals else shows LoginPage
            exact
            path="/proposals"
          >
            <MainProps />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Home else shows LoginPage
            exact
            path="/home"
          >
            <Home />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Admin else shows LoginPage
            exact
            path="/admin"
          >
              {!user.is_admin ?
              // If the user is not an admin, 
              // redirect to the /home page
              <Redirect to="/home" />
              :
              // Otherwise, show the admin page
              <AdminPage />
            }
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /home page
              <Redirect to="/home" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
