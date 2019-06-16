import CompanyInformationForm from 'Routes/company/add-new';
import UserInformationForm from 'Routes/user/add-new';

export default [
   {
      path: 'company-information',
      component: CompanyInformationForm
   },
   {
      path: 'user-information',
      component: UserInformationForm
   },
];