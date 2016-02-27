//
// TraineeTrainer.jsx
// 

var React = require('react');

var MealCardButtons = require('./MealCardButtons');
var SportsCardButtons = require('./SportsCardButtons');
var BodyInputs = require('./BodyInputs');
var TraineeInfoModal = require('./TraineeInfoModal');

var CardType = require('../../utils/constants').CardType;
var MealCardStatus = require('../../utils/constants').MealCardStatus;
var SportsType = require('../../utils/constants').SportsType;

module.exports = React.createClass({

	getInitialState: function(){
		return {
			id: null,
			name: '',
			nickname: '',
			mealCardStatus: null,
			seven: null,
			keep: null,
			jogging: null,
			others: null,
			weight: null,
			fat: null,

			showModal: false
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
			others: props.others,
			weight: props.weight,
			fat: props.fat,
			labels: props.labels,

			showModal: false
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

	handleWeightChange: function(newValue) {
		// pass the new body weight card status to the parent component
		this.props.handleWeightChange(this.state.id, newValue);		
	},

	handleFatChange: function(newValue) {
		// pass the new body fat card status to the parent component
		this.props.handleFatChange(this.state.id, newValue);		
	},	

	handleClick: function(id, e) {
		e.preventDefault();

		this.setState({
			showModal: true
		});
	},

	renderTraineeInfoModal: function() {
		if (this.state.showModal) {
			return (
				<TraineeInfoModal
					{...this.props}
					showModal={this.state.showModal}
					/>
			);
		}
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

	renderBodyInputs: function() {
		return (
			<td>
				<BodyInputs 
					weight={this.state.weight}
					fat={this.state.fat}
					handleWeightChange={this.handleWeightChange}
					handleFatChange={this.handleFatChange}
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
			case CardType.Body:
				return this.renderBodyInputs();
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
					mealCardClassName="success";
					break;
				case MealCardStatus.Fail: 
					mealCardClassName="danger";
					break;
				case MealCardStatus.OpenDay: 
					mealCardClassName="info";
					break;
				case MealCardStatus.Miss:
				default: 
					mealCardClassName="active";
			}
		}

		return (
			<tr 
				className={mealCardClassName}> 			
				<td
				 	onClick={this.handleClick.bind(this, this.state.id)}
				 	>
				 	<span className="clickable">{this.state.nickname}</span>
				 </td>
				{this.renderCards()}
				<td>{this.renderTraineeInfoModal()}</td>
			</tr>
		);		
	}

})