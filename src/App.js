import React from 'react'
import './sass/style.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Section } from './linaria-components';
import { firebaseApp } from './services/firebase/firebase';

import TranslationProvider from './services/TranslationProvider'
import AuthProvider from './services/AuthProvider';
import { CookiesProvider } from 'react-cookie';

import GuestOnlyRoute from './components/GuestOnlyRoute';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar'
import Dashboard from './scenes/Dashboard/index'
import LoginPage from './scenes/Login/index'
import RegisterPage from './scenes/Register/index'

// firebaseApp;

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <TranslationProvider>
          <Router>
            <div className="App">
              <Navbar />
              <Section>
                <Switch>
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <GuestOnlyRoute path="/register" component={RegisterPage} />
                  <GuestOnlyRoute path="/login" component={LoginPage} />

                  <Route path="/">
                    <Redirect to="/login" component={LoginPage} />
                  </Route>
                </Switch>

              </Section>
            </div>
          </Router>
        </TranslationProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
