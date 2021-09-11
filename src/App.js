import React from 'react'
// import './App.scss';
import './sass/style.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Section } from './linaria-components';
import { getFirebaseInstance } from './services/firebase/firebase';

import AuthProvider from './services/AuthProvider';

import Navbar from './components/Navbar'
import Dashboard from './scenes/Dashboard/index'
import LoginPage from './scenes/Login/index'
import RegisterPage from './scenes/Register/index'

getFirebaseInstance();

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Section>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/">
              <Redirect to="/login" component={LoginPage} />
            </Route>
          </Section>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
