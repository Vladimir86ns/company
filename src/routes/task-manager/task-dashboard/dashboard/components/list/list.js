import React, { Component } from 'react';
import {
    Card,
    CardTitle,
} from 'reactstrap';
import { Draggable } from 'react-beautiful-dnd';

class List extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {provided => (
                    <div className="mb-10">
                        <Card body outline color="c"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            innerRef={provided.innerRef}>
                                <CardTitle className="font-weight-bold">{this.props.task.title}</CardTitle>
                        </Card>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default List;