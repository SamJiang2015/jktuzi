//
// TraineeInfoModal.jsx
//

//
// SportCardItemModal.jsx
//
//  	This is the modal component that handles adding
//		a new SportCardItem or Updating an existing one

var React = require('react');
var LabelsEditModal = require('./TraineeLabelsEditModal');

var Modal = require('react-bootstrap/lib/modal');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');
var ButtonToolbar = require('react-bootstrap/lib/Buttontoolbar');

var LabelDisplay = require('../../utils/constants').LabelDisplay;

module.exports = React.createClass({

	getInitialState: function(){
		return {
			showSelf: false,
			showLabelEditModal: false
		};
	},

	setStateHelper: function(props) {
		this.setState({
			showSelf: props.showModal,
			showLabelEditModal: false			
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

	renderLabels: function(){
		var labels='';
		if (this.props.labels && this.props.labels.length>0) {
			for (var i=0; i<this.props.labels.length; i++) {
				labels+=LabelDisplay[this.props.labels[i]]+' '
			}
		} else {
			labels='无'
		}

		return labels;
	},

	renderLabelsEditModal: function() {
		if (this.state.showLabelEditModal) {
			return (
				<LabelsEditModal
					{...this.props}
					showModal={this.state.showLabelEditModal}
					/>
			);
		}
	},

	renderModalBody: function() {
		return (
			<div className="panel panel-success">
				<div className="panel-heading">
					<h4>{this.props.nickname}</h4>
				</div>
				<div className="panel-body">
					<table className="table table-responsive table-condensed">
						<tbody>
							<tr> 
								<td>姓名</td> 
								<td>{this.props.name}</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>标签</td>
								<td>{this.renderLabels()}</td>						
								<td>
									<Button
										onClick={function(e) {e.preventDefault(); this.setState({showLabelEditModal: true});}.bind(this)} 
										bsStyle="warning"
										bsSize="xsmall">									
										编辑
									</Button>
								</td>
								<td>{this.renderLabelsEditModal()}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			);
	},

	render: function(){

		return (
			<Modal 
				show={this.state.showSelf}
				onHide={this.close} >
				<Modal.Body>
					{this.renderModalBody()}
				</Modal.Body>
				<Modal.Footer>
					<ButtonToolbar>
						<Button bsStyle="success" onClick={this.close}>OK</Button>
					</ButtonToolbar>	
				</Modal.Footer>
			</Modal>);
	}
})
