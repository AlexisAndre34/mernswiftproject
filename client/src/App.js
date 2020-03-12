import React, { Fragment, useEffect} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard'
import Posts from './components/posts/Posts';
import PostForm from './components/posts/PostForm';
import Post from './components/post/Post';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';



const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
  }, []);
  
  return (
  <Provider store={ store }>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={ Landing } />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/dashboard" component={ Dashboard } />
            <Route exact path="/posts" component={ Posts } />
            <Route exact path="/posts/:id" component={ Post } />
            <PrivateRoute exact path="/post/create" component={ PostForm } />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
  );
};

    

export default App;
