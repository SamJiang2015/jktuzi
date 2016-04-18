//
// ConfirmationModal.jsx
//

var React = require('react');
var Modal = require('react-bootstrap/lib/modal');
var ButtonToolbar = require('react-bootstrap/lib/buttontoolbar');
var Button = require('react-bootstrap/lib/button');

module.exports = React.createClass({

	getInitialState: function() {
		return { showSelf: false };
	},

	componentDidMount: function() {
		this.setState({ showSelf: this.props.show});		
	},

	componentWillReceiveProps: function(newProps) {
		this.setState({ showSelf: newProps.show});		
	},

	close: function() {
		this.setState({ showSelf: false });
	},

	open: function() {
		this.setState({ showSelf: true });
	},

	continue: function() {
		// continue with action
		this.props.action();
		this.close();
	},

	render: function() {
		return (

        <Modal show={this.state.showSelf} onHide={this.close}>
          <Modal.Body>
            <h4>{this.props.message}</h4>
          </Modal.Body>
          <Modal.Footer>
				<ButtonToolbar>
					<Button bsStyle="success" onClick={this.continue}>确认</Button>
					<Button bsStyle="default" onClick={this.close}>取消</Button>
				</ButtonToolbar>
          </Modal.Footer>
        </Modal>

			);
	}	
})
