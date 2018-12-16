import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from 'react-redux'
import configureStore from './store';
import './App.css';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import JokeDetailsPage from './pages/JokeDetails';


class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Router>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/joke/:id" component={JokeDetailsPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
