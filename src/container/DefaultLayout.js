/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RctAppLayout from 'Components/RctAppLayout';
import routerService from "../services/_routerService";
import IntlMessages from 'Util/IntlMessages';

class DefaultLayout extends Component {
	render() {
		const { match } = this.props;

		let welcomeMessage = (<div></div>);
		// TODO check is does user has all information.
		if (true) {
			welcomeMessage = (
				<div className="alert alert-info">
					<p>{ <IntlMessages id={'welcome.company_and_user_information_one'}/> }</p>
					<p>{ <IntlMessages id={'welcome.company_and_user_information_two'}/> }</p>
				</div>
			);
		}

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

export default withRouter(connect(null)(DefaultLayout));
