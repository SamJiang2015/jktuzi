// TraineeInfoHealth.jsx


//
// TraineeInfoBasic.jsx
//
//			Step 2: health info: 
//						- height
//						- weight
//						- bodyfat
//						- weight goal
//						- bodyfat goal
// 						- exercise habbit
//

var React = require('react');

var Panel=require('react-bootstrap/lib/panel');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');

module.exports = React.createClass({

	saveAndContinue: function(e) {
		e.preventDefault();

		var data = {
			height: this.refs.height.getValue().trim(),
			weight: this.refs.weight.getValue().trim(),
			bodyfat: this.refs.bodyfat.getValue().trim(), 
			weightGoal: this.refs.weightGoal.getValue().trim(), 
			bodyfatGoal: this.refs.bodyfatGoal.getValue().trim(),
			habbit: this.refs.habbit.getValue().trim(),			
		};

		//to do - input validation happens here

		// save data
		this.props.saveValues(data);

		// move on to next step;
		this.props.nextStep();
	},

	render: function() {

		// note that we bind defaultValue to this.props.X so that 
		// when user goes back to the prior step, the already-inputted value is their
		return (
			<div className="panel panel-success traineeInfoHealth">
				<div className="panel-heading">
					<h5>健康信息<small className="step-info">第{this.props.step}步 (共3步)</small></h5>
				</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
							<Input 
								type="number" 
								label="身高" 
								addonAfter="厘米"
								min="50"
								max="250"
								ref="height" 
								defaultValue={this.props.fieldValues.height}  												
								className="form-control" />
						</div>

						<div className="form-group">
							<Input 
								type="number" 
								label="体重" 
								addonAfter="斤"
								min="50"
								max="350"
								ref="weight" 
								defaultValue={this.props.fieldValues.weight}  												
								className="form-control" />
						</div>

						<div className="form-group">
							<Input 
								type="number" 
								label="体脂率(百分比)" 
								addonAfter="%"
								min="5"
								max="50"
								ref="bodyfat" 
								defaultValue={this.props.fieldValues.bodyfat}  												
								className="form-control" />
						</div>

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

						<div className="form-group">
							<Input 
								type="text" 
								label="列举您喜爱的运动(跑步, 游泳, 等)" 
								ref="habbit" 
								maxLength="100"
								defaultValue={this.props.fieldValues.habbit}						
								className="form-control" />
						</div>

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