// sidebar nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.workOrder",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "path": "/app/work-order-tables/basic",
               "new_item": false,
               "menu_title": "sidebar.allOrders"
            },
            {
               "path": "/app/work-order-forms/text-field",
               "new_item": false,
               "menu_title": "sidebar.addNew"
            },
         ]
      },
      {
         "menu_title": "sidebar.employees",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "path": "/app/employees-tables/basic",
               "new_item": false,
               "menu_title": "sidebar.allEmployees"
            },
            {
               "path": "/app/employees-forms/text-field",
               "new_item": false,
               "menu_title": "sidebar.addNew"
            },
         ]
      }
   ]
}
