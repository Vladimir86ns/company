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

// Company Form
const AsyncCompanyInformationFormComponent = Loadable({
   loader: () => import("Routes/company/add-new/form"),
   loading: () => <RctPageLoader />,
});

// Employees Table
const AsyncEmployeesTableComponent = Loadable({
   loader: () => import("Routes/user/all-employees"),
   loading: () => <RctPageLoader />,
});

// User Form
const AsyncUserInformationFormComponent = Loadable({
   loader: () => import("Routes/user/add-new/form"),
   loading: () => <RctPageLoader />,
});

export {
   AsyncWorkOrderTableComponent,
   AsyncCompanyInformationFormComponent,
   AsyncEmployeesTableComponent,
   AsyncUserInformationFormComponent
};
