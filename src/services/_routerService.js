import CompanyInformationForm from 'Routes/company/add-new';
import UserInformationForm from 'Routes/user/add-new';
import AllEmployees from 'Routes/employee/all-employees';

export default [
   {
      path: 'company-information',
      component: CompanyInformationForm
   },
   {
      path: 'user-information',
      component: UserInformationForm
   },
   {
		path: 'employee',
		component: AllEmployees
	},
];