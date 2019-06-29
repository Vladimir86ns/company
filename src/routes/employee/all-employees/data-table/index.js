import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { columnFields, employeeDetailFields } from '../../constants';
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';
import UpdateUserForm from './UpdateUserForm';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

import { isEmpty } from '../../../../util/lodashFunctions';

import { 
    getEmployees
 } from '../../../../actions';

class AllEmployees extends Component {

    state = {
        all: false,
        users: null, // initial user data
        selectedEmployee: null, // selected user to perform operations
        loading: false, // loading activity
        addNewUserModal: false, // add new user form modal
        addNewUserDetail: {
            id: '',
            name: '',
            avatar: '',
            type: '',
            emailAddress: '',
            status: 'Active',
            lastSeen: '',
            accountType: '',
            badgeClass: 'badge-success',
            dateCreated: 'Just Now',
            checked: false
        },
        openViewUserDialog: false, // view user dialog box
        editEmployee: null,
        allSelected: false,
        selectedUsers: 0
    }

    /**
     * If employee are empty, get all employees.
     */
    componentWillMount() {
        if (isEmpty(this.props.employees)) {
            this.props.getEmployees();
        }   
    }

    /**
     * On Delete
     */
    onDelete(data) {
        //  TODO ADD LOGIC
        // this.refs.deleteConfirmationDialog.open();
        // this.setState({ selectedEmployee: data });
    }

    /**
     * View User Detail Hanlder
     */
    viewEmployeeDetail(employee) {
        this.setState({ openViewUserDialog: true, selectedEmployee: employee });
    }

    /**
     * On Edit User
     */
    onEditEmployee(employee) {
        this.setState({ addNewUserModal: true, editEmployee: employee });
    }

    /**
     * On Add & Update User Modal Close
     */
    onUpdateEmployeeModalClose() {
        this.setState({ addNewUserModal: false, editEmployee: null });
    }

    /**
     * Get all table fields from translate component.
     */
    getAllTableFields() {
        return columnFields.map((field, i) => {
            return (
                <th><IntlMessages id={`employee.table.field.${field}`} /></th>
            );
        });
    }

    /**
     * Get table fields for employee details.
     */
    getTableFieldsForEmployeeDetails() {
        const { selectedEmployee } = this.state;
        
        if (selectedEmployee === null ) {
            return (<div></div>);
        }

        return (
            <div>
                <div className="clearfix d-flex">
                    <div className="media pull-left">
                        <div className="media-body">
                            { employeeDetailFields.map((field, i) => {
                                    return (
                                        <p><IntlMessages id={`employee.table.field.${field}`} /> : <span className="fw-bold">{this.state.selectedEmployee[field]}</span></p>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * On Update User Details
     */
    onUpdateEmployeeDetails(employee) {
        this.setState({
             editEmployee: employee
        });
    }

    /**
     * Redirect to create employee page.
     */
    redirectToAddNewEmployee() {
        this.props.history.push('/app/employee/employee-information');
    }

    render() {
        const { loading, editEmployee } = this.state;
        
        return (
            <div className="user-management">
                <Helmet>
                    <title>Reactify | Users Management</title>
                    <meta name="description" content="Reactify Widgets" />
                </Helmet>
                <RctCollapsibleCard fullBlock>
                    <div className="table-responsive">
                        <div className="d-flex justify-content-between py-20 px-10 border-bottom">
                            <div>
                                <a href="javascript:void(0)" 
                                    onClick={() => this.redirectToAddNewEmployee()} 
                                    color="primary" 
                                    className="caret btn-sm mr-10">
                                        <IntlMessages id={`general.employee.add_new_employee`} />
                                    <i className="zmdi zmdi-plus"></i>
                                </a>
                            </div>
                        </div>
                        <table className="table table-middle table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {this.getAllTableFields()}
                                </tr>
                            </thead>
                            <tbody>
                                {!isEmpty(this.props.employees) && this.props.employees.data.map((employee, key) => (
                                    
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>
                                            <h5 className="mb-5 fw-bold">{employee.first_name} {employee.last_name}</h5>
                                        </td>
                                        <td>{employee.employee_company_id}</td>
                                        <td>{employee.city}</td>
                                        <td>{employee.mobile_phone}</td>
                                        <td className="list-action">
                                            <a onClick={() => this.viewEmployeeDetail(employee)}><i className="ti-eye"></i></a>
                                            <a onClick={() => this.onEditEmployee(employee)}><i className="ti-pencil"></i></a>
                                            <a onClick={() => this.onDelete(employee)}><i className="ti-close"></i></a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="border-top">
                                <tr>
                                    <td colSpan="100%">
                                        <Pagination className="mb-0 py-10 px-10">
                                            <PaginationItem>
                                                <PaginationLink previous href="#" />
                                            </PaginationItem>
                                                {new Array(isEmpty(this.props.employees) ? 0 : this.props.employees.meta.pagination.total_pages).fill(1).map((val, key) => {
                                                    return (
                                                        <PaginationItem>
                                                        <PaginationLink >{key + 1}</PaginationLink>
                                                    </PaginationItem>
                                                    );
                                                })}
                                            <PaginationItem>
                                                <PaginationLink next/>
                                            </PaginationItem>
                                        </Pagination>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    {loading &&
                        <RctSectionLoader />
                    }
                </RctCollapsibleCard>
                <DeleteConfirmationDialog
                    ref="deleteConfirmationDialog"
                    title="Are You Sure Want To Delete?"
                    message="This will delete user permanently."
                    onConfirm={() => this.deleteUserPermanently()}
                />
                <Modal isOpen={this.state.addNewUserModal} toggle={() => this.onUpdateEmployeeModalClose()}>
                    <ModalHeader toggle={() => this.onUpdateEmployeeModalClose()}>
                        <IntlMessages id={`employee.general.update_employee`} />
                    </ModalHeader>
                    <ModalBody>
                        {
                            editEmployee ?
                                <UpdateUserForm 
                                    editEmployee={editEmployee} 
                                    onUpdateUserDetail={(employee) => this.onUpdateEmployeeDetails(employee)} 
                                    onUpdateEmployeeModalClose={() => this.onUpdateEmployeeModalClose()}
                                    /> :
                                <div></div>
                        }
                    </ModalBody>
                </Modal>
                <Dialog
                    onClose={() => this.setState({ openViewUserDialog: false })}
                    open={this.state.openViewUserDialog}
                >
                    <DialogContent>
                        { this.getTableFieldsForEmployeeDetails() }
                    </DialogContent>
                </Dialog>
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
})(AllEmployees);
