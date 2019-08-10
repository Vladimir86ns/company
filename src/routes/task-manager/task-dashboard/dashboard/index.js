import React, { Component } from 'react';
import MatButton from '@material-ui/core/Button';
import { DragDropContext } from 'react-beautiful-dnd';
import socketAxios from '../../../../../src/util/axios-socket';
import Column from './components/column/column';
import { isEmpty } from '../../../../util/lodashFunctions';
import { getSocketClient } from '../../../../../src/util/websocket';
import IntlMessages from 'Util/IntlMessages';
import { NotificationManager } from 'react-notifications';
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import CreateColumn from './components/createColumn/createColumn';
import { TYPE_UPDATE_COLUMN, TYPE_CREATE_COLUMN, TYPE_CREATE_TASK, TYPE_UPDATE_TASK } from '../../../../util/message-types';

const LIMIT_COLUMNS = 3;

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.websocketEmit = getSocketClient();
        this.companyId = localStorage.getItem('headquarter_company_id');
        this.accountId = localStorage.getItem('account_id');
    }

    state = {
        addNewColumnModal: false,
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
     * Prepare columns and tasks for dashboard, and set state.
     * 
     * @param {object} response 
     */
    handleResponseAndSetState(response) {
        this.setState({
            tasks: this.handleTasksFromResponse(response.tasks),
            columns: this.handleColumnsFromResponse(response.columns),
            columnOrder: response.columnOrder,
        });        
    }

    /**
     * On create column
     */
    onCreateColumn() {
        this.setState({ addNewUserModal: true });
    }

    /**
     * Handle tasks order on columns when task change destination.
     */
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

    /**
     * Send new state to websocket API
     */
    emitSocketWithNewState(newState, newData) {
        this.websocketEmit.emit(`${this.state.columnOrder._id}`, { 
            newState, 
            updated: newData
        });
    }

    /**
     * Open modal for create or update.
     */
    handlePlusButton() {
        this.setState({ addNewColumnModal: true });
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
                if (e.updateData) {
                    this.handleMessageTypeNotification(e.updateData);
                }

                // check is column created, or just task change position.
                if (e.columns[0]) {
                    this.handleResponseAndSetState(e);
                    return;
                }
                this.setState(e);
            }
        );
    }

    /**
     * Check update data on update dashboard what is was changed, and display notification message.
     * 
     * @param {object} updateData 
     */
    handleMessageTypeNotification(updateData) {
        switch(updateData.message_type) {
            case TYPE_UPDATE_COLUMN:
                NotificationManager.info(<IntlMessages id={"notification_manager.info.column_update"}/>);
                break;
            case TYPE_CREATE_COLUMN:
                NotificationManager.info(<IntlMessages id={"notification_manager.info.column_create"}/>);
                break;
            case TYPE_CREATE_TASK:
                NotificationManager.info(<IntlMessages id={"notification_manager.info.task_create"}/>);
                break;
            case TYPE_UPDATE_TASK:
                NotificationManager.info(<IntlMessages id={"notification_manager.info.task_updated"}/>);
                break;
            default:
                return;
          }
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

    /**
     * On Add & Update User Modal Close
     */
    onCreateColumnModalClose() {
        this.setState({ addNewColumnModal: false });
    }

    /**
     * Prepare task from response for dashboard.
     * 
     * @param {Array} tasks 
     */
    handleTasksFromResponse(tasks) {
        let newTasks = {};
        tasks.forEach(task => {
            newTasks[task._id] = {
              task,
              id: task._id,
              assigned_ids: task.assigned_ids,
              title: task.title,
              description: task.description,
              author_id: task.author_id,
              author_name: task.author_name,
              created_at: task.created_at,
              column_id: task.column_id,
              only_assigned_can_see: task.only_assigned_can_see,
              updated_at: task.updated_at,
              updated_by_id: task.updated_by_id,
              updated_by_name: task.updated_by_name,
            };
          });
        
        return newTasks;
    }

    /**
     * Prepare column from response for dashboard.
     * 
     * @param {Array} columns 
     */
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

    /**
     * Do nothing on update task ids, if order is not changed.
     * 
     * @param {object} destination 
     * @param {object} source 
     */
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

    /**
     * Save task ids order, if is changed on same coloumn.
     * 
     * @param {object} start 
     * @param {object} destination 
     * @param {object} source 
     * @param {object} draggableId 
     */
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

        this.emitSocketWithNewState(newState, newData);
        this.setState(newState);
    }

    /**
     * Save new task ids order on columns if task change from one column to another.
     * 
     * @param {object} start 
     * @param {object} finish 
     * @param {object} destination 
     * @param {object} source 
     * @param {string} draggableId 
     */
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
            columns: [{
                    column_id: start.id,
                    task_ids: startTaskIds
                }, {
                    column_id: finish.id,
                    task_ids: finishTaskIds
                }
             ]
        };

        this.emitSocketWithNewState(newState, newData);
        this.setState(newState);
    }

    getAllColumns() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {   
                    this.state.columnOrder.column_ids.map(columnId => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => {
                            return this.state.tasks[taskId];
                        });
                        return <Column key={column.id} column={column} tasks={tasks} columnOrderId={this.state.columnOrder._id}/>;
                    })
                }
            </DragDropContext>
        );
    }

    /**
     * Check number of columns, to hide or show button 
     * for create new column.
     */
    checkColumnsAndDisplayButton() {
        if (this.state.columnOrder && this.state.columnOrder.column_ids && this.state.columnOrder.column_ids.length >= LIMIT_COLUMNS) {
            return (<div></div>);
        }

        return (
            <MatButton onClick={() => this.handlePlusButton()} variant="fab" color="primary" className="text-white mr-15 mb-10" aria-label="add">
                <i className="zmdi zmdi-plus"></i>
            </MatButton>
        );
    }

    render() {
        var columns = (<div></div>);
        if (this.state.columnOrder && !isEmpty(this.state.columnOrder.column_ids)) {
          columns = this.getAllColumns();
        }

        return (
        <div className="grid-list-wrapper">
            <div className="row">
                {columns}
                {this.checkColumnsAndDisplayButton()}
            </div>
            <Modal isOpen={this.state.addNewColumnModal} toggle={() => this.onCreateColumnModalClose()}>
                <ModalHeader toggle={() => this.onCreateColumnModalClose()}>
                    <IntlMessages id={`dashboard.column.create`} />
                </ModalHeader>
                <ModalBody>
                    <CreateColumn closeModal={() => this.onCreateColumnModalClose()}/>
                </ModalBody>
            </Modal>
        </div>
        );
    }
}

export default DashBoard;
