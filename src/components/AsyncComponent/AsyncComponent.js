/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// Work Order Table
const AsyncWorkOrderTableComponent = Loadable({
   loader: () => import("Routes/company/all-orders"),
   loading: () => <RctPageLoader />,
});

// Work Order Form
const AsyncWorkOrderFormComponent = Loadable({
   loader: () => import("Routes/company/add-new/form"),
   loading: () => <RctPageLoader />,
});

// Employees Table
const AsyncEmployeesTableComponent = Loadable({
   loader: () => import("Routes/employees/all-employees"),
   loading: () => <RctPageLoader />,
});

// Employees Form
const AsyncEmployeesFormComponent = Loadable({
   loader: () => import("Routes/employees/add-new/form"),
   loading: () => <RctPageLoader />,
});

export {
   AsyncWorkOrderTableComponent,
   AsyncWorkOrderFormComponent,
   AsyncEmployeesTableComponent,
   AsyncEmployeesFormComponent
};
