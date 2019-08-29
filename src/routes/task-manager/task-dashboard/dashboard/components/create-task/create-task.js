import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'Util/IntlMessages';
import { Button } from 'reactstrap';
import { ModalFooter} from 'reactstrap';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MultiSelect from '../multiselect-form/multiselect';

import socketApi from '../../../../../../api/socket-api';
import { getCompanyID, getUserID, getAccountID } from '../../../../../../util/local-storage';

class CreateTask extends Component {

    state = {
        task_name: '',
        description: '',
        everybodyCanSee: 'no',
        first_time_changed: false,
        assignedIds: []
    };

    /**
     * Create new task on API.
     */
    async createTask() {
        await socketApi.post('/dashboard/task/create', {
            title: this.state.task_name,
            description: this.state.description,
            company_id: getCompanyID(),
            account_id: getAccountID(),
            author_id: getUserID(),
            author_name: `${this.props.user.first_name} ${this.props.user.last_name}`,
            column_id: this.props.columnId,
            assigned_ids: this.state.assignedIds,
            column_order_id: this.props.columnOrderId,
            only_assigned_can_see: this.state.everybodyCanSee === 'yes'
        });
        this.props.closeModal();
    }

    handleChangeAssignedIds = ids => {
        if (!this.state.first_time_changed && this.state.everybodyCanSee === 'no') {
            this.setState({ assignedIds: ids, everybodyCanSee: 'yes', first_time_changed: true });
            return;
        }
        this.setState({ assignedIds: ids });
    };

    /**
     * Update state.
     */
    handleChange = (key) => event => {
        this.setState({
            [key]: event.target.value,
        });
    };


    handleChangeRadio() {
        if (this.state.everybodyCanSee === 'yes') {
            this.setState({everybodyCanSee: 'no'});
        } else {
            this.setState({everybodyCanSee: 'yes'});
        }
    }

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
                            <MultiSelect selectedAssignedIds={(ids)=> this.handleChangeAssignedIds(ids)}/>
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

function mapStateToProps({ userReducer }) {
    const { user } = userReducer;

    return { user };
}

export default connect(mapStateToProps, null)(CreateTask);