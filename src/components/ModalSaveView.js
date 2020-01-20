import React from 'react'
import { Modal, Header, Button, Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import API from '../adapters/api';


class ModalSaveView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: this.props.display,
                   value: null }
  }

  confirmClick = (input) => {
    console.log("Seledcted Value: ", input);
    this.props.handleConfirm(this.state.value);
  }

  handleChange = (e, {value}) =>{
    this.setState({ value })
  }

  selection = this.props.valueIntoModal.map( list => {
    return {key: list.name, text: list.name, value: list.name}
  })
  
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
          <h3>Please slot to Save:</h3>
          <Dropdown
            placeholder='Select Slot'
            fluid
            selection
            options={this.selection}
            onChange={this.handleChange}
          />

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
            onClick={(event) => this.confirmClick(event.target)}
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