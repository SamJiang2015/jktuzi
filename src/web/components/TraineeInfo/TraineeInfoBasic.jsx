//
// TraineeInfoBasic.jsx
//
// 			Step 1: basic info:
//						- sex
//						- nickname
//						- signature 
//						- birthdate
//						- location (todo)
//						- email
//						- profession
//

var React = require('react');

var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');

var Limits = require('../../utils/constants').Limits;
var Helper = require('../../utils/helper');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			isMale: null,
			error: false,
			errorMsg: null
		}
	},

	handleSexInput: function(e) {
		if (e.target.value==='male') {
			this.setState({
				isMale: true
			});
		} else {
			this.setState({
				isMale: false
			});

		}
	},

	saveAndContinue: function(e) {
		e.preventDefault();

		var data = {
			isMale: this.refs.male.checked ? this.refs.male.checked:(this.refs.female.checked ? false : null),
			birthdate: this.refs.birthdate.getValue().trim(), 
			email: this.refs.email.getValue().trim(),
			profession: this.refs.profession.getValue().trim(),			
		};

		var errorMsg='';

		if (!this.refs.male.checked && !this.refs.female.checked) {
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
		}

		if (errorMsg!=='') {
			this.setState({
				error: true,
				errorMsg: errorMsg
			})
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
										ref="male"
										value="male" 
										defaultChecked={this.props.fieldValues.isMale?'defaultChecked':null}  
										checked={this.state.isMale}
										onClick={this.handleSexInput}/>
										男
								</label>
								<label className="radio-inline">								
									<input 
										type="radio" 
										ref="female"
										value="female" 
										defaultChecked={this.props.fieldValues.isMale!==null && !this.props.fieldValues.isMale?'defaultChecked':null}  						
										checked={this.state.isMale!==null && !this.state.isMale}
										onClick={this.handleSexInput} />
										女
								</label>
						</div>

						<div className="form-group">
							<label className="control-label">生日</label>						
							<Input 
								type="date" 
								ref="birthdate"
								required  // this is a required field 
								defaultValue={this.props.fieldValues.birthdate===null?'':this.props.fieldValues.birthdate}						
								className="form-control" />
						</div>

						<div className="form-group">
							<label className="control-label">邮箱</label>						
							<Input 
								type="email"  
								ref="email" 
								defaultValue={this.props.fieldValues.email}						
								className="form-control" />
						</div>
												
						<div className="form-group">
							<label className="control-label">职业</label>												
							<Input 
								type="text" 
								ref="profession" 
								defaultValue={this.props.fieldValues.profession}						
								className="form-control" />
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