// sidebar nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.user_settings",
         "menu_icon": "zmdi zmdi-accounts",
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
      }
   ]
}
