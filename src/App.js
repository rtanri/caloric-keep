import React from 'react'
import './sass/style.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Section } from './linaria-components';

import TranslationProvider from './data/services/TranslationProvider'
import AuthProvider from './data/services/AuthProvider';
import CardProvider from './data/services/CardProvider'
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
        <CardProvider>
          <TranslationProvider>
            <Router>
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
            </Router>
          </TranslationProvider>
        </CardProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
