import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import reduxStore from './store';
import './App.css';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import LoginVKCallbackPage from './pages/LoginVKCallback';
import LogoutPage from './pages/Logout';
import JokeDetailsPage from './pages/JokeDetails';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <Router>
          <div>
            <Header></Header>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/vklogin" exact component={LoginVKCallbackPage} />
            <Route path="/logout" exact component={LogoutPage} />
            <Route path="/joke/:id" component={JokeDetailsPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
