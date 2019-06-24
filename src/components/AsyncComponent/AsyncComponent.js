import React from 'react';
import Loadable from 'react-loadable';
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// Company Form
const AsyncCompanyInformationFormComponent = Loadable({
   loader: () => import("Routes/company/add-new/form"),
   loading: () => <RctPageLoader />,
});

// User Form
const AsyncUserInformationFormComponent = Loadable({
   loader: () => import("Routes/user/add-new/form"),
   loading: () => <RctPageLoader />,
});

// Basic Table
const AsyncAllEmployeesComponent = Loadable({
	loader: () => import("Routes/employee/all-employees/data-table"),
	loading: () => <RctPageLoader />,
});

export {
   AsyncCompanyInformationFormComponent,
   AsyncUserInformationFormComponent,
   AsyncAllEmployeesComponent
};
