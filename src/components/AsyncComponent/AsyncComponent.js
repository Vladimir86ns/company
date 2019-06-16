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

export {
   AsyncCompanyInformationFormComponent,
   AsyncUserInformationFormComponent
};
