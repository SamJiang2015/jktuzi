// 
// cards.jsx
// 
//  Container to show food card, sports card and health card
//

var React = require('react');
var Reflux = require('reflux');
var Input = require('react-bootstrap/lib/input');

var Auth = require('../../utils/auth');

var FoodCardStore = require('../../stores/foodcard-store');
var HealthCardStore = require('../../stores/healthcard-store');
var SportCardStore = require('../../stores/sportcard-store');

var FoodCardActions = require('../../actions/foodcard-actions');
var HealthCardActions = require('../../actions/healthcard-actions');
var SportCardActions = require('../../actions/sportcard-actions');

var FoodCard = require('./FoodCard');
var HealthCard = require('./HealthCard');
var SportCard= require('./SportCard');

module.exports = React.createClass({

	// listening to account store for changes to the trainee info of this account
	mixins: [
    	Reflux.listenTo(FoodCardStore, 'onFoodCardChange'),
    	Reflux.listenTo(HealthCardStore, 'onHealthCardChange'),
    	Reflux.listenTo(SportCardStore, 'onSportCardChange')
  	],

	getInitialState: function() {
		return {
			foodCard: {breakfast: false, lunch: false, dinner: false},
			healthCard: {weight: null, height: null},
			sportCard: [],
			date: new Date().toISOString().slice(0,10), // start off with today's date

			submitFoodCardError: false,
			submitFoodCardErrorCode: null,
			submitHealthCardError: false,
			submitHealthCardErrorCode: null,
			submitSportCardError: false,
			submitSportCardErrorCode: null,			
		}
	},

	onFoodCardChange: function(event, foodCard) {
  		this.setState({
  			foodCard: foodCard
  		})
  	},

  	onHealthCardChange: function(event, healthCard) {
  		this.setState({
  			healthCard: healthCard
  		})
  	},

  	onSportCardChange: function(event, sportCard) {
  		this.setState({
  			sportCard: sportCard
  		})
  	},

	componentWillMount: function() {
		FoodCardActions.getFoodCard(Auth.getAccountId(), this.state.date, Auth.getToken());
		HealthCardActions.getHealthCard(Auth.getAccountId(), this.state.date, Auth.getToken());
		SportCardActions.getSportCard(Auth.getAccountId(), this.state.date, Auth.getToken());
	},

	handleDateChange: function(e) {
		e.preventDefault();

		this.setState({
			error: false,
			errorMsg: '',
			date: e.target.value
		});

		// fetch the data based on the new dates
		FoodCardActions.getFoodCard(Auth.getAccountId(), e.target.value, Auth.getToken())
		HealthCardActions.getHealthCard(Auth.getAccountId(), e.target.value, Auth.getToken());		
		SportCardActions.getSportCard(Auth.getAccountId(), e.target.value, Auth.getToken());		
	},

	submitFoodCard: function(userData) {
		FoodCardActions.updateFoodCard(
			Auth.getAccountId(),
			this.state.date,
			userData,
			Auth.getToken(),
			function(statusResult){
				if (!statusResult.success) {
					//handle the error by displaying the Error page and asking user to 
					// take actions as needed
					this.setState({
						submitFoodCardError: true,
						submitFoodCardErrorCode: statusResult.status});
				}
			}.bind(this));
	},

	submitHealthCard: function(userData) {
		HealthCardActions.updateHealthCard(
			Auth.getAccountId(),
			this.state.date,
			userData,
			Auth.getToken(),
			function(statusResult){
				if (!statusResult.success) {
					//handle the error by displaying the Error page and asking user to 
					// take actions as needed
					this.setState({
						submitHealthCardError: true,
						submitHealthCardErrorCode: statusResult.status});
				}
			}.bind(this));
	},	

	submitSportCard: function(userData) {
		SportCardActions.updateSportCard(
			Auth.getAccountId(),
			this.state.date,
			userData,
			Auth.getToken(),
			function(statusResult){
				if (!statusResult.success) {
					//handle the error by displaying the Error page and asking user to 
					// take actions as needed
					this.setState({
						submitSportCardError: true,
						submitSportCardErrorCode: statusResult.status});
				}
			}.bind(this));
	},

	render: function() {
		return (
			<div className="cards">
				<form className="form-inline">
					<div className="form-group">
						<label>打卡日期</label>
						<input id="dateInput"
							type="date"
							label="打卡日期"
							value={this.state.date}
							onChange={this.handleDateChange}
							className="form-control"
							/>
					</div>
				</form>
				<br/>
				<FoodCard 
					breakfast={this.state.foodCard.breakfast}
					lunch={this.state.foodCard.lunch}
					dinner={this.state.foodCard.dinner}
					submitInfo={this.submitFoodCard}
					submitError={this.state.submitFoodCardError}
					submitErrorCode={this.state.submitFoodCardErrorCode}
				/>
				<HealthCard 
					weight={this.state.healthCard.weight}
					bodyfat={this.state.healthCard.bodyfat}
					submitInfo={this.submitHealthCard}
					submitError={this.state.submitHealthCardError}
					submitErrorCode={this.state.submitHealthCardErrorCode}					
				/>				
				<SportCard 
					items={this.state.sportCard}
					submitInfo={this.submitSportCard}
					submitError={this.state.submitSportCardError}
					submitErrorCode={this.state.submitSportCardErrorCode}										
				/>				
			</div>

			);

	}

})