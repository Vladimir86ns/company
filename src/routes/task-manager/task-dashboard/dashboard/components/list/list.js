import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import IntlMessages from 'Util/IntlMessages';
import {
    Card,
    CardTitle,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import UpdateTask from '../updateTask/update-task';

class List extends Component {
    state = {
        addAddUpdateTaskModal: false,
    };

    /**
     * Open modal for create or update.
     */
    onClickTask() {
        this.setState({ addAddUpdateTaskModal: true });
    }

    /**
     * Open modal for create or update.
     */
    closeModal() {
        this.setState({ addAddUpdateTaskModal: false });
    }

    render() {
        return (
            <div>
                <Draggable draggableId={this.props.task.id} index={this.props.index}>
                    {provided => (
                        <div className="mb-10">
                            <Card
                                onClick={() => this.onClickTask()}
                                body 
                                outline color="c"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                innerRef={provided.innerRef}>
                                    <CardTitle className="font-weight-bold"><h6>#{this.props.task.id}</h6>{this.props.task.title}</CardTitle>
                            </Card>
                        </div>
                    )}
                </Draggable>
                <Modal isOpen={this.state.addAddUpdateTaskModal} toggle={() => this.closeModal()}>
                    <ModalHeader toggle={() => this.closeModal()}>
                        <IntlMessages id={'dashboard.task.update'} />
                    </ModalHeader>
                    <ModalBody>
                        <UpdateTask closeModal={() => this.closeModal()} task={this.props.task} columnOrderId={this.props.columnOrderId}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default List;