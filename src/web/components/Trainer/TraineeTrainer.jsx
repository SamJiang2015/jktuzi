//
// TraineeTrainer.jsx
// 

var React = require('react');

var MealCardButtons = require('./MealCardButtons');
var MealCardStatus = require('../../utils/constants').MealCardStatus;

module.exports = React.createClass({

	getInitialState: function(){
		return {
			id: null,
			name: '',
			nickname: '',
			breakfast: null
		};
	},

	setStateHelper: function(props) {
		this.setState({
			id: props.id,
			name: props.name,
			nickname: props.nickname,
			breakfast: props.breakfast
		});
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);	
	},

	componentWillReceiveProps: function(newProps) {
		this.setStateHelper(newProps);
	},	

	handleMealCardStatusChange: function(newStatus) {
		// pass the new meal card status to the parent component
		this.props.handleMealCardStatusChange(this.state.id, newStatus);
	},

	render: function() {

		var mealCardClassName;

		switch(this.state.breakfast) {
			case MealCardStatus.Pass: 
				mealCardClassName="Pass";
				break;
			case MealCardStatus.Fail: 
				mealCardClassName="Fail";
				break;
			case MealCardStatus.OpenDay: 
				mealCardClassName="OpenDay";
				break;
			case MealCardStatus.Miss:
			default: 
				mealCardClassName="Miss";
		}

		return (
			<tr className={mealCardClassName}> 
				<td>{this.state.name}</td>
				<td>{this.state.nickname}</td>	
				<td>
					<MealCardButtons 
						status={this.state.breakfast}
						handleMealCardStatusChange={this.handleMealCardStatusChange}
					/>
				</td>					
			</tr>
		);
	}



})