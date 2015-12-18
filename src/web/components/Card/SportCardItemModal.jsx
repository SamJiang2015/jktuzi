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

var Limits = require('../../utils/constants').Limits;

module.exports = React.createClass({

	getInitialState: function(){
		return {
			workoutTypeId: null,
			description: '',
			duration: '',
			distance: '',
			error: false,
			errorMsg: '',
			showModal: false
		};
	},

	setStateHelper: function(props) {
		this.setState({
			workoutTypeId: props.workoutTypeId,
			description: props.description,
			duration: props.duration,
			distance: props.distance,
			showModal: props.showModal,
			error: false,
			errorMsg: ''
		});
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);	
	},

	componentWillReceiveProps: function(newProps) {
		this.setStateHelper(newProps);
	},	

	handleTypeChange: function(val) {

		this.setState({
			workoutTypeId: val,
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
			showModal: false,
			error: false
		})

		if (this.props.isNew) {
			// this means user cancelled the add; need to remove
			// the added empty item from list
			this.props.handleDelete(this.props.id);
		}
	},

	open: function() {
		this.setState({
			showModal: true,
			error: false
		})
	},	

	save: function() {

		var item = {
			id: this.props.id,
			// isNew: this.props.isNew -- can't set this; otherwise the modal will stay open
			workoutTypeId: this.state.workoutTypeId,
			description: this.state.description,
			duration: this.state.duration,
			distance: this.state.distance
		};

		// validate input
		var errorMsg='';
		//input validation happens here
		if ( (item.description && item.description!=='') && 
			(item.description.length<Limits.Workout.Description.minLen ||
			item.description.length>Limits.Workout.Description.maxLen)) {
			errorMsg = '请核验您输入的描述';
		} else if ((item.duration && (item.duration !== '')) &&
			(isNaN(item.duration) || 
				Number(item.duration)<Limits.Workout.Duration.min ||
				Number(item.duration)>Limits.Workout.Duration.max)) {
			errorMsg='请核验您输入的分钟数';
		} else if ( (item.distance && (item.distance !== '')) &&
			(isNaN(item.distance) || 
				Number(item.distance)<Limits.Workout.Distance.min ||
				Number(item.distance)>Limits.Workout.Distance.max)) {
			errorMsg='请核验您输入的公里数';
		}

		if (errorMsg!=='') {
			this.setState({
				showModal: true,
				error: true,
				errorMsg: errorMsg
			});
		} else {		
			this.props.handleSave(item);
		}
	},

	renderError: function() {
		if (this.state.error) {
			return (<p className="error">{this.state.errorMsg}</p>);
		} else {
			return null;
		}
	},	

	renderModalBody: function() {
		return (
				<form>
					<div className="form-group">
						<DynamicSelect 
							selectItems={SportsTypes.items}
							label="运动方式" 
							value={this.state.workoutTypeId}  												
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
					{this.renderError()}
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
