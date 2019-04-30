/**
 * Forms Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import {
	AsyncTextFieldComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Forms = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>Reactify | Form Elements</title>
			<meta name="description" content="Reactify Form Elements" />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/form-elements`} />
			<Route path={`${match.url}/text-field`} component={AsyncTextFieldComponent} />
		</Switch>
	</div>
);

export default Forms;
