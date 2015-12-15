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
var objectAssign = require('object.assign');

var TraineeInfoBasic = require('./TraineeInfoBasic');
var TraineeInfoHealth = require('./TraineeInfoHealth');
var TraineeInfoGoal = require('./TraineeInfoGoal');
var TraineeInfoSponsor = require('./TraineeInfoSponsor');
var Confirmation = require('./Confirmation');
var Success = require('./Success');

var Api = require('../../utils/api');
var Auth = require('../../utils/auth');

var fieldValues = {
	// basic info:
	isMale: null,
	nickname: null,
	signature: null, 
	birthdate: null,
	email: null,
	profession: null,
	// health info:
	height: null,
	weight: null,
	bodyfat: null,
	weightGoal: null,
	bodyfatGoal: null,
	habbit: null,
	// sponsor:
	sponsorName: null,
	sponsorMobile: null
}

module.exports = React.createClass({
	getInitialState: function() {
		return {
			step: 1
		};
	},

	saveValues: function(fields) {
		// store the properties specified in 'fields' in the fieldValues object
		fieldValues = objectAssign({}, fieldValues, fields);
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
		//call Api to submit the info, upon success return this.nextStep()
		// if fails, show error and do not advance
      	Api.post('accounts/'+ Auth.getAccountId() +'/traineeInfo', fieldValues, true)
      	.then(function(json){
        	console.log(json);

        	if (json.success) {

        		// flip the flag cached at server-side;
        		Auth.setInfoCompleted(true);

	       		// show the success page
				this.nextStep();
			} else {
				//todo: handle error case
				if (json.status === 400) {
					alert("信息有误。请核对信息后再试。");
				} else if(json.status === 401) {
					alert("您的登录已经过期。请重新登录。");
				} else {
					alert("很抱歉暂时不能提交信息。请您联系我们客服(电话：58888888)");
				}
			}
        }.bind(this))
      	.catch(function (e) {
        	console.log('Error when calling submitTraineeInfo: ' + e.toString());
      	});    
	},

	showStep: function() {
		switch(this.state.step) {
			case 1: 
				return <TraineeInfoBasic 
							fieldValues={fieldValues} 
							nextStep={this.nextStep}
							saveValues={this.saveValues}
							step={this.state.step}
						/>;
			case 2: 
				return <TraineeInfoHealth 
							fieldValues={fieldValues} 
							nextStep={this.nextStep}
							previousStep={this.previousStep}
							saveValues={this.saveValues}
							step={this.state.step}							
						/>;
			case 3: 
				return <TraineeInfoGoal
							fieldValues={fieldValues} 
							nextStep={this.nextStep}
							previousStep={this.previousStep}
							saveValues={this.saveValues}
							step={this.state.step}							
						/>;
			case 4: 
				return <TraineeInfoSponsor
							fieldValues={fieldValues} 
							nextStep={this.nextStep}
							previousStep={this.previousStep}							
							saveValues={this.saveValues}
							step={this.state.step}							
						/>;
			case 5: 
				return <Confirmation
							fieldValues={fieldValues} 
							previousStep={this.previousStep}
							submitTraineeInfo={this.submitTraineeInfo}
						/>;
			case 6: 
				return <Success
							fieldValues={fieldValues} 
						/>;				
		}

 	},

 	render: function() {

 		return (
 			<div className="traineeInfo">
 				<br/>
 				{this.showStep()}
 			</div>
		);
 	}
})



