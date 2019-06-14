import React, { Component, Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import LinearProgress from '@material-ui/core/LinearProgress';
import { isEmpty } from 'Util/lodashFunctions';
import { withRouter } from "react-router-dom";
import AppLocale from '../lang';
import primaryTheme from './themes/primaryTheme';
import darkTheme from './themes/darkTheme';
import secondaryTheme from './themes/secondaryTheme';
import warningTheme from './themes/warningTheme';
import dangerTheme from './themes/dangerTheme';
import infoTheme from './themes/infoTheme';
import successTheme from './themes/successTheme';

class RctThemeProvider extends Component {
	
	/**
	 * 
	 * If user is un available, show loader. And check the current route.
	 */
	showLoaderOrGoNext() {
		let { pathname } = window.location;
		let { children, user } = this.props;

		if (pathname === '/signIn' || pathname === '/signUp') {
			return children;
		}

		this.setTimeOutIfUserIsNotAvailable();

		if (!isEmpty(user)) {
			return children;
		} else {
			return (<LinearProgress />);
		}
	};

	/**
	 * If user is not available, redirect to sign in page.
	 */
	redirectUserToSignIn() {
		if (isEmpty(this.props.user)) {
			this.props.history.push('/signIn');
		}
	};

	/**
	 * If user is not available, set time out to redirect on sign in page
	 */
	setTimeOutIfUserIsNotAvailable() {
		if (isEmpty(this.props.user)) {
			setTimeout(() => {
				this.redirectUserToSignIn();
			}, 5000);
		}
	};

	render() {
		const { locale, darkMode, rtlLayout, activeTheme } = this.props.settings;
		const currentAppLocale = AppLocale[locale.locale];
		// theme changes
		let theme = '';
		switch (activeTheme.id) {
			case 1:
				theme = primaryTheme;
				break;
			case 2:
				theme = secondaryTheme;
				break;
			case 3:
				theme = warningTheme;
				break;
			case 4:
				theme = infoTheme;
				break;
			case 5:
				theme = dangerTheme;
				break;
			case 6:
				theme = successTheme;
				break;
			default:
				break;
		}

		if (darkMode) {
			theme = darkTheme;
		}

		if (rtlLayout) {
			theme.direction = 'rtl';
		} else {
			theme.direction = 'ltr';
		}

		return (
			<MuiThemeProvider theme={theme}>
				<IntlProvider
					locale={currentAppLocale.locale}
					messages={currentAppLocale.messages}>
					<Fragment>
						{this.showLoaderOrGoNext()}
					</Fragment>
				</IntlProvider>
			</MuiThemeProvider>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings, userReducer }) => {
	const { user } = userReducer;

	return { settings, user };
};


export default withRouter(connect(mapStateToProps)(RctThemeProvider));
