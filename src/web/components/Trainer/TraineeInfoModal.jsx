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
			labels: [],
			showSelf: false,
			showLabelEditModal: false
		};
	},

	setStateHelper: function(props) {
		this.setState({
			labels: props.labels,
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

	saveLabelData: function(labels) {
		this.setState({
			labels: labels,
			showSelf: true,
			showLabelEditModal: false
		})
	},

	submitLabelInfo: function() {
		this.props.submitLabelInfo(this.state.labels);

		alert('您已成功提交标签信息');
	},

	renderLabels: function(){
		if (this.state.labels && this.state.labels.length>0) {
			return this.state.labels.map(function(label) {
				return (<Button
							bsSize='small' 
							bsStyle='info'>
						{LabelDisplay[label]}
						</Button>
				);
			})
		} else {
			return '无';
		}
	},

	renderLabelsEditModal: function() {
		if (this.state.showLabelEditModal) {
			return (
				<LabelsEditModal
					labels={this.state.labels}
					saveData={this.saveLabelData}
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
								<td className="traineeLabelsDisplay">{this.renderLabels()}</td>						
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
						<Button bsStyle="success" onClick={this.submitInfo}>提交</Button>
						<Button bsStyle="default" onClick={this.close}>取消</Button>
					</ButtonToolbar>	
				</Modal.Footer>
			</Modal>);
	}
})
