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
			height: this.refs.height.getValue().trim(),
			weight: this.refs.weight.getValue().trim(),
			bodyfat: this.refs.bodyfat.getValue().trim(), 
			habbit: this.refs.habbit.getValue().trim(),			
		};

		var errorMsg='';
		//to do - input validation happens here
		if (isNaN(data.height) || Number(data.height)<Limits.Height.min || Number(data.height)>Limits.Height.max) {
			errorMsg='请核验您输入的身高（以厘米为单位）';
		} else if (isNaN(data.weight) || Number(data.weight)<Limits.Weight.min || Number(data.weight)>Limits.Weight.max) {
			errorMsg='请核验您输入的体重（以斤为单位）';
		} else if ((data.bodyfat !== '') &&
			(isNaN(data.bodyfat) || Number(data.bodyfat)<Limits.Bodyfat.min || Number(data.bodyfat)>Limits.Bodyfat.max)) {
			errorMsg='请核验您输入的体脂率（百分比）';
		} else if ( (data.habbit != '') && 
			(data.habbit.length<Limits.Habbit.minLen ||
			data.habbit.length>Limits.Habbit.maxLen)) {
			errorMsg = '请核验您输入的运动';
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

	handleInputChange: function(e) {
		e.preventDefault();

		this.setState({
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

		// note that we bind defaultValue to this.props.X so that 
		// when user goes back to the prior step, the already-inputted value is their
		return (
			<div className="panel panel-success traineeInfoHealth">
				<div className="panel-heading">
					<h5>健康信息<small className="step-info">第{this.props.step}步 (共4步)</small></h5>
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
								className="form-control" 
								onChange={this.handleInputChange}/>
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
								className="form-control" 
								onChange={this.handleInputChange}/>
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
								className="form-control" 
								onChange={this.handleInputChange}/>
						</div>

						<div className="form-group">
							<Input 
								type="text" 
								label="列举您喜爱的运动(跑步, 游泳, 等)" 
								ref="habbit" 
								maxLength="100"
								defaultValue={this.props.fieldValues.habbit}						
								className="form-control" 
								onChange={this.handleInputChange}/>
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