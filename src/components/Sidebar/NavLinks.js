// sidebar nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.user_settings",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "path": "/app/employees-forms/text-field",
               "new_item": false,
               "menu_title": "sidebar.my_profile"
            },
         ]
      },
      {
         "menu_title": "sidebar.company",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "path": "/app/work-order-forms/text-field",
               "new_item": false,
               "menu_title": "sidebar.company_settings"
            },
         ]
      }
   ]
}
