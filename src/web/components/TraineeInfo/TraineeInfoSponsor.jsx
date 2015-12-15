// TraineeInfoSponsor.jsx



var React = require('react');

var Panel=require('react-bootstrap/lib/panel');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');

var Limits = require('../../utils/constants').Limits;

module.exports = React.createClass({

	getInitialState: function() {
		return {
			error: false,
			errorMsg: null
		}
	},

	saveAndContinue: function(e) {
		e.preventDefault();

		var data = {
			nickname: this.refs.nickname.getValue().trim(),
			signature: this.refs.signature.getValue().trim(),
			sponsorName: this.refs.sponsorName.getValue().trim(),
			sponsorMobile: this.refs.sponsorMobile.getValue().trim()
		};

		var errorMsg='';

		if (data.nickname.length<Limits.Name.minLen || data.nickname.length>Limits.Name.maxLen) {
			errorMsg = '请核验您输入的昵称';
		} else if (data.signature.length<Limits.Signature.minLen || data.signature.length>Limits.Signature.maxLen) {
			errorMsg = '请核验您输入的个性签名';
		} else if (data.sponsorName.length<Limits.Name.minLen || data.sponsorName.length>Limits.Name.maxLen) {
			errorMsg = '请核验您输入的介绍人名字';
		} else if ((data.sponsorMobile !== '') &&
			(isNaN(data.sponsorMobile) || data.sponsorMobile.length<Limits.Mobile.minLen || data.sponsorMobile.length>Limits.Mobile.maxLen)) {
			errorMsg='请核验您输入的介绍人手机';
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
			<div className="panel panel-success traineeInfoSponsor">
				<div className="panel-heading">
					<h5>其他信息<small className="step-info">第{this.props.step}步 (共4步)</small></h5>
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
								className="form-control" 
								onChange={this.handleInputChange}/>
						</div>
						<div className="form-group">
							<label className="control-label">个性化签名</label>						
							<Input 
								type="text" 
								ref="signature" 
								minLength="0"
								maxLength="50"						
								defaultValue={this.props.fieldValues.signature}						
								className="form-control" 
								onChange={this.handleInputChange}/>
						</div>
						<div className="form-group">							
							<Input 
								type="text" 
								label="您加入PiPi的介绍人(请填写真实姓名)" 
								ref="sponsorName" 
								maxLength="20"
								defaultValue={this.props.fieldValues.sponsorName}						
								className="form-control" 
								onChange={this.handleInputChange} />
						</div>
						<div className="form-group">							
							<Input 
								type="number" 
								label="您的介绍人在PiPi注册时使用的手机号码" 
								ref="sponsorMobile" 
								maxLength="20"
								defaultValue={this.props.fieldValues.sponsorMobile}						
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