import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import Login from './Login';
import Profile from './Profile';
import BestBooks from './BestBooks';
import { withAuth0 } from '@auth0/auth0-react';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";

class App extends React.Component {

  render() {
    const { user, isAuthenticated } = this.props.auth0;
    console.log('app', this.props);
    return(
      <>
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
      </>
    );
  }
}

export default withAuth0(App);
