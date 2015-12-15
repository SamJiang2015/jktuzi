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

module.exports = React.createClass({

	getInitialState: function() {
		return {
			error: false,
			errorMsg: ''
		}
	},

	saveAndContinue: function(e) {
		e.preventDefault();

		var data = {
			weightGoal: this.refs.weightGoal.getValue().trim(), 
			bodyfatGoal: this.refs.bodyfatGoal.getValue().trim(),
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
			// save data
			this.props.saveValues(data);

			// move on to next step;
			this.props.nextStep();
		}
	},

	renderError: function() {
		if (this.state.error) {
			return (<p className="error">{this.state.errorMsg}</p>);
		} else {
			return null;
		}
	},	

	render: function() {

		// note that we bind defaultValue to this.props.X so that 
		// when user goes back to the prior step, the already-inputted value is their
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
								ref="weightGoal" 
								defaultValue={this.props.fieldValues.weightGoal}  												
								className="form-control" />
						</div>

						<div className="form-group">
							<Input 
								type="number" 
								label="目标体脂率(百分比)" 
								addonAfter="%"
								min="5"
								max="50"
								ref="bodyfatGoal" 
								defaultValue={this.props.fieldValues.bodyfatGoal}  												
								className="form-control" />
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