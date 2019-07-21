import React, { Component } from 'react';
import MatButton from '@material-ui/core/Button';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import socketAxios from '../../../../../src/util/axios-socket';
import Column from './components/column/column';
import { isEmpty } from '../../../../util/lodashFunctions';
import { getConnection } from '../../../../../src/util/websocket';
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.websocketEmit = getConnection();
  }
    state = {
      tasks: {},
      columns: {},
      columnOrder: {},
    };

    componentWillMount() {
      socketAxios.get('dashboard/company/1/columns')
      .then(res => {
        this.handleResponse(res.data);
      })
      .catch(err => {
        console.log(err);
        return err;
      });

      this.websocketEmit.subscribe('dva', (e) => {
        this.setState(e);
      });
    };

    handleResponse(response) {
      let tasks = {};
      let columns = {};

      response.tasks.forEach(task => {
        tasks[task._id] = { 
          id: task._id,
          title: task.title,
          description: task.description,
          author_id: task.author_id,
          column_id: task.column_id 
        };
      });

      response.columns.forEach((c, i) => {
        columns[c._id] = {
          id: c._id,
          title: c.title,
          taskIds: c.task_ids
        };
      });

      let columnOrder = response.columnOrder.column_ids;

      this.setState({
        tasks: tasks,
        columns: columns,
        columnOrder: columnOrder
      });
    }

    onDragEnd = result => {
        const { destination, source, draggableId } = result;
    
        if (!destination) {
          return;
        }
    
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }
    
        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        console.log('start', start);
        console.log('finish', finish);
    
        if (start === finish) {
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
    
          this.websocketEmit.emit('jedan', { 
            newState, 
            updated: {
              columns: [{
                column_id: start.id,
                task_ids: newTaskIds
              }]
            }});
          this.setState(newState);
          return;
        }


    // Moving from one list to another
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

    // TODO ove new IDS se salje da se unapredi redosled za start column IDS i finish columns ids
    console.log('startTaskIds', startTaskIds);
    console.log('finishTaskIds', finishTaskIds);

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.websocketEmit.emit('jedan', { 
      newState, 
      updated: {
        columns: [{
          column_id: start.id,
          task_ids: startTaskIds
        },
        {
          column_id: finish.id,
          task_ids: finishTaskIds
        }]
      }});
    this.setState(newState);
    }

    render() {
        var columns = (<div></div>);
        if (!isEmpty(this.state.columnOrder)) {
          this.columns = (
            <DragDropContext onDragEnd={this.onDragEnd}>
            {   
                this.state.columnOrder.map(columnId => {
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
                <MatButton variant="fab" color="primary" className="text-white mr-15 mb-10" aria-label="add">
                    <i className="zmdi zmdi-plus"></i>
                </MatButton>
            </div>
        </div>
        );
    }
}

export default DashBoard;
