import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import IntlMessages from 'Util/IntlMessages';
import { Button } from 'reactstrap';
import {
    ModalFooter
} from 'reactstrap';
import socketApi from '../../../../../../api/socket-api';
import { getCompanyID, getAccountID } from '../../../../../../util/local-storage';

class CreateColumn extends React.Component {

    state = {
        column_name: ''
    };

    async createColumn() {
        await socketApi.post('/dashboard/column/create', {
            title: this.state.column_name,
            company_id: getCompanyID(),
            account_id: getAccountID()
        });
        this.props.closeModal();
    }

    /**
     * Update the state.
     */
    handleChange = (key) => event => {
        this.setState({
            [key]: event.target.value,
        });
    };

    render() {
        return (
            <div className="textfields-wrapper">
                    <form noValidate autoComplete="off">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-xl-12">
                                <TextField 
                                    id="column_name" 
                                    fullWidth 
                                    label={<IntlMessages id={`dashboard.column.form.column_name`} />}
                                    value={this.state.column_name}
                                    onChange={this.handleChange('column_name')} 
                                    autoComplete="off"/>
                            </div>
                        </div>
                        <ModalFooter>
                            <Button 
                                variant="raised" 
                                color="primary" 
                                className="text-white" 
                                onClick={() => this.createColumn()}>
                                    <IntlMessages id={`button.create`} />
                            </Button>
                            {' '}
                            <Button 
                                variant="raised" 
                                className="text-white btn-danger" 
                                onClick={() => this.props.closeModal()}>
                                    <IntlMessages id={`button.cancel`} />
                            </Button>
                        </ModalFooter>
                    </form>
            </div>
        );
    }
}

export default connect(null, null)(CreateColumn);