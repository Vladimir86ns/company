// routes
import WorkOrderTables from 'Routes/company/all-orders/table';
import CompanyInformationForm from 'Routes/company/add-new';
import EmployeesTables from 'Routes/user/all-employees/table';
import UserInformationForm from 'Routes/user/add-new';

export default [
   {
      path: 'work-order-tables',
      component: WorkOrderTables
   },
   {
      path: 'company-information-form',
      component: CompanyInformationForm
   },
   {
      path: 'employees-tables',
      component: EmployeesTables
   },
   {
      path: 'user-information-form',
      component: UserInformationForm
   },
]