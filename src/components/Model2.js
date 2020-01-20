class ConfirmExampleHeader extends Component {
    state = { open: false }
  
    show = () => this.setState({ open: true })
    handleConfirm = () => this.setState({ open: false })
    handleCancel = () => this.setState({ open: false })
  
    render() {
      return (
        <div>
          <Button onClick={this.show}>Show</Button>
          <Confirm
            open={this.state.open}
            header='This is a custom header'
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
          />
        </div>
      )
    }
  }
  
  export default ConfirmExampleHeader