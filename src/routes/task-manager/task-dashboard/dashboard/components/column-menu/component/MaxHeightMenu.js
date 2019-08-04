import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IntlMessages from 'Util/IntlMessages';
import {
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import UpdateColumn from '../../updateColumn/updateColumn';

const EDIT = 'Edit';
const DELETE = 'Delete';
const options = [
  EDIT,
  DELETE,
];

const ITEM_HEIGHT = 48;

export default class MAxHeightMenu extends React.Component {
  state = {
    anchorEl: false,
    addUpdateTaskModal: false
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (option) => {
    if (option === EDIT) {
      this.setState({ addUpdateTaskModal: true });
    } else if (option === DELETE) {
      this.handleDelete();
    }
    this.setState({ anchorEl: null });
  };

  /**
   * Close modal.
   */
  closeModal() {
    this.setState({ addUpdateTaskModal: false });
  }

  handleDelete() {
    console.log('delete', this.props.column);
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton aria-label="More" aria-owns={anchorEl ? 'long-menu' : null} aria-haspopup="true" onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu id="long-menu" anchorEl={this.state.anchorEl} open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}>
          {options.map(option => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => this.handleClose(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
        <Modal isOpen={this.state.addUpdateTaskModal} toggle={() => this.closeModal()}>
            <ModalHeader toggle={() => this.closeModal()}>
                <IntlMessages id={`dashboard.column.update`} />
            </ModalHeader>
            <ModalBody>
                <UpdateColumn column={this.props.column} closeModal={() => this.closeModal()}/>
            </ModalBody>
        </Modal>
      </div>
    );
  }
}
