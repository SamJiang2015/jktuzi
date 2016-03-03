//
// TraineeLabelsEditModal.jsx
//

var React = require('react');
var Modal = require('react-bootstrap/lib/modal');
var Button = require('react-bootstrap/lib/button');
var ButtonToolbar = require('react-bootstrap/lib/Buttontoolbar');
var Input = require('react-bootstrap/lib/input');

module.exports = React.createClass({

	getInitialState: function() {

		return {
			showSelf: false,
			remark: null
		}
	},

	setStateHelper: function(props) {

		this.setState({
			showSelf: props.showModal,
			remark: props.remark			
		});
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);
	 },

	 componentWillReceiveProps: function(newProps) {
		this.setStateHelper(newProps);
	 },

	close: function() {
		this.setState({
			showSelf: false
		})
	},

	open: function() {
		this.setState({
			showSelf: true
		})
	},		 

	save: function() {
		this.setState({
			showSelf: false
		});
				
		this.props.handleRemarkChange(this.state.remark);
	},

	handleInputChange: function(e) {
        this.setState({
          remark: e.target.value
        });
	},

	renderModalBody: function() {
		return (
            <div>
                  <Input type="textarea" rows="4"
                    value={this.state.remark}
                    onChange={this.handleInputChange}
                    />
            </div>
		);
	},

	render: function() {
		return (
			<Modal 
				show={this.state.showSelf}
				onHide={this.close}>
				<Modal.Header closeButton>
				    <Modal.Title>编辑备注</Modal.Title>
				</Modal.Header>							
				<Modal.Body>
					{this.renderModalBody()}
				</Modal.Body>
				<Modal.Footer>
					<ButtonToolbar>
						<Button bsStyle="success" onClick={this.save}>OK</Button>
						<Button bsStyle="default" onClick={this.close}>取消</Button>
					</ButtonToolbar>	
				</Modal.Footer>
			</Modal>);
	}
})