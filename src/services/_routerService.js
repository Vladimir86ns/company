// routes
import WorkOrderTables from 'Routes/work-order/all-orders/table';
import WorkOrderFormElements from 'Routes/work-order/add-new';
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