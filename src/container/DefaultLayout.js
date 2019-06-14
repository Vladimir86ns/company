import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RctAppLayout from 'Components/RctAppLayout';
import routerService from "../services/_routerService";
import IntlMessages from 'Util/IntlMessages';
import { isEmpty } from 'Util/lodashFunctions';

class DefaultLayout extends Component {

    /**
     * Check does user has all information.
     * @param {object} user
    */
    checkUserHasAllInformation(user) {
        if (!isEmpty(user) && !user.company_settings_done && !user.user_settings_done) {
            return (
                <div className="alert alert-info">
                    <p>{ <IntlMessages id={'welcome.company_and_user_information_one'}/> }</p>
                    <p>{ <IntlMessages id={'welcome.company_and_user_information_two'}/> }</p>
                </div>
            );
        };
	};

	render() {
		const { match, user } = this.props;

		let welcomeMessage = this.checkUserHasAllInformation(user);

		return (
			<RctAppLayout>
				{welcomeMessage}
				{routerService && routerService.map((route,key)=>
					<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
				)}
			</RctAppLayout>
		);
	}
}

// map state to props
const mapStateToProps = ({ userReducer }) => {
	const { user } = userReducer;
	return { user };
};

export default withRouter(connect(mapStateToProps, null)(DefaultLayout));
