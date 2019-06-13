/**
 * Rct Theme Provider
 */
import React, { Component, Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import LinearProgress from '@material-ui/core/LinearProgress';
import { isEmpty } from 'Util/lodashFunctions';

// App locale
import AppLocale from '../lang';

// themes
import primaryTheme from './themes/primaryTheme';
import darkTheme from './themes/darkTheme';
import secondaryTheme from './themes/secondaryTheme';
import warningTheme from './themes/warningTheme';
import dangerTheme from './themes/dangerTheme';
import infoTheme from './themes/infoTheme';
import successTheme from './themes/successTheme';

class RctThemeProvider extends Component {

	state = {
		isUserAvailable: false
	};

	/**
	 * Check when user is available.
	 * 
	 * @param {object} nextProps 
	 */
	componentWillUpdate(nextProps) {
		if (isEmpty(this.props.user) && !isEmpty(nextProps.user)) {
			this.setState({isUserAvailable: true})
		};
	}

	/**
	 * 
	 * If user is un available, show loader. And check the current route.
	 */
	showLoaderOrGoNext() {
		let { pathname } = window.location;
		let { children } = this.props;

		if (pathname === '/signIn' || pathname === '/signUp') {
			return children;
		}

		if (this.state.isUserAvailable) {
			return children;
		} else {
			return (<LinearProgress />);
		}
	};

	render() {
		const { locale, darkMode, rtlLayout, activeTheme } = this.props.settings;
		const currentAppLocale = AppLocale[locale.locale];
		// theme changes
		let theme = '';
		switch (activeTheme.id) {
			case 1:
				theme = primaryTheme
				break;
			case 2:
				theme = secondaryTheme
				break;
			case 3:
				theme = warningTheme
				break;
			case 4:
				theme = infoTheme
				break;
			case 5:
				theme = dangerTheme
				break;
			case 6:
				theme = successTheme
				break;
			default:
				break;
		}

		if (darkMode) {
			theme = darkTheme
		}

		if (rtlLayout) {
			theme.direction = 'rtl'
		} else {
			theme.direction = 'ltr'
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
}


export default connect(mapStateToProps)(RctThemeProvider);
