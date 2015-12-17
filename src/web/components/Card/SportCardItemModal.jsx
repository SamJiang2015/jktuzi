//
// SportCardItemModal.jsx
//
//  	This is the modal component that handles adding
//		a new SportCardItem or Updating an existing one

var React = require('react');
var Modal = require('react-bootstrap/lib/modal');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');
var ButtonToolbar = require('react-bootstrap/lib/Buttontoolbar');
var DynamicSelect = require('../Common/DynamicSelect');
var SportsTypes = require('../../utils/constants').SportsTypes;

module.exports = React.createClass({

	getInitialState: function(){
		return {
			type: null,
			description: '',
			duration: '',
			distance: '',
			error: false,
			errorMsg: '',
			showModal: false
		};
	},

	componentDidMount: function() {
		this.setState({
			type: this.props.type,
			description: this.props.description,
			duration: this.props.duration,
			distance: this.props.distance,
			showModal: this.props.showModal,
			error: false,
			errorMsg: ''
		});
	},

	componentWillReceiveProps: function(newProps) {
		this.setState({
			type: newProps.type,
			description: newProps.description,
			duration: newProps.duration,
			distance: newProps.distance,
			showModal: newProps.showModal,
			error: false,
			errorMsg: ''
		});
	},	

	handleTypeChange: function(val) {

		this.setState({
			type: val,
			error: false,
			errorMsg: ''
		});
	},

	handleDescriptionChange: function(e) {
		e.preventDefault();
		this.setState({
			description: e.target.value,
			error: false,
			errorMsg: ''
		});
	},

	handleDistanceChange: function(e) {
		e.preventDefault();
		this.setState({
			distance: e.target.value,
			error: false,
			errorMsg: ''
		});
	},

	handleDurationChange: function(e) {
		e.preventDefault();
		this.setState({
			duration: e.target.value,
			error: false,
			errorMsg: ''
		});
	},

	close: function() {		
		this.setState({
			showModal: false
		})

		if (this.props.isNew) {
			// this means user cancelled the add; need to remove
			// the added empty item from list
			this.props.handleDelete(this.props.id);
		}
	},

	open: function() {
		this.setState({
			showModal: true
		})
	},	

	save: function() {

		var item = {
			id: this.props.id,
			// isNew: this.props.isNew -- can't set this; otherwise the modal will stay open
			type: this.state.type,
			description: this.state.description,
			duration: this.state.duration,
			distance: this.state.distance
		};

		//todo: validate input here

		this.props.handleSave(item);

	},

	renderModalBody: function() {
		return (
				<form>
					<div className="form-group">
						<DynamicSelect 
							selectItems={SportsTypes.items}
							label="运动方式" 
							value={this.state.type}  												
							className="form-control" 
							handleChange={this.handleTypeChange}/>
					</div>

					<div className="form-group">
						<Input 
							type="text" 
							label="描述"
							maxLen="100" 
							value={this.state.description}  												
							className="form-control" 
							onChange={this.handleDescriptionChange}/>
					</div>

					<div className="form-group">
						<Input 
							type="number" 
							label="时间" 
							addonAfter="分钟"
							value={this.state.duration}  												
							className="form-control" 
							onChange={this.handleDurationChange}/>
					</div>
					<div className="form-group">
						<Input 
							type="number" 
							label="距离" 
							addonAfter="公里"
							value={this.state.distance}  												
							className="form-control" 
							onChange={this.handleDistanceChange}/>
					</div>
				</form>	
			);
	},

	render: function(){

		return (
			<Modal 
				show={this.state.showModal}
				onHide={this.close} 
				bsSize="sm">
				<Modal.Body>
					{this.renderModalBody()}
				</Modal.Body>
				<Modal.Footer>
					<ButtonToolbar>
						<Button bsStyle="success" onClick={this.save}>保存</Button>
						<Button bsStyle="warning" onClick={this.close}>取消</Button>
					</ButtonToolbar>	
				</Modal.Footer>
			</Modal>);
	}
})
