import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import IntlMessages from 'Util/IntlMessages';
import { Button } from 'reactstrap';
import {
    ModalFooter
} from 'reactstrap';

class CreateColumn extends React.Component {

    state = {
        column_name: ''
    };

    createColumn() {
        console.log('CREATE COLUMN');
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
                                    label={<IntlMessages id={`dashboard.column.form.column_name`} />}
                                    value={this.state.column_name}
                                    onChange={() => console.log('add handle')}
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