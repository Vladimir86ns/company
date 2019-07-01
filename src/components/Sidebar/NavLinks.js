// sidebar nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.user_settings",
         "menu_icon": "zmdi zmdi-account",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "path": "/app/user-information",
               "new_item": false,
               "menu_title": "sidebar.my_profile"
            },
         ]
      },
      {
         "menu_title": "sidebar.company",
         "menu_icon": "zmdi zmdi-store",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "path": "/app/company-information",
               "new_item": false,
               "menu_title": "sidebar.company_info"
            },
         ]
      },
      {
         "menu_title": "sidebar.employees",
         "menu_icon": "zmdi zmdi-accounts",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "path": "/app/employee/all-employees",
               "new_item": false,
               "menu_title": "sidebar.all_employees"
            },
            {
               "path": "/app/employee/employee-information",
               "new_item": false,
               "menu_title": "sidebar.add_employee"
            }
         ]
      }
   ]
};
