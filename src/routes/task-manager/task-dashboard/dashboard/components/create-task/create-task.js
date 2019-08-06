import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'Util/IntlMessages';
import { Button } from 'reactstrap';
import { ModalFooter} from 'reactstrap';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MultiSelect from '../multiselect-form/multiselect';

import socketApi from '../../../../../../api/socket-api';
import { getCompanyID, getUserID } from '../../../../../../util/local-storage';

class CreateTask extends Component {

    state = {
        task_name: '',
        description: '',
        everybodyCanSee: 'no',
    };

    /**
     * Create new task on API.
     */
    async createTask() {
        await socketApi.post('/dashboard/task/create', {
            title: this.state.task_name,
            description: this.state.description,
            company_id: getCompanyID(),
            author_id: getUserID(),
            column_id: this.props.columnId,
            column_order_id: this.props.columnOrderId
        });
        this.props.closeModal();
    }

    /**
     * Update state.
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
                        <div className="col-sm-6 col-md-6 col-xl-6">
                            <TextField
                                id="column_name" 
                                fullWidth 
                                label={<IntlMessages id={`dashboard.task.form.task_name`} />}
                                value={this.state.column_name}
                                onChange={this.handleChange('task_name')} 
                                autoComplete="off"/>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-12 mt-30">
                            <TextField
                                id="column_name"
                                multiline
                                fullWidth 
                                label={<IntlMessages id={`dashboard.task.form.description`} />}
                                value={this.state.column_name}
                                onChange={this.handleChange('description')} 
                                autoComplete="off"/>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-12 mt-3">
                            <MultiSelect />
                            <RadioGroup aria-label="position" name="position" value={this.state.everybodyCanSee} row>
                            <FormControlLabel
                                onClick={() => this.handleChangeRadio()}
                                value="yes"
                                control={<Radio color="primary" />}
                                label={<IntlMessages id={'dashboard.task.form.only_assigned_people_can_see'}/>}
                                labelPlacement="yes"
                                />
                            </RadioGroup>
                        </div>
                    </div>
                    <ModalFooter>
                        <Button 
                            variant="raised" 
                            color="primary" 
                            className="text-white" 
                            onClick={() => this.createTask()}>
                                <IntlMessages id={`button.create`} />
                        </Button>
                        {' '}
                        <Button 
                            variant="raised" 
                            className="text-white btn-primary" 
                            onClick={() => this.props.closeModal()}>
                                <IntlMessages id={`button.cancel`} />
                        </Button>
                    </ModalFooter>
                </form>
            </div>
        );
    }
}

export default CreateTask;