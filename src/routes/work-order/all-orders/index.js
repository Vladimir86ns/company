/**
 * Tables Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import {
    AsyncTableComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Pages = ({ match }) => (
    <div className="content-wrapper">
        <Helmet>
            <title>Reactify | Tables</title>
            <meta name="description" content="Reactify Tables" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/all-orders/table`} />
            <Route path={`${match.url}/all-orders/table`} component={AsyncTableComponent} />
        </Switch>
    </div>
);

export default Pages;
