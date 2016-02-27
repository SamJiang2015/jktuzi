//
// TraineeLabelsEditModal.jsx
//

var React = require('react');
var LabelDisplay = require('../../utils/constants').LabelDisplay;
var Modal = require('react-bootstrap/lib/modal');
var Button = require('react-bootstrap/lib/button');

module.exports = React.createClass({

	getInitialState: function() {

		return {
			showSelf: false,
			labels: [],
			labelStatus: [null]
		}
	},

	setStateHelper: function(props) {

		// use this array to track which label (from 1 to 13) is set on the UI
		var labelStatus=[null];
		for (var i=0; i<LabelDisplay.length; i++) {
			labelStatus.push(0);
		}

		// find out which label in props.labels is set, and set the labelStatus array accordingly
		if (props.labels && props.labels.length>0) {
			for (var i=0; i<props.labels.length; i++) {
				// the label value that gets passed in should be in the range of [1,13]
				if (props.labels[i]>LabelDisplay.length) {
					console.log('Invalid label value: ' + props.labels[i]);
				} else {
					labelStatus[props.labels[i]] = 1;
				}
			}
		}

		this.setState({
			labels: props.labels,
			labelStatus: labelStatus,
			showSelf: this.props.showModal			
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

	// when user clicks on one of the meal status button
	updateLabel: function(whichLabel) {
		var labelStatus = this.state.labelStatus;

		// when a label button is clicked, flip the value
		labelStatus[whichLabel] = (labelStatus[whichLabel] === 1) ? 0 : 1; 

		// based on the new status array, generate the list of selected labels
		var labels=[];
		for (var i=1; i<labelStatus.legnth; i++) {
			if (labelStatus[i] === 1) {
				labels.push[i];
			}
		}

		this.setState({
			labelStatus: labelStatus,
			labels: labels
		})
	},

	checkLabelSelected: function(whichLabel) {
		return (this.state.labelStatus[whichLabel]===1);
	},

	renderModalBody: function() {
		return (			
			<div className="table-responsive traineeLabels">
				<table className="table table-condensed">
					<tbody>
						<tr>
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(1)}.bind(this)} 
									bsSize="small"
									bsStyle={this.checkLabelSelected(1)?'warning':'default'}
								>
									{LabelDisplay[1]}
								</Button>
							</td>
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(2)}.bind(this)} 
									bsSize="small"
									bsStyle={this.checkLabelSelected(2)?'warning':'default'}									
								>
									{LabelDisplay[2]}
								</Button>						
							</td>
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(3)}.bind(this)} 
									bsSize="small"
									bsStyle={this.checkLabelSelected(3)?'warning':'default'}									
								>
									{LabelDisplay[3]}
								</Button>
							</td>
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(4)}.bind(this)} 
									bsSize="small"
									bsStyle={this.checkLabelSelected(4)?'warning':'default'}									
								>
									{LabelDisplay[4]}
								</Button>						
							</td>
						</tr>
						<tr>	
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(5)}.bind(this)} 
									bsSize="small"
									bsStyle={this.checkLabelSelected(5)?'warning':'default'}									
								>
									{LabelDisplay[5]}
								</Button>
							</td>
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(6)}.bind(this)}  
									bsSize="small"
									bsStyle={this.checkLabelSelected(6)?'warning':'default'}										
								>
									{LabelDisplay[6]}
								</Button>						
							</td>
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(7)}.bind(this)} 
									bsSize="small"
									bsStyle={this.checkLabelSelected(7)?'warning':'default'}										
								>
									{LabelDisplay[7]}
								</Button>
							</td>
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(8)}.bind(this)} 
									bsSize="small"
									bsStyle={this.checkLabelSelected(8)?'warning':'default'}										
								>
									{LabelDisplay[8]}
								</Button>						
							</td>
						</tr>
						<tr>
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(9)}.bind(this)} 
									bsSize="small"
									bsStyle={this.checkLabelSelected(9)?'warning':'default'}										
								>
									{LabelDisplay[9]}
								</Button>
							</td>
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(10)}.bind(this)} 
									bsSize="small"
									bsStyle={this.checkLabelSelected(10)?'warning':'default'}										
								>
									{LabelDisplay[10]}
								</Button>						
							</td>
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(11)}.bind(this)} 
									bsSize="small"
									bsStyle={this.checkLabelSelected(11)?'warning':'default'}										
								>
									{LabelDisplay[11]}
								</Button>
							</td>
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(12)}.bind(this)} 
									bsSize="small"
									bsStyle={this.checkLabelSelected(12)?'warning':'default'}										
								>
									{LabelDisplay[12]}
								</Button>						
							</td>
						</tr>
						<tr>
							<td>
								<Button 
									onClick={function(e){e.preventDefault(); this.updateLabel(13)}.bind(this)} 
									bsSize="small"
									bsStyle={this.checkLabelSelected(13)?'warning':'default'}										
								>
									{LabelDisplay[13]}
								</Button>						
							</td>
							<td></td><td></td><td></td>																										
						</tr>
					</tbody>
				</table>
			</div>
		);
	},

	render: function() {
		return (
			<Modal 
				show={this.state.showSelf}
				onHide={this.close}>
				<Modal.Header closeButton>
				    <Modal.Title>编辑标签</Modal.Title>
				</Modal.Header>							
				<Modal.Body>
					{this.renderModalBody()}
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="success" onClick={this.close}>OK</Button>
				</Modal.Footer>
			</Modal>);
	}
})