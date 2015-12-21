//
// TraineeInfoBasic.jsx
//
// 			Step 1: basic info:
//						- sex
//						- birthdate
//						- email
//						- profession
//						- location
//

var React = require('react');
var AccountActions = require('../../actions/account-actions');

var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');

var Limits = require('../../utils/constants').Limits;
var Helper = require('../../utils/helper');
var _=require('underscore');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			isMale: null,
			isFemale: null,
			birthdate: '',
			email: '',
			profession: '',
			location: '',

			error: false,
			errorMsg: ''
		}
	},

 	setStateHelper: function(fieldValues) {
 		if (fieldValues===null || _.isEmpty(fieldValues)) return;

 		this.setState({
 			isMale: fieldValues.isMale,
 			isFemale: (fieldValues.isMale===null ? null : !fieldValues.isMale),
 			birthdate: (fieldValues.birthdate!==null && fieldValues.birthdate.length>=10)? 
						fieldValues.birthdate.slice(0,10) : '',
 			email: fieldValues.email,
 			profession: fieldValues.profession,
 			location: fieldValues.location,

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
			isMale: this.state.isMale,
			birthdate: this.state.birthdate, 
			email: this.state.email ? this.state.email.trim() : '',
			profession: this.state.profession ? this.state.profession.trim() : '',	
			location: this.state.location? this.state.location.trim() : ''			
		};

		var errorMsg='';

		if (data.isMale===null && this.state.isFemale===null) {
			errorMsg = '请输入您的性别';
		} else if (isNaN(Date.parse(data.birthdate))) {
			errorMsg = '请核验您输入的生日';
		} else if (!Helper.checkEmail(data.email) || 
			data.email.length<Limits.Email.minLen ||
			data.email.length>Limits.Email.maxLen) {
			errorMsg = '请核验您输入的邮箱格式';
		} else if (data.profession.length<Limits.Profession.minLen ||
			data.profession.length>Limits.Profession.maxLen) {
			errorMsg = '请核验您输入的职业';
		} else if (data.location.length<Limits.Location.minLen ||
			data.location.length>Limits.Location.maxLen) {
			errorMsg = '请核验您输入的城市';
		}

		if (errorMsg!=='') {
			this.setState({
				error: true,
				errorMsg: errorMsg
			})
		} else {
			// save data - this will change the info in the account store
			// which will trigger a change in the info saved as state in parent 
			// component, which is passed into this component as props
			AccountActions.saveAccountTraineeInfoInMemory(data);

			// move on to next step;
			this.props.nextStep();
		}
	},


	handleSexInput: function(e) {
		if (e.target.value==='male' && e.target.checked) {
			this.setState({
				isMale: true,
				isFemale: false,
				error: false,
				errorMsg: ''
			});
		} else {
			this.setState({
				isMale: false,
				isFemale: true,
				error: false,
				errorMsg: ''
			});
		}
	},
	
	handleBirthdayChange: function(e) {
		e.preventDefault();

		this.setState({
			error: false,
			errorMsg: '',
			birthdate: e.target.value
		})
	},

	handleEmailChange: function(e) {
		e.preventDefault();

		this.setState({
			error: false,
			errorMsg: '',
			email: e.target.value
		})
	},

	handleProfessionChange: function(e) {
		e.preventDefault();

		this.setState({
			error: false,
			errorMsg: '',
			profession: e.target.value
		})
	},

	handleLocationChange: function(e) {
		e.preventDefault();

		this.setState({
			error: false,
			errorMsg: '',
			location: e.target.value
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
			<div className="panel panel-success traineeInfoBasic">
				<div className="panel-heading">
					<h5>基本信息<small className="step-info">第{this.props.step}步 (共4步)</small></h5>
				</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
							<label className="control-label">性别</label>						
								<label className="radio-inline">
									<input 
										type="radio" 
										value="male"  
										checked={this.state.isMale?'checked':null}
										onChange={this.handleSexInput}/>
										男
								</label>
								<label className="radio-inline">								
									<input 
										type="radio" 
										value="female" 
										checked={this.state.isFemale?'checked':null}
										onChange={this.handleSexInput} />
										女
								</label>
						</div>

						<div className="form-group">
							<label className="control-label">生日</label>						
							<Input 
								type="date" 
								required  // this is a required field 
								value={this.state.birthdate}						
								className="form-control" 
								onChange={this.handleBirthdayChange}/>
						</div>

						<div className="form-group">
							<label className="control-label">邮箱</label>						
							<Input 
								type="email"  
								value={this.state.email}						
								className="form-control" 
								onChange={this.handleEmailChange}/>
						</div>
												
						<div className="form-group">
							<label className="control-label">职业</label>												
							<Input 
								type="text" 
								value={this.state.profession}						
								className="form-control" 
								onChange={this.handleProfessionChange}/>
						</div>	

						<div className="form-group">
							<label className="control-label">所在城市</label>												
							<Input 
								type="text" 
								value={this.state.location}						
								className="form-control" 
								onChange={this.handleLocationChange}/>
						</div>							

						{this.renderError()}

						<div className="form-group">		
		              		<div className="col-xs-4 col-xs-offset-4">					
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