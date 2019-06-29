/**
 * User Management Page
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import {
	Pagination,
	PaginationItem,
	PaginationLink,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Badge
} from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { NotificationManager } from 'react-notifications';
import Avatar from '@material-ui/core/Avatar';
import { columnFields } from '../../constants';

// api
import api from 'Api';

// delete confirmation dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';

// // add new user form
// import AddNewUserForm from './AddNewUserForm';

// // update user form
import UpdateUserForm from './UpdateUserForm';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

import { 
    getEmployees
 } from '../../../../actions';
import { isEmpty } from '../../../../util/lodashFunctions';

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
		this.refs.deleteConfirmationDialog.open();
		this.setState({ selectedEmployee: data });
	}

	/**
	 * Delete User Permanently
	 */
	deleteUserPermanently() {
		const { selectedEmployee } = this.state;
		let users = this.state.users;
		let indexOfDeleteUser = users.indexOf(selectedEmployee);
		users.splice(indexOfDeleteUser, 1);
		this.refs.deleteConfirmationDialog.close();
		this.setState({ loading: true });
		let self = this;
		setTimeout(() => {
			self.setState({ loading: false, users, selectedEmployee: null });
			NotificationManager.success('User Deleted!');
		}, 2000);
	}

	/**
	 * Open Add New User Modal
	 */
	opnAddNewUserModal() {
		this.setState({ addNewUserModal: true });
	}

	/**
	 * On Reload
	 */
	onReload() {
		this.setState({ loading: true });
		let self = this;
		setTimeout(() => {
			self.setState({ loading: false });
		}, 2000);
	}

	/**
	 * On Select User
	 */
	onSelectUser(user) {
		user.checked = !user.checked;
		let selectedUsers = 0;
		let users = this.state.users.map(userData => {
			if (userData.checked) {
				selectedUsers++;
			}
			if (userData.id === user.id) {
				if (userData.checked) {
					selectedUsers++;
				}
				return user;
			} else {
				return userData;
			}
		});
		this.setState({ users, selectedUsers });
	}

	/**
	 * On Change Add New User Details
	 */
	onChangeAddNewUserDetails(key, value) {
		this.setState({
			addNewUserDetail: {
				...this.state.addNewUserDetail,
				[key]: value
			}
		});
	}

	/**
	 * Add New User
	 */
	addNewUser() {
		const { name, emailAddress } = this.state.addNewUserDetail;
		if (name !== '' && emailAddress !== '') {
			let users = this.state.users;
			let newUser = {
				...this.state.addNewUserDetail,
				id: new Date().getTime()
			}
			users.push(newUser);
			this.setState({ addNewUserModal: false, loading: true });
			let self = this;
			setTimeout(() => {
				self.setState({ loading: false, users });
				NotificationManager.success('User Created!');
			}, 2000);
		}
	}

	/**
	 * View User Detail Hanlder
	 */
	viewUserDetail(employee) {
		this.setState({ openViewUserDialog: true, selectedEmployee: employee });
	}

	/**
	 * On Edit User
	 */
	onEditUser(employee) {
		this.setState({ addNewUserModal: true, editEmployee: employee });
	}

	/**
	 * On Add & Update User Modal Close
	 */
	onAddUpdateUserModalClose() {
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
	 * On Update User Details
	 */
	onUpdateEmployeeDetails(key, value) {
		this.setState({
			editEmployee: {
				...this.state.editEmployee,
				[key]: value
			}
		});
	}

	/**
	 * Update User
	 */
	updateEmployee() {
		console.log('Update Employee');
	}

	render() {
        const { users, loading, selectedEmployee, editEmployee, allSelected, selectedUsers } = this.state;
        
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
								<a href="javascript:void(0)" onClick={() => this.opnAddNewUserModal()} color="primary" className="caret btn-sm mr-10">Add New Employee  <i className="zmdi zmdi-plus"></i></a>
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
											<a onClick={() => this.viewUserDetail(employee)}><i className="ti-eye"></i></a>
											<a onClick={() => this.onEditUser(employee)}><i className="ti-pencil"></i></a>
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
				<Modal isOpen={this.state.addNewUserModal} toggle={() => this.onAddUpdateUserModalClose()}>
					<ModalHeader toggle={() => this.onAddUpdateUserModalClose()}>
						{editEmployee === null ?
							'Add New User' : 'Update User'
						}
					</ModalHeader>
					<ModalBody>
						{
							editEmployee ?
								<UpdateUserForm employee={editEmployee} onUpdateUserDetail={(key, val) => this.onUpdateEmployeeDetails(key, val)} /> :
								<div></div>
						}
					</ModalBody>
					<ModalFooter>
						<Button variant="raised" color="primary" className="text-white" onClick={() => this.updateEmployee()}>Update</Button>
						{' '}
						<Button variant="raised" className="text-white btn-danger" onClick={() => this.onAddUpdateUserModalClose()}>Cancel</Button>
					</ModalFooter>
				</Modal>
				<Dialog
					onClose={() => this.setState({ openViewUserDialog: false })}
					open={this.state.openViewUserDialog}
				>
					<DialogContent>
						{selectedEmployee !== null &&
							<div>
								<div className="clearfix d-flex">
									<div className="media pull-left">
										<div className="media-body">
											<p>First Name : <span className="fw-bold">{selectedEmployee.first_name}</span></p>
											<p>Last Name : <span className="fw-bold">{selectedEmployee.last_name}</span></p>
											<p>Country : <span className="fw-bold">{selectedEmployee.country}</span></p>
											<p>City : <span className="fw-bold">{selectedEmployee.city}</span></p>
											<p>Address : <span className="fw-bold">{selectedEmployee.address}</span></p>
											<p>Mobile Phone : <span className="fw-bold">{selectedEmployee.mobile_phone}</span></p>
											<p>Phone Number : <span className="fw-bold">{selectedEmployee.phone_number}</span></p>
											<p>Employee Id : <span className="fw-bold">{selectedEmployee.employee_company_id}</span></p>
										</div>
									</div>
								</div>
							</div>
						}
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
