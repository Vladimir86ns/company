export const RESET_TIME_VALIDATION_MESSAGE = 5000;

export const fieldNamesAndRules = [
    {
        name: 'first_name',
        rule: 'required|min:3|max:100'
    },
    {
        name: 'last_name',
        rule: 'required|min:1|max:100'
    },
    {
        name: 'email',
        rule: 'required|email|max:100',
    },
    {
        name: 'country',
        rule: 'required|max:100'
    },
    {
        name: 'city',
        rule: 'required|max:100'
    },
    {
        name: 'address',
        rule: 'required|min:3|max:100'
    },
    {
        name: 'mobile_phone',
        rule: 'max:20'
    },
    {
        name: 'phone_number',
        rule: 'max:20'
    },
    {
        name: 'employee_company_id',
        rule: 'required|min:3|max:100'
    }
];

export const columnFields = [
    'full_name',
    'employee_company_id',
    'city',
    'mobile_phone',
    'action'
];

export const employeeDetailFields = [
    'first_name',
    'last_name',
    'email',
    'country',
    'city',
    'address',
    'mobile_phone',
    'phone_number',
    'hire_date'
];