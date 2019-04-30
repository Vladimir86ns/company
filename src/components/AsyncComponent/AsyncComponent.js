/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// Basic Table
const AsyncTableComponent = Loadable({
   loader: () => import("Routes/work-order/all-orders"),
   loading: () => <RctPageLoader />,
});

// forms TextField
const AsyncTextFieldComponent = Loadable({
   loader: () => import("Routes/work-order/add-new/material-text-field"),
   loading: () => <RctPageLoader />,
});

export {
   AsyncTableComponent,
   AsyncTextFieldComponent
};
