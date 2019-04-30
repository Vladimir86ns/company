/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// ecommerce dashboard
const AsyncEcommerceDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/ecommerce"),
   loading: () => <RctPageLoader />,
});

// agency dashboard
const AsyncSaasDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/saas"),
   loading: () => <RctPageLoader />,
});

// agency dashboard
const AsyncAgencyDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/agency"),
   loading: () => <RctPageLoader />,
});

// boxed dashboard
const AsyncNewsDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/news"),
   loading: () => <RctPageLoader />,
});

// crm dashboard
const AsyncCrmComponent = Loadable({
   loader: () => import("Routes/crm/dashboard"),
   loading: () => <RctPageLoader />,
});

//  ********  START FROM HERE

// Basic Table
const AsyncBasicTableComponent = Loadable({
   loader: () => import("Routes/tables/basic"),
   loading: () => <RctPageLoader />,
});

// forms TextField
const AsyncTextFieldComponent = Loadable({
   loader: () => import("Routes/work-order/add-new/material-text-field"),
   loading: () => <RctPageLoader />,
});

export {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
   AsyncCrmComponent,

   //  ********  START FROM HERE
   AsyncBasicTableComponent,
   AsyncTextFieldComponent
};
