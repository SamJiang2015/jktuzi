// TraineeInfoHealth.jsx


//
// TraineeInfoBasic.jsx
//
//			Step 3: health info: 
//						- height
//						- weight
//						- bodyfat
// 						- exercise habbit
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
 			height: null,
 			weight: null,
 			bodyfat: null,
 			habbit: null,
			error: false,
			errorMsg: ''
		}
	},

	setStateHelper: function(fieldValues) {
 		if (fieldValues===null || _.isEmpty(fieldValues)) return;

 		this.setState({
 			height: fieldValues.height,
 			weight: fieldValues.weight,
 			bodyfat: fieldValues.bodyfat,
 			habbit: fieldValues.habbit,

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
			height: this.state.height,
			weight: this.state.weight,
			bodyfat: this.state.bodyfat, 
			habbit: this.state.habbit.trim(),			
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
			// save data - this will change the info in the account store
			// which will trigger a change in the info saved as state in parent 
			// component, which is passed into this component as props
			AccountActions.saveAccountTraineeInfoInMemory(data);

			// move on to next step;
			this.props.nextStep();
		}
	},

	handleHeightChange: function(e) {
		e.preventDefault();

		this.setState({
			height: e.target.value,
			error: false,
			errorMsg: ''
		})
	},	

	handleWeightChange: function(e) {
		e.preventDefault();

		this.setState({
			weight: e.target.value,
			error: false,
			errorMsg: ''
		})
	},	

	handleBodyfatChange: function(e) {
		e.preventDefault();

		this.setState({
			bodyfat: e.target.value,
			error: false,
			errorMsg: ''
		})
	},	

	handleHabbitChange: function(e) {
		e.preventDefault();

		this.setState({
			habbit: e.target.value,
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
								value={this.state.height}  												
								className="form-control" 
								onChange={this.handleHeightChange}/>
						</div>

						<div className="form-group">
							<Input 
								type="number" 
								label="体重" 
								addonAfter="斤"
								min="50"
								max="350"
								value={this.state.weight}  												
								className="form-control" 
								onChange={this.handleWeightChange}/>
						</div>

						<div className="form-group">
							<Input 
								type="number" 
								label="体脂率(百分比)" 
								addonAfter="%"
								min="5"
								max="50"
								value={this.state.bodyfat}  												
								className="form-control" 
								onChange={this.handleBodyfatChange}/>
						</div>

						<div className="form-group">
							<Input 
								type="text" 
								label="列举您喜爱的运动(跑步, 游泳, 等)" 
								maxLength="100"
								value={this.state.habbit}						
								className="form-control" 
								onChange={this.handleHabbitChange}/>
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