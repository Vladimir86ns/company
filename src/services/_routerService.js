// routes
import WorkOrderTables from 'Routes/company/all-orders/table';
import WorkOrderFormElements from 'Routes/company/add-new';
import EmployeesTables from 'Routes/employees/all-employees/table';
import EmployeesFormElements from 'Routes/employees/add-new';

export default [
   {
      path: 'work-order-tables',
      component: WorkOrderTables
   },
   {
      path: 'work-order-forms',
      component: WorkOrderFormElements
   },
   {
      path: 'employees-tables',
      component: EmployeesTables
   },
   {
      path: 'employees-forms',
      component: EmployeesFormElements
   },
]