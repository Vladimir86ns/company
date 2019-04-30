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
               "path": "/app/tables/basic",
               "new_item": false,
               "menu_title": "sidebar.allOrders"
            },
            {
               "path": "/app/forms/text-field",
               "new_item": false,
               "menu_title": "sidebar.addNew"
            },
         ]
      }
   ]
}
