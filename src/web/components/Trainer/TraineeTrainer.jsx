//
// TraineeTrainer.jsx
// 

var React = require('react');

var MealCardButtons = require('./MealCardButtons');
var SportsCardButtons = require('./SportsCardButtons');

var CardType = require('../../utils/constants').CardType;
var MealCardStatus = require('../../utils/constants').MealCardStatus;
var SportsType = require('../../utils/constants').SportsType;

module.exports = React.createClass({

	getInitialState: function(){
		return {
			id: null,
			name: '',
			nickname: '',
			mealCardStatus: null
		};
	},

	setStateHelper: function(props) {
		this.setState({
			id: props.id,
			name: props.name,
			nickname: props.nickname,
			mealCardStatus: props.mealCardStatus,
			seven: props.seven,
			keep: props.keep,
			jogging: props.jogging,
			others: props.others
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

	handleSportsCardStatusChange: function(sportsType, newValue) {
		// pass the new sports card status to the parent component
		this.props.handleSportsCardStatusChange(this.state.id, sportsType, newValue);		
	},

	renderMealCards: function() {

		return (
			<td>
				<MealCardButtons 
					status={this.state.mealCardStatus}
					handleMealCardStatusChange={this.handleMealCardStatusChange}
				/>
			</td>					
		);
	},

	renderSportsCards: function() {
		return (
			<td>
				<SportsCardButtons 
					seven={this.state.seven}
					keep={this.state.keep}
					jogging={this.state.jogging}
					others={this.state.others}
					handleSportsCardStatusChange={this.handleSportsCardStatusChange}
				/>
			</td>					
		);
	},

	renderCards: function() {
		switch (this.props.cardType) {
			case CardType.Breakfast:
			case CardType.Lunch:
			case CardType.Dinner:
				return this.renderMealCards();
				break;
			case CardType.Sports:
				return this.renderSportsCards();
				break;
			default:
				return null;
		}
	},

	render: function() {

		// use color to help show the status of a meal card
		var mealCardClassName = '';

		if (this.props.cardType === CardType.Breakfast 
			|| this.props.cardType === CardType.Lunch 
			|| this.props.cardType === CardType.Dinner) {

			switch(this.state.mealCardStatus) {
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
		}

		return (
			<tr className={mealCardClassName}> 
				<td>{this.state.name}</td>
				<td>{this.state.nickname}</td>	
				{this.renderCards()}
			</tr>
		);
	}



})