//
// TraineeInfoGoal.jsx
//
//
//			Step 3: goal info: 
//						- weight goal
//						- bodyfat goal
//

var React = require('react');

var Panel=require('react-bootstrap/lib/panel');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');

var Limits = require('../../utils/constants').Limits;
var AccountActions = require('../../actions/account-actions');
var _=require('underscore');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			weightGoal: null,
			bodyfatGoal: null,
			error: false,
			errorMsg: ''
		}
	},

 	setStateHelper: function(fieldValues) {
 		if (fieldValues===null || _.isEmpty(fieldValues)) return;

 		this.setState({
 			weightGoal: fieldValues.weightGoal,
 			bodyfatGoal: fieldValues.bodyfatGoal,

 			error: false,
 			errorMsg: ''
 		});			
 	},

	componentDidMount: function() {
		this.setStateHelper(this.props.fieldValues);
	 },

	 componentWillReceiveProps: function(newProps) {
	 	this.setStateHelper(newProps.fieldValues);
	 },

	saveAndContinue: function(e) {
		e.preventDefault();

		var data = {
			weightGoal: this.state.weightGoal, 
			bodyfatGoal: this.state.bodyfatGoal,
		};

		var errorMsg='';
		if (isNaN(data.weightGoal) || Number(data.weightGoal)<Limits.Weight.min || Number(data.weightGoal)>Limits.Weight.max) {
			errorMsg='请核验您输入的目标体重（以斤为单位）';
		} else if ((data.bodyfatGoal !== '') &&
			(isNaN(data.bodyfatGoal) || Number(data.bodyfatGoal)<Limits.Bodyfat.min || Number(data.bodyfatGoal)>Limits.Bodyfat.max)) {
			errorMsg='请核验您输入的目标体脂率（百分比）';
		} 

		if (errorMsg!=='') {
			this.setState({
				error: true,
				errorMsg: errorMsg
			});
		} else { 
			// save data - this will change the info in the account store
			// which will trigger a change in the info saved as state in parent 
			// component, which is passed into this component as props
			AccountActions.saveAccountTraineeInfoInMemory(data);

			// move on to next step;
			this.props.nextStep();
		}
	},

	handleWeightGoalChange: function(e) {
		e.preventDefault();

		this.setState({
			weightGoal: e.target.value,
			error: false,
			errorMsg: ''
		})
	},

	handleBodyfatGoalChange: function(e) {
		e.preventDefault();

		this.setState({
			bodyfatGoal: e.target.value,
			error: false,
			errorMsg: ''
		})
	},	

	renderError: function() {
		if (this.state.error) {
			return (<p className="error">{this.state.errorMsg}</p>);
		} else {
			return null;
		}
	},	

	render: function() {
		return (
			<div className="panel panel-success traineeInfoGoal">
				<div className="panel-heading">
					<h5>目标信息<small className="step-info">第{this.props.step}步 (共4步)</small></h5>
				</div>
				<div className="panel-body">
					<form>

						<div className="form-group">
							<Input 
								type="number" 
								label="目标体重" 
								addonAfter="斤"
								min="50"
								max="350"
								value={this.state.weightGoal}  												
								className="form-control" 
								onChange={this.handleWeightGoalChange}/>
						</div>

						<div className="form-group">
							<Input 
								type="number" 
								label="目标体脂率(百分比)" 
								addonAfter="%"
								min="5"
								max="50"
								value={this.state.bodyfatGoal}  												
								className="form-control" 
								onChange={this.handleBodyfatGoalChange}/>
						</div>

						{this.renderError()}						

						<div className="form-group">		
			              	<div className="col-xs-4 col-xs-offset-2">				
								<Button 
									bsStyle="default"
									onClick={this.props.previousStep}
									bsSize="small"
									block>
									返回
								</Button>					
							</div>
		              		<div className="col-xs-4">					
								<Button 
									onClick={this.saveAndContinue} 
									bsStyle="success"
									bsSize="small"
									block>
									下一步
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}

});