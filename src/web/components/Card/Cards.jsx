// 
// cards.jsx
// 
//  Container to show food card, sports card and health card
//

var React = require('react');
var FoodCard = require('./FoodCard');
var HealthCard = require('./HealthCard');
var SportCard= require('./SportCard');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			foodCard: {breakfast:null, lunch:null, dinner: null},
			healthCard: {weight:'', bodyfat:''},
			sportCard: {items: [
				{
					id: 1,
					type: '跑步',
					description: '长跑',
					duration: '120',
					distance: '20'
				}]}
		}
	},

	submitFoodCard: function() {

	},

	submitHealthCard: function() {

	},

	submitSportCard: function() {

	},

	render: function() {
		return (
			<div className="cards">
				<FoodCard 
					breakfast={this.state.foodCard.breakfast}
					lunch={this.state.foodCard.lunch}
					dinner={this.state.foodCard.dinner}
					submitInfo={this.submitFoodCard}
				/>
				<HealthCard 
					weight={this.state.healthCard.weight}
					bodyfat={this.state.healthCard.bodyfat}
					submitInfo={this.submitHealthCard}
				/>				
				<SportCard 
					items={this.state.sportCard.items}
					submitInfo={this.submitSportCard}
				/>				
			</div>

			);

	}

})