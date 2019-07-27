/**
 * Forms Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import {
	AsyncTaskManagerComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Forms = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>Reactify | Form Elements</title>
			<meta name="description" content="Reactify Form Elements" />
		</Helmet>
		<Switch>
			<Route path={`${match.url}/dashboard`} component={AsyncTaskManagerComponent} />
		</Switch>
	</div>
);

export default Forms;
