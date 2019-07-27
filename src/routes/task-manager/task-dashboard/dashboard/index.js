import React, { Component } from 'react';
import MatButton from '@material-ui/core/Button';
import { DragDropContext } from 'react-beautiful-dnd';
import socketAxios from '../../../../../src/util/axios-socket';
import Column from './components/column/column';
import { isEmpty } from '../../../../util/lodashFunctions';
import { getSocketClient } from '../../../../../src/util/websocket';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.websocketEmit = getSocketClient();
    this.companyId = localStorage.getItem('headquarter_company_id');
    this.accountId = localStorage.getItem('account_id');
  }
    state = {
      tasks: {},
      columns: {},
      columnOrder: {},
    };

    componentWillMount() {
        this.getDashboardFromAPIAndSubscribeOnSockets();
    };

    componentWillUnmount() {
      if (this.state.columnOrder) {
        this.subscribeOrUnsubscribeSocketAPI(this.state.columnOrder._id, 'unsubscribe');
        this.unsubscribeFromEventName();
      }
    }

    handleResponseAndSetState(response) {
        this.setState({
            tasks: this.handleTasksFromResponse(response.tasks),
            columns: this.handleColumnsFromResponse(response.columns),
            columnOrder: response.columnOrder,
        });
    }

    handleTasksFromResponse(tasks) {
        let newTasks = {};
        tasks.forEach(task => {
            newTasks[task._id] = { 
              id: task._id,
              title: task.title,
              description: task.description,
              author_id: task.author_id,
              column_id: task.column_id 
            };
          });
        
        return newTasks;
    }

    handleColumnsFromResponse(columns) {
        let newColumns = {};
        columns.forEach((column, i) => {
            newColumns[column._id] = {
              id: column._id,
              title: column.title,
              taskIds: column.task_ids
            };
          });
        
        return newColumns;
    }

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (this.isOrderIdsChanged(destination, source)) {
            return;
        }
    
        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];
    
        if (start === finish) {
            this.saveTaskOrderOnSameColumn(start, destination, source, draggableId);
            return;
        }

        this.saveTaskOrderOnDifferentColumns(start, finish, destination, source, draggableId);
    }

    isOrderIdsChanged(destination, source) {
        if (!destination) {
            return true;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return true;
        }
    }

    saveTaskOrderOnSameColumn(start, destination, source, draggableId) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
 
        const newColumn = {
            ...start,
            taskIds: newTaskIds,
        };
  
        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn,
            },
        };

        let newData = {
            company_id: this.companyId,
            account_id: this.accountId,
            column_order_id: this.state.columnOrder._id,
            columns: [{
              column_id: start.id,
              task_ids: newTaskIds
            }]
        };

        this.emitSocketWithNewState(newState, start, newTaskIds, newData);
        this.setState(newState);
    }

    saveTaskOrderOnDifferentColumns(start, finish, destination, source, draggableId) {
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        let newData = {
            company_id: this.companyId,
            account_id: this.accountId,
            column_order_id: this.state.columnOrder._id,
            columns: [
                {
                    column_id: start.id,
                    task_ids: startTaskIds
                },
                {
                    column_id: finish.id,
                    task_ids: finishTaskIds
                }
             ]
        };

        this.emitSocketWithNewState(newState, start, startTaskIds, newData);
        this.setState(newState);
    }

    emitSocketWithNewState(newState, start, newTaskIds, newData) {
        this.websocketEmit.emit(`${this.state.columnOrder._id}`, { 
            newState, 
            updated: newData
        });
    }

    handlePlusButton() {
        console.log('HANDLE PLUS BUTTON');
    }

    /**
     * Get dashboard from socket api.
     */
    getDashboardFromAPIAndSubscribeOnSockets() {
        socketAxios.get(`dashboard/company/${this.companyId}/columns`)
        .then(res => {
            this.handleResponseAndSetState(res.data);
            if (res.data.columnOrder) {
                this.subscribeOrUnsubscribeSocketAPI(res.data.columnOrder._id, 'subscribe');
                this.subscribeOnEventName(res);
            }
        })
        .catch(err => {
            console.log(err);
            console.log(err.response);
            return err;
        });
    }

    /**
     * Subscribe on event socket name.
     * 
     * @param {object} response 
     */
    subscribeOnEventName(response) {
        this.websocketEmit.subscribe(
            `${response.data.columnOrder._id}-${this.accountId}-${this.companyId}`,
            (e) => {
                 this.setState(e);
            }
        );
    }

    /**
     * Unsubscribe from event name.
     */
    unsubscribeFromEventName() {
        this.websocketEmit.unsubscribe(`${this.state.columnOrder._id}-${this.accountId}-${this.companyId}`);
    }

    /**
     * Send to API event name on which to be subscribed
     * or unsubscribed to update column
     * 
     * @param {string} columnId
     * @param {string} subscribeOrUnsubscribe 
     */
    subscribeOrUnsubscribeSocketAPI(columnId, subscribeOrUnsubscribe) {
        socketAxios.get(`dashboard/company/${subscribeOrUnsubscribe}?event_name=${columnId}`)
        .then(res => {
            console.log('SUBSCRIBE SOCKET');
        })
        .catch(err => {
            console.log('NE SLUSA SOCKET!!!');
        });
    }

    render() {
        var columns = (<div></div>);
        if (this.state.columnOrder && !isEmpty(this.state.columnOrder.column_ids)) {
          this.columns = (
            <DragDropContext onDragEnd={this.onDragEnd}>
            {   
                this.state.columnOrder.column_ids.map(columnId => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => {
                      return this.state.tasks[taskId];
                    });
                    return <Column key={column.id} column={column} tasks={tasks}/>;
                })
            }
        </DragDropContext>
          );
        }

        return (
        <div className="grid-list-wrapper">
            <div className="row">

                {this.columns}
                <MatButton onClick={() => this.handlePlusButton()} variant="fab" color="primary" className="text-white mr-15 mb-10" aria-label="add">
                    <i className="zmdi zmdi-plus"></i>
                </MatButton>
            </div>
        </div>
        );
    }
}

export default DashBoard;
