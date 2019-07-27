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

// Employee all
const AsyncAllEmployeesComponent = Loadable({
    loader: () => import("Routes/employee/all-employees/data-table"),
    loading: () => <RctPageLoader />,
});

// Employee add
const AsyncEmployeeInformationComponent = Loadable({
   loader: () => import("Routes/employee/add-new/form"),
   loading: () => <RctPageLoader />
});

// Task manger
const AsyncTaskManagerComponent = Loadable({
   loader: () => import("Routes/task-manager/task-dashboard/dashboard"),
   loading: () => <RctPageLoader />
});

export {
   AsyncCompanyInformationFormComponent,
   AsyncUserInformationFormComponent,
   AsyncAllEmployeesComponent,
   AsyncEmployeeInformationComponent,
   AsyncTaskManagerComponent
};
