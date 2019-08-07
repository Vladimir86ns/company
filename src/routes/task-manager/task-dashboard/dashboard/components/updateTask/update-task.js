import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'Util/IntlMessages';
import { Button } from 'reactstrap';
import { ModalFooter} from 'reactstrap';
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MultiSelect from '../multiselect-form/multiselect';

class UpdateTask extends Component {

    state = {
        task_name: '',
        task_description: '',
        toggle: false,
        everybodyCanSee: 'no',
        assigned_ids: []
    };

    componentWillMount() {
        this.setState({
            task_name: this.props.task.title,
            task_description: this.props.task.description,
            assigned_ids: this.props.task.assigned_ids,
            everybodyCanSee: this.props.task.only_assigned_can_see ? 'yes' : 'no'
        });
    };

    /**
     * Update the state.
     */
    handleChange = (key) => event => {
        this.setState({
            [key]: event.target.value,
        });
    };

    updateTask() {
        console.log(this.state);
        this.props.closeModal();
    }

    /**
     * On Delete
     */
    onDelete() {
        this.refs.deleteConfirmationDialog.open();
    }

    handleChangeAssignedIds = ids => {
        this.setState({ assigned_ids: ids });
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
                        <div className="col-sm-12 col-md-12 col-xl-12">
                            <TextField
                                id="column_name" 
                                fullWidth 
                                label={<IntlMessages id={'dashboard.task.form.task_name'} />}
                                value={this.state.task_name}
                                onChange={this.handleChange('task_name')} 
                                autoComplete="off"/>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-12 mt-30">
                            <TextField
                                id="column_name"
                                multiline
                                fullWidth 
                                label={<IntlMessages id={`dashboard.task.form.description`} />}
                                value={this.state.task_description}
                                onChange={this.handleChange('task_description')} 
                                autoComplete="off"/>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-12 mt-3">
                            <MultiSelect assignedIds={this.props.task.assigned_ids} selectedAssignedIds={(ids)=> this.handleChangeAssignedIds(ids)}/>
                            <RadioGroup aria-label="position" name="position" value={this.state.everybodyCanSee} row>
                            <FormControlLabel
                                onClick={() => this.handleChangeRadio()}
                                value="yes"
                                control={<Radio color="primary" />}
                                label={<IntlMessages id={'dashboard.task.form.only_assigned_people_can_see'}/>}
                                labelPlacement="yes"
                                />
                            </RadioGroup>
                            <hr/>
                            <div className="media-body pt-5">
                                <h6 className="mb-0">{<IntlMessages id={'created_by'} />}:</h6>
                                <h6 className="fs-14">{this.props.task.author_name}</h6>
                                <h6 className="mb-0">{<IntlMessages id={'time'} />}:</h6>
                                <h6 className="fs-14"><span className="fs-14">{this.props.task.created_at}</span></h6>
                            </div>
                        </div>
                    </div>
                    <ModalFooter>
                        <Button 
                            variant="raised" 
                            color="primary" 
                            className="text-white" 
                            onClick={() => this.updateTask()}>
                                <IntlMessages id={`button.update`} />
                        </Button>
                        {' '}
                        <Button 
                            variant="raised" 
                            className="text-white btn-primary" 
                            onClick={() => this.props.closeModal()}>
                                <IntlMessages id={`button.cancel`} />
                        </Button>
						{' '}
                        <Button 
                            variant="raised" 
                            className="text-white btn-danger" 
                            onClick={() => this.onDelete()}>
                             <IntlMessages id={`button.delete`} />
                        </Button>
                    </ModalFooter>
                </form>
                <DeleteConfirmationDialog
                    ref="deleteConfirmationDialog"
                    title={<IntlMessages id={'dashboard.task.confirmation.delete.title'} />}
                    message={<IntlMessages id={'dashboard.task.confirmation.delete.message'} />}
                    onConfirm={() => this.deleteEmployee()}
                />
            </div>
        );
    }
}

export default UpdateTask;