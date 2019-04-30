/**
 * Basic Table
 */
import React, { Component, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Media, Badge } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';

// api
import api from 'Api';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// For Basic Table
let id = 0;

function createData(name, calories, fat, carbs, protein) {
   id += 1;
   return { id, name, calories, fat, carbs, protein };
}

class BasicTable extends Component {

   state = {
      employeePayroll: null
   }

   componentDidMount() {
      this.getEmployeePayrolls();
   }

   // get employee payrols
   getEmployeePayrolls() {
      api.get('employeePayrols.js')
         .then((response) => {
            this.setState({ employeePayroll: response.data });
         })
         .catch(error => {
            // error handling
         })
   }

   render() {
      const { employeePayroll } = this.state;
      const { match } = this.props;
      return (
         <div className="table-wrapper">
            <PageTitleBar title={<IntlMessages id="sidebar.basic" />} match={match} />
            <RctCollapsibleCard heading="Work List" fullBlock>
               <div className="table-responsive">
                  <Table>
                     <TableHead>
                        <TableRow hover>
                           <TableCell>Name</TableCell>
                           <TableCell>Designation</TableCell>
                           <TableCell>Salary</TableCell>
                           <TableCell>Status</TableCell>
                           <TableCell>Action</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        <Fragment>
                           {employeePayroll && employeePayroll.map((employee, key) => (
                              <TableRow hover key={key}>
                                 <TableCell>
                                    <Media>
                                       <Media left>
                                          <Media object src={employee.employeeAvatar} alt="User Profile 1" className="rounded-circle mr-20" width="40" height="40" />
                                       </Media>
                                       <Media body><h5 className="m-0 pt-15">{employee.employeeName}</h5></Media>
                                    </Media>
                                 </TableCell>
                                 <TableCell>{employee.designation}</TableCell>
                                 <TableCell>${employee.salary}</TableCell>
                                 {employee.status === 1 ?
                                    <TableCell><Badge color="success">Done</Badge></TableCell>
                                    : <TableCell><Badge color="warning">Done</Badge></TableCell>
                                 }
                                 <TableCell>
                                    <IconButton className="text-success" aria-label="Delete"><i className="zmdi zmdi-check-all"></i></IconButton>
                                    <IconButton className="text-danger" aria-label="Add an alarm"><i className="zmdi zmdi-close"></i></IconButton>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </Fragment>
                     </TableBody>
                  </Table>
               </div>
            </RctCollapsibleCard>
         </div>
      );
   }
}

export default BasicTable;
