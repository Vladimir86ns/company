import React from 'react';
import { connect } from 'react-redux';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

class EmployeeInformationForm extends React.Component {
    render() {
        return (
        <div className="textfields-wrapper">
            <RctCollapsibleCard heading={<IntlMessages id={'form.employee.header'} />}>
                <h1>Task Manager</h1>
            </RctCollapsibleCard>
        </div>
        );
    }
}

export default connect(null, null)(EmployeeInformationForm);