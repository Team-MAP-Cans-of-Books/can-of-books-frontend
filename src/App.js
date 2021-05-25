import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import Login from './Login';
import Profile from './Profile';
import BestBooks from './BestBooks';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";

class App extends React.Component {
  componentDidMount = () => {
    if(this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
      .then(res => {
        const jwt = res.__raw;

        const config = {
          header: {"Authorization" : `Bearer ${jwt}`},
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/profile'
        }
        axios(config)
          .then(axiosResults => console.log(axiosResults.data))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    }
  }

  render() {
    const { user, isAuthenticated } = this.props.auth0;
    console.log('app', this.props);
    return(
      <div>
        <Router>
          <IsLoadingAndError>
            <Header isAuthenticated={isAuthenticated}/>
            <Switch>
              {/* <BrowserRouter> */}
                <Route exact path="/">
                  <Login />
                  {isAuthenticated ? <BestBooks /> : null}
                </Route>
                <Route exact path="/profile">
                  {isAuthenticated ? <Profile userInfo={user}/> : null}
                </Route>
              {/* </BrowserRouter> */}
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </div>
    );
  }
}

export default withAuth0(App);
