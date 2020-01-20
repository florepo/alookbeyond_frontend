import React from 'react'
import { Modal, Header, Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import API from '../adapters/api';


class ModalSaveView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false }
  }

  confirmClick = (data, id) => {
    console.log("Passed in Prop Value: ", this.props.valueIntoModal);
    // API.patchWatchlist(data, id)
    this.props.handleClose();
  }
  
  render() {
    return (
      <Modal 
        open={this.props.modalOpen}
        size='small'
        closeOnEscape={true}
        closeOnRootNodeClick={true}
      >
        <Header
          icon='browser' 
          content='Save Current View' />
        <Modal.Content>
          <h3>Please confirm:</h3>
        </Modal.Content>

        <Modal.Actions>
          <Button
            negative
            type='button'
            icon='remove'
            labelPosition='right'
            onClick={this.props.handleClose}
            content='Cancel'
          />
          <Button 
            positive
            type='button'
            icon='checkmark'
            labelPosition='right'
            onClick={this.confirmClick}
            content='Confirm'
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalSaveView.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  valueIntoModal: PropTypes.array.isRequired
}

export default ModalSaveView