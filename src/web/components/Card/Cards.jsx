// 
// cards.jsx
// 
//  Container to show food card, sports card and health card
//

var React = require('react');
var Input = require('react-bootstrap/lib/input');
var FoodCard = require('./FoodCard');
var HealthCard = require('./HealthCard');
var SportCard= require('./SportCard');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			foodCard: {breakfast:true, lunch:null, dinner: true},
			healthCard: {weight:'120', bodyfat:'20'},
			sportCard: {items: [
				{
					id: 1,
					type: 1,
					description: '长跑',
					duration: '120',
					distance: '20'
				},
				{
					id: 2,
					type: 5,
					description: '',
					duration: '7',
					distance: ''
				},
				{
					id: 3,
					type: 2,
					description: '普拉提',
					duration: '35',
					distance: ''
				},

				]
			},
			date: new Date().toISOString().slice(0,10),
		}
	},

	handleDateChange: function(e) {
		e.preventDefault();

		this.setState({
			error: false,
			errorMsg: '',
			date: e.target.value
		})
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
				<form className="form-inline">
					<div class="form-group">
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