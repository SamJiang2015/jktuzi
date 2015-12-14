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
var TraineeInfoSponsor = require('./TraineeInfoSponsor');
var Confirmation = require('./Confirmation');
var Success = require('./Success');

var Api = require('../../utils/api');

var fieldValues = {
	// basic info:
	name: null,
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
	sponsor: null
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
      	Api.post('trainees', fieldValues, true)
      	.then(function(json){
        	console.log(json);

        	// show the success page
			this.nextStep();
        })
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
				return <TraineeInfoSponsor
							fieldValues={fieldValues} 
							nextStep={this.nextStep}
							previousStep={this.previousStep}							
							saveValues={this.saveValues}
							step={this.state.step}							
						/>;
			case 4: 
				return <Confirmation
							fieldValues={fieldValues} 
							previousStep={this.previousStep}
							submitTraineeInfo={this.submitTraineeInfo}
						/>;
			case 5: 
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



