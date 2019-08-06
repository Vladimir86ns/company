import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import IntlMessages from 'Util/IntlMessages';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default class MultiSelect extends React.Component {
  state = {
    name: [],
  };
  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <form autoComplete="off">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12 mt-30">
            <div className="form-group">
              <FormControl fullWidth>
                <InputLabel htmlFor="select-multiple-chip">{<IntlMessages id={'dashboard.task.form.assigned'}/>}</InputLabel>
                <Select
                  multiple
                  value={this.state.name}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div>
                      {selected.map(value => <Chip key={value} label={value} />)}
                    </div>
                  )} MenuProps={MenuProps}>
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
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
