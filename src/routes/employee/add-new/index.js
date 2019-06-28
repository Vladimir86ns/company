/**
 * Forms Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import {
	AsyncEmployeeInformationComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Forms = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>Reactify | Form Elements</title>
			<meta name="description" content="Reactify Form Elements" />
		</Helmet>
		<Switch>
			<Route path={`${match.url}/employee-information`} component={AsyncEmployeeInformationComponent} />
		</Switch>
	</div>
);

export default Forms;
