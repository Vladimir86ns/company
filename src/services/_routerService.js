// routes
import Tables from 'Routes/work-order/all-orders/table';
import FormElements from 'Routes/work-order/add-new';

export default [
   {
      path: 'tables',
      component: Tables
   },
   {
      path: 'forms',
      component: FormElements
   },
]