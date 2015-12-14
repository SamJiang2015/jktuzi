// TraineeInfoSponsor.jsx



var React = require('react');

var Panel=require('react-bootstrap/lib/panel');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');

module.exports = React.createClass({

	saveAndContinue: function(e) {
		e.preventDefault();

		var data = {
			nickname: this.refs.nickname.getValue().trim(),
			signature: this.refs.signature.getValue().trim(),
			sponsor: this.refs.sponsor.getValue().trim()
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
			<div className="panel panel-success traineeInfoSponsor">
				<div className="panel-heading">
					<h5>其他信息<small className="step-info">第{this.props.step}步 (共3步)</small></h5>
				</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
							<label className="control-label">昵称</label>
							<Input 
								type="text" 
								ref="nickname" 
								required   // this is a required field
								minLength="2"
								maxLength="20"
								defaultValue={this.props.fieldValues.nickname} 
								className="form-control" />
						</div>
						<div className="form-group">
							<label className="control-label">个性化签名</label>						
							<Input 
								type="text" 
								ref="signature" 
								minLength="0"
								maxLength="50"						
								defaultValue={this.props.fieldValues.signature}						
								className="form-control" />
						</div>
						<div className="form-group">							
							<Input 
								type="text" 
								label="介绍人(请填写真实姓名)" 
								ref="sponsor" 
								maxLength="20"
								defaultValue={this.props.fieldValues.sponsor}						
								className="form-control" 
							/>
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