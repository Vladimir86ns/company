import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Droppable } from 'react-beautiful-dnd';
import List from '../list/list';
import { Fab } from '@material-ui/core';
import {
    Card,
    CardTitle,
} from 'reactstrap';


class Column extends Component {
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
                    <Fab size="small" variant="round" color="primary" className="text-white ml-10 mr-15 mb-10" aria-label="add">
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
            </Card>
        );
    }
}

export default Column;