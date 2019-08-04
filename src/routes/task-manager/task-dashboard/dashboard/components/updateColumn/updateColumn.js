import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'Util/IntlMessages';
import { Button } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import {
    ModalFooter
} from 'reactstrap';
import socketApi from '../../../../../../api/socket-api';
import { getCompanyID } from 'Util/local-storage';

class UpdateColumn extends Component {

    state = {
        column_name: '',
        column_name_original: ''
    };

    componentWillMount() {
        this.setState({column_name: this.props.column.title, column_name_original: this.props.column.title});
    }

    /**
     * Check is name of column changes, and update if is it changed.
     */
    async updateColumn() {
        const { column_name, column_name_original } = this.state;
        if (column_name === column_name_original) {
            return NotificationManager.error(<IntlMessages id={`notification_manager.error.nothing_changed`} />);
        }

        await socketApi.post('/dashboard/column/update', {
            title: column_name,
            company_id: getCompanyID(),
            column_id: this.props.column.id
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
                            onClick={() => this.updateColumn()}>
                                <IntlMessages id={`button.update`} />
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

export default UpdateColumn;