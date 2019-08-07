import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IntlMessages from 'Util/IntlMessages';
import { isEmpty } from 'Util/lodashFunctions';
import { connect } from 'react-redux';
import { 
    getEmployees,
 } from '../../../../../../actions';

class MultiSelect extends React.Component {
  state = {
    nameIds: [],
  };

  handleChange = event => {
    this.setState({ nameIds: event.target.value });
    this.props.selectedAssignedIds(event.target.value);
  };


  componentWillMount() {
      if (isEmpty(this.props.employees)) {
          this.props.getEmployees();
      } 
  }

  render() {
    let newNames = [];
    if (this.props.employees.data) {
        newNames = this.props.employees.data;
    }
    return (
      <form autoComplete="off">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12 mt-30">
            <div className="form-group">
              <FormControl fullWidth>
                <InputLabel htmlFor="select-multiple-chip">{<IntlMessages id={'dashboard.task.form.assigned'}/>}</InputLabel>
                <Select
                  multiple
                  value={this.state.nameIds}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-chip" />}
                  >
                  {newNames.map(employee => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.first_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ employeeReducer }) {
    const { employees } = employeeReducer;

    return { employees };
}

export default connect(mapStateToProps, {
    getEmployees
})(MultiSelect);
