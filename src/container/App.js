/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import RctThemeProvider from './RctThemeProvider';
import RctDefaultLayout from './DefaultLayout';
import AppSignIn from './SignIn';
import AppSignUp from './SignUp';
import { isEmpty } from 'Util/lodashFunctions';

// redux action
import {
   getUserByIdAndAccountId
 } from 'Actions/index';

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, ...rest }) =>
   <Route
      {...rest}
      render={props => <Component {...props} />}
   />;

class App extends Component {

   componentWillMount() {
      let { user } = this.props;
      let accountId = localStorage.getItem('account_id');
      let userId = localStorage.getItem('user_id');

      if (isEmpty(user) && accountId && userId) {
         this.props.getUserByIdAndAccountId();
      }
   }

   render() {
      const { location, match, user } = this.props;
      let accountId = localStorage.getItem('account_id');
      let userId = localStorage.getItem('user_id');

      if (!accountId && !userId && location.pathname !== '/signIn' && location.pathname !== '/signUp') {
         return (<Redirect to={'/signIn'} />);
      }

		if (location.pathname === '/') {
         return <Redirect to={'/app/task-manager/dashboard'} />;
      }
      
      return (
         <RctThemeProvider>
            <NotificationContainer />
            <InitialPath
               path={`${match.url}app`}
               authUser={user}
               component={RctDefaultLayout}
            />
            <Route path="/signIn" component={AppSignIn} />
				<Route path="/signUp" component={AppSignUp} />
         </RctThemeProvider>
      );
   }
}

// map state to props
const mapStateToProps = ({ userReducer }) => {
   const { user } = userReducer;
   return { user };
};

export default connect(mapStateToProps, {
   getUserByIdAndAccountId
})(App);
