import React from 'react'
// import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Section } from './styles';
import Navbar from './components/Navbar'
import Dashboard from './scenes/Dashboard/index'
import LoginPage from './scenes/Login/index'
import RegisterPage from './scenes/Register/index'


function App() {
  return (
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
  );
}

export default App;
