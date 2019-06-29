import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import IntlMessages from 'Util/IntlMessages';
import { isEmpty } from '../../../../util/lodashFunctions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Media } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';

import { 
    getEmployees
 } from '../../../../actions';

const columnFields = [
    'full_name',
    'employee_company_id',
    'city',
    'address',
    'mobile_phone',
    'hire_date',
    'action'
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
        return columnFields.map((field, i) => {
            return (
                <TableCell key={i}><IntlMessages id={`employee.table.field.${field}`} /></TableCell>
            );
        });
    }

    /**
     * Get data for table columns;
     */
    getDataForTable() {
        var tableData = (<TableRow></TableRow>);

        if (this.props.employees.length > 0) {
            tableData = this.props.employees.map((employee, i) => {
                return (
                    <TableRow hover key={i}>
                        <TableCell>
                            <Media>
                                <Media body><h5 className="m-0 pt-15">{`${employee.first_name}  ${employee.last_name}`}</h5></Media>
                            </Media>
                        </TableCell>
                        <TableCell>{employee.employee_company_id}</TableCell>
                        <TableCell>{employee.city}</TableCell>
                        <TableCell>{employee.address}</TableCell>
                        <TableCell>{employee.mobile_phone}</TableCell>
                        <TableCell>{employee.hire_date}</TableCell>
                        <TableCell>
                            <IconButton className="text-success" aria-label="Delete"><i className="zmdi zmdi-check-all"></i></IconButton>
                            <IconButton className="text-danger" aria-label="Add an alarm"><i className="zmdi zmdi-close"></i></IconButton>
                        </TableCell>
                    </TableRow>
                );
            });
        }

        return tableData;
    }

    render() {
        var tableData = this.getDataForTable();
        let tableFields = this.getAllTableFields();

        return (
            <div className="data-table-wrapper">
                <RctCollapsibleCard heading={<IntlMessages id={'employee.table.header.employees_list'} />} fullBlock>
                    <div className="table-responsive">
                        <Table>
                            <TableHead>
                                <TableRow hover>
                                    {tableFields}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <Fragment>
                                    {tableData}
                                </Fragment>
                            </TableBody>
                        </Table>
                    </div>
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
