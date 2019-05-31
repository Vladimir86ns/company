/**
 * Material Text Field
 */
import React from 'react';
import TextField from '@material-ui/core/TextField';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class TextFields extends React.Component {

  state = {
    first_name: '',
    last_name: '',
    country: '',
    city: '',
    address: '',
    phone: '',
    mobile_phone: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="textfields-wrapper">
        <RctCollapsibleCard heading={<IntlMessages id={'form.user.header'} />}>
          <form noValidate autoComplete="off">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="first_name" fullWidth label={<IntlMessages id={'form.user.first_name'} />} value={this.state.first_name} onChange={this.handleChange('first_name')} />
                </div>
                <div className="form-group">
                  <TextField id="address" fullWidth label={<IntlMessages id={'form.user.address'} />} value={this.state.address} onChange={this.handleChange('address')} />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="last_name" fullWidth label={<IntlMessages id={'form.user.last_name'} />} value={this.state.last_name} onChange={this.handleChange('last_name')} />
                </div>
                <div className="form-group">
                  <TextField id="phone" fullWidth label={<IntlMessages id={'form.user.phone'} />} value={this.state.phone} onChange={this.handleChange('phone')} />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="country" fullWidth label={<IntlMessages id={'form.user.country'} />} value={this.state.country} onChange={this.handleChange('country')} />
                </div>
                <div className="form-group">
                  <TextField id="mobile_phone" fullWidth label={<IntlMessages id={'form.user.mobile_phone'} />} value={this.state.mobile_phone} onChange={this.handleChange('mobile_phone')} />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="city" fullWidth label={<IntlMessages id={'form.user.city'} />} value={this.state.city} onChange={this.handleChange('city')} />
                </div>
              </div>
            </div>
          </form>
        </RctCollapsibleCard>
      </div>
    );
  }
}
