import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Droppable } from 'react-beautiful-dnd';
import List from '../list/list';
import { Fab } from '@material-ui/core';
import IntlMessages from 'Util/IntlMessages';
import {
    Card,
    CardTitle,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import CreateTask from '../create-task/create-task';

class Column extends Component {
    state = {
        addCreateTaskModal: false,
    };

     /**
     * On Add & Update User Modal Close
     */
    onCreateTaskModalClose() {
        this.setState({ addCreateTaskModal: false });
    }

    /**
     * Open modal for create or update task.
     */
    handlePlusButton() {
        this.setState({ addCreateTaskModal: true });
    }

    render() {
        return (
            <Card 
                className="col-sm-3 mr-3" 
                style={{backgroundColor: '#F4F7FA'}} 
                body 
                outline 
                color="secondary">
                <CardTitle className="font-weight-bold text-dark text-center">
                    {this.props.column.title}
                    <Fab onClick={() => this.handlePlusButton()} size="small" variant="round" color="primary" className="text-white ml-10 mr-15 mb-10" aria-label="add">
                        <i className="zmdi zmdi-plus"></i>
                    </Fab>
                </CardTitle>
                <Droppable droppableId={this.props.column.id}>
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <Scrollbars
                            autoHeight 
                            autoHide 
                            autoHeightMin={690} 
                            autoHeightMax={690}>
                                {this.props.tasks.map((task , i) => <List key={task.id} task={task} index={i}/>)}
                                {provided.placeholder}
                            </Scrollbars>   
                        </div>
                    )}
                </Droppable>
                <Modal isOpen={this.state.addCreateTaskModal} toggle={() => this.onCreateTaskModalClose()}>
                    <ModalHeader toggle={() => this.onCreateTaskModalClose()}>
                        <IntlMessages id={`dashboard.task.create`} />
                    </ModalHeader>
                    <ModalBody>
                        <CreateTask closeModal={() => this.onCreateTaskModalClose()} columnOrderId={this.props.columnOrderId} columnId={this.props.column.id}/>
                    </ModalBody>
                </Modal>
            </Card>
        );
    }
}

export default Column;