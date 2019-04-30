// routes
import Dashboard from 'Routes/dashboard';
import Crm from 'Routes/crm';
import Tables from 'Routes/work-order/all-orders/table';
import FormElements from 'Routes/work-order/add-new';

export default [
   {
      path: 'dashboard',
      component: Dashboard
   },
   {
      path: 'crm',
      component: Crm
   },

   //  ********  START FROM HERE
   {
      path: 'tables',
      component: Tables
   },
   {
      path: 'forms',
      component: FormElements
   },
]