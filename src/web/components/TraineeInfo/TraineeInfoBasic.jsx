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

module.exports = React.createClass({

	getInitialState: function() {
		return {
			isMale: null
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
			name: this.refs.name.getValue().trim(),
			isMale: this.refs.male.checked ? this.refs.male.checked:(this.refs.female.checked ? false : null),
			birthdate: this.refs.birthdate.getValue().trim(), 
			email: this.refs.email.getValue().trim(),
			profession: this.refs.profession.getValue().trim(),			
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
			<div className="panel panel-success traineeInfoBasic">
				<div className="panel-heading">
					<h5>基本信息<small className="step-info">第{this.props.step}步 (共3步)</small></h5>
				</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
							<label className="control-label">真实姓名</label>						
							<Input 
								type="text"  
								ref="name" 
								defaultValue={this.props.fieldValues.name}						
								className="form-control" />
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