import React, { Component } from 'react';
import MatButton from '@material-ui/core/Button';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';

import Column from './components/column/column';
class DashBoard extends Component {
    state = initialData;

    onDragEnd() {
        //
    }

    render() {
        return (
        <div className="grid-list-wrapper">
            <div className="row">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {   
                        this.state.columnOrder.map(columnId => {
                            const column = this.state.columns[columnId];
                            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                            return <Column key={column.id} column={column} tasks={tasks}/>;
                        })
                    }
                </DragDropContext>
                <MatButton variant="fab" color="primary" className="text-white mr-15 mb-10" aria-label="add">
                    <i className="zmdi zmdi-plus"></i>
                </MatButton>
            </div>
        </div>
        );
    }
}

export default DashBoard;
