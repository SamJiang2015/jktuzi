//
// welcome.jsx
// 
//  First page after a user is logged in.  If the user has not entered 
//  the registration info, ask the user to do so.  If the user has already
//  entered info, either prompt the user to wait for group assignment or show
//  user the group info (names of trainer, other trainees)
//
//   For entering trainee info, make the multiple steps for mobile-friendly:
// 			Step 1: basic info:
//						- sex
//						- nickname
//						- signature 
//						- birthdate
//						- location (todo)
//						- email
//						- profession
//
//			Step 2: health info: 
//						- height
//						- weight
//						- bodyfat
//						- weight goal
//						- bodyfat goal
// 						- exercise habbit
//			Step 3: sponsor: 
//						- name
//						

var React = require('react');
var Reflux = require('reflux');

var AccountStore = require('../../stores/account-store');
var AccountActions = require('../../actions/account-actions');

var TraineeInfoBasic = require('./TraineeInfoBasic');
var TraineeInfoHealth = require('./TraineeInfoHealth');
var TraineeInfoGoal = require('./TraineeInfoGoal');
var TraineeInfoSponsor = require('./TraineeInfoSponsor');
var Confirmation = require('./Confirmation');
var Success = require('./Success');
var Error = require('./Error');

var Api = require('../../utils/api');
var Auth = require('../../utils/auth');

module.exports = React.createClass({

	// listening to account store for changes to the trainee info of this account
	mixins: [
    	Reflux.listenTo(AccountStore, 'onChange')
  	],

	getInitialState: function() {
		return {
			step: 1,
			error: false,
			errorCode: null,
			accountTraineeInfo: {}
		};
	},

	componentWillMount: function() {
		AccountActions.getAccountTraineeInfo(Auth.getToken());
	},

	// reset the error status so that if error is caused by login error, a
	// when user is logged in and comes back to this page, the user will not
	// see the error again
	componentWillReceiveProps: function() {
		this.setState({
			error:false
		});
	},

 	onChange: function(event, accountTraineeInfo) {
 		this.setState({
 			accountTraineeInfo: accountTraineeInfo
 		})
 	},

	nextStep: function() {
		this.setState({
			step: this.state.step+1
		})
	},

	previousStep: function() {
		this.setState({
			step: this.state.step-1
		})
	},

	submitTraineeInfo: function() {
		if (this.props.action === 'create' || !Auth.getInfoCompleted()) {
			AccountActions.createAccountTraineeInfo(
				Auth.getToken(),
				function(statusResult){
					if (statusResult.success) {
						this.nextStep();
					} else {
						//handle the error by displaying the Error page and asking user to 
						// take actions as needed
						this.setState({
							error: true,
							errorCode: statusResult.status});					
					}
				}.bind(this));
		} else {
			AccountActions.updateAccountTraineeInfo(
				Auth.getToken(),
				function(statusResult){
					if (statusResult.success) {
						this.nextStep();
					} else {
						//handle the error by displaying the Error page and asking user to 
						// take actions as needed
						this.setState({
							error: true,
							errorCode: statusResult.status});					
					}
				}.bind(this));			
		}
	},

	showStep: function() {
		switch(this.state.step) {
			case 1: 
				return <TraineeInfoBasic 
							fieldValues={this.state.accountTraineeInfo} 
							nextStep={this.nextStep}
							step={this.state.step}
						/>;
			case 2: 
				return <TraineeInfoHealth 
							fieldValues={this.state.accountTraineeInfo} 
							nextStep={this.nextStep}
							previousStep={this.previousStep}
							step={this.state.step}							
						/>;
			case 3: 
				return <TraineeInfoGoal
							fieldValues={this.state.accountTraineeInfo} 
							nextStep={this.nextStep}
							previousStep={this.previousStep}
							step={this.state.step}							
						/>;
			case 4: 
				return <TraineeInfoSponsor
							fieldValues={this.state.accountTraineeInfo} 
							nextStep={this.nextStep}
							previousStep={this.previousStep}							
							step={this.state.step}							
						/>;
			case 5: 
				return <Confirmation
							fieldValues={this.state.accountTraineeInfo} 
							previousStep={this.previousStep}
							submitTraineeInfo={this.submitTraineeInfo}
						/>;
			case 6: 
				return <Success />;				
		}
 	},

 	renderPrompt: function(){
 		if (this.state.step<2) {
 			return <p>{this.props.message}</p>
 		} else {
 			return null;
 		}

 	},

 	renderContent: function() {
 		if (this.state.error) {
 			return <Error errorCode={this.state.errorCode} />;
 		} else {
 			return this.showStep();
 		}
 	},

 	render: function() {

 		const message=(<p>{this.props.message}</p>);

 		return (
 			<div className="traineeInfo">
 				{this.renderPrompt()}
 				{this.renderContent()}
 			</div>
		);
 	},

})



