/**
 * Material Text Field
 */
import React from 'react';
import TextField from '@material-ui/core/TextField';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class CompanyInformationForm extends React.Component {

  state = {
    name: '',
    address: '',
    country: '',
    mobile_phone: '',
    phone: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="textfields-wrapper">
        <RctCollapsibleCard heading={<IntlMessages id={'form.company.header'} />}>
          <form noValidate autoComplete="off">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="name" fullWidth label={<IntlMessages id={'form.company.name'} />} value={this.state.name} onChange={this.handleChange('name')} autoComplete="off"/>
                </div>
                <div className="form-group">
                  <TextField id="mobile_phone" fullWidth label={<IntlMessages id={'form.company.mobile_phone'} />} value={this.state.mobile_phone} onChange={this.handleChange('mobile_phone')} autoComplete="off"/>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="country" fullWidth label={<IntlMessages id={'form.company.country'} />} value={this.state.country} onChange={this.handleChange('country')} autoComplete="off"/>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="address" fullWidth label={<IntlMessages id={'form.company.address'} />} value={this.state.address} onChange={this.handleChange('address')} autoComplete="off"/>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="phone" fullWidth label={<IntlMessages id={'form.company.phone'} />} value={this.state.phone} onChange={this.handleChange('phone')} autoComplete="off"/>
                </div>
              </div>
            </div>
          </form>
        </RctCollapsibleCard>
      </div>
    );
  }
}
