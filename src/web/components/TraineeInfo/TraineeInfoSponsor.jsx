// TraineeInfoSponsor.jsx



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
			nickname: '',
			signature: '',
			sponsorName: '',
			sponsorMobile: '',
			error: false,
			errorMsg: ''
		}
	},

	setStateHelper: function(fieldValues) {
 		if (fieldValues===null || _.isEmpty(fieldValues)) return;

 		this.setState({
 			nickname: fieldValues.nickname,
 			signature: fieldValues.signature,
 			sponsorName: fieldValues.sponsorName,
 			sponsorMobile: fieldValues.sponsorMobile,

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
			nickname: this.state.nickname.trim(),
			signature: this.state.signature.trim(),
			sponsorName: this.state.sponsorName.trim(),
			sponsorMobile: this.state.sponsorMobile.trim()
		};

		var errorMsg='';

		if (data.nickname.length<Limits.Name.minLen || data.nickname.length>Limits.Name.maxLen) {
			errorMsg = '请核验您输入的昵称';
		} else if (data.signature.length<Limits.Signature.minLen || data.signature.length>Limits.Signature.maxLen) {
			errorMsg = '请核验您输入的个性签名';
		} else if (data.sponsorName.length<Limits.Name.minLen || data.sponsorName.length>Limits.Name.maxLen) {
			errorMsg = '请核验您输入的介绍人名字';
		} else if (//(data.sponsorMobile !== '') &&  --ToDo: should sponsorMobile be required?
			(isNaN(data.sponsorMobile) || data.sponsorMobile.length<Limits.Mobile.minLen || data.sponsorMobile.length>Limits.Mobile.maxLen)) {
			errorMsg='请核验您输入的介绍人手机';
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

	handleNicknameChange: function(e) {
		e.preventDefault();

		this.setState({
			nickname: e.target.value,
			error: false,
			errorMsg: ''
		})
	},	

	handleSignatureChange: function(e) {
		e.preventDefault();

		this.setState({
			signature: e.target.value,
			error: false,
			errorMsg: ''
		})
	},	

	handleSponsorNameChange: function(e) {
		e.preventDefault();

		this.setState({
			sponsorName: e.target.value,
			error: false,
			errorMsg: ''
		})
	},	

	handleSponsorMobileChange: function(e) {
		e.preventDefault();

		this.setState({
			sponsorMobile: e.target.value,
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
								value={this.state.nickname} 
								className="form-control" 
								onChange={this.handleNicknameChange}/>
						</div>
						<div className="form-group">
							<label className="control-label">个性化签名</label>						
							<Input 
								type="text" 
								ref="signature" 
								minLength="0"
								maxLength="50"						
								value={this.state.signature}						
								className="form-control" 
								onChange={this.handleSignatureChange}/>
						</div>
						<div className="form-group">							
							<Input 
								type="text" 
								label="您加入PiPi的介绍人(请填写真实姓名)" 
								ref="sponsorName" 
								maxLength="20"
								value={this.state.sponsorName}						
								className="form-control" 
								onChange={this.handleSponsorNameChange} />
						</div>
						<div className="form-group">							
							<Input 
								type="tel" 
								label="您的介绍人在PiPi注册时使用的手机号码" 
								ref="sponsorMobile" 
								maxLength="20"
								value={this.state.sponsorMobile}						
								className="form-control" 
								onChange={this.handleSponsorMobileChange}/>
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