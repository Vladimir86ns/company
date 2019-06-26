import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import IntlMessages from 'Util/IntlMessages';
import { isEmpty } from '../../../../util/lodashFunctions';
import { returnDataForTable } from '../../../../util/helper';

import { 
    getEmployees
 } from '../../../../actions';

const columnFields = [
    'first_name',
    'last_name',
    'country',
    'city',
    'address',
    'phone_number',
    'mobile_phone',
    'employee_company_id',
    'hire_date'
];

class DataTable extends React.Component {

    /**
     * If employee are empty, get all employees.
     */
    componentWillMount() {
        if (isEmpty(this.props.employees)) {
            this.props.getEmployees();
        }   
    }

    /**
     * Get all table fields from translate component.
     */
    getAllTableFields() {
        let allColumns = [];

        columnFields.forEach(val => {
            const test = (<IntlMessages id={`employee.table.field.first_name`} />);

            console.log('TEST : ', test);
            allColumns.push({
                // label: (<IntlMessages id={`employee.table.field.${val}`} />),
                label: val,
                options: {
                   
                }
            });
        });

        return allColumns;
    }

    /**
     * Get all options for table.
     */
    getTableOptions() {
        return {
            filterType: 'dropdown',
            responsive: 'scroll',
            download: false,
            print: false,
            viewColumns: false
        };
    }

    /**
     * Get data for table columns;
     */
    getDataForTable() {
        let data = [];

        if (!isEmpty(this.props.employees)) {
            data = returnDataForTable(this.props.employees, ['id']);
        };

        return data;
    }

    render() {
        return (
            <div className="data-table-wrapper">
                <RctCollapsibleCard fullBlock>
                    <MUIDataTable
                        title={ <IntlMessages id={'employee.table.header.employees_list'} /> }
                        data={ this.getDataForTable() }
                        columns={ this.getAllTableFields() }
                        options={ this.getTableOptions() }
                    />
                </RctCollapsibleCard>
            </div>
        );
    }
}

function mapStateToProps({ employeeReducer }) {
    const { employees } = employeeReducer;

    return { employees };
}

export default connect(mapStateToProps, {
    getEmployees
})(DataTable);
