import CompanyInformationForm from 'Routes/company/add-new';
import UserInformationForm from 'Routes/user/add-new';
import AllEmployees from 'Routes/employee/all-employees';
import EmployeeInformation from 'Routes/employee/add-new';

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
   {
      path: 'employee',
      component: EmployeeInformation
   },
];