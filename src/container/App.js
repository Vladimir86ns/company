/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';

//Main App
import RctDefaultLayout from './DefaultLayout';

// app signin
import AppSignIn from './SignIn';
import AppSignUp from './SignUp';

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, ...rest }) =>
   <Route
      {...rest}
      render={props => <Component {...props} />}
   />;

class App extends Component {
   render() {
      const { location, match, user } = this.props;
      let account = localStorage.getItem('account_id');

		// TODO make logic for logged in user
		if (location.pathname === '/') {
			if (!account) {
            return (<Redirect to={'/signIn'} />);
			} else {
            return <Redirect to={'/app/dashboard/ecommerce'} />;
			}
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
const mapStateToProps = ({ authUser }) => {
   const { user } = authUser;
   return { user };
};

export default connect(mapStateToProps)(App);
