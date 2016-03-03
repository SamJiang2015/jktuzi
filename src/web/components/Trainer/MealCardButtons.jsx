//
// MealCardButtons.jsx
// 

var React = require('react');

var Glyphicon = require('react-bootstrap/lib/glyphicon');
var MealCardStatus = require('../../utils/constants').MealCardStatus;
var EMPTY = require('../../utils/constants').EMPTY;

module.exports = React.createClass({

	getInitialState: function() {

		return {
			status: null
		}
	},

	componentDidMount: function() {
		this.setState({
			status: this.props.status
		});
	 },

	 componentWillReceiveProps: function(newProps) {
		this.setState({
			status: newProps.status
		});
	 },

	// when user clicks on one of the meal status button
	handleChange: function(e) {
		var newStatus; 

		// determine which button has been clicked 
		if (e.target.value==='pass' && this.state.status!==MealCardStatus.Pass) {
				newStatus = MealCardStatus.Pass;
		} else if (e.target.value==='fail' && this.state.status!==MealCardStatus.Fail) {
				newStatus = MealCardStatus.Fail;
		} else if (e.target.value==='miss' && this.state.status!==MealCardStatus.Miss) {
				newStatus = MealCardStatus.Miss;
		} else if (e.target.value==='openday' && this.state.status!==MealCardStatus.OpenDay) {
				newStatus = MealCardStatus.OpenDay;
		} else {
			newStatus = null;
		}

		// call handler from parent component to pass up the new status
		this.props.handleMealCardStatusChange(newStatus!==null?newStatus:EMPTY);

		// render UI to show the new status
		this.setState({
			status: newStatus,
			disabled: false
		});

	},

	render: function() {
		return (
			<div className={"form-group"}>
				<label className="radio-inline">
					<input 
						type="radio" 
						value="pass"  
						checked={this.state.status===MealCardStatus.Pass?'checked':null}					
						onChange={this.handleChange}/>
						<Glyphicon glyph="ok-circle"/>
				</label>
				<label className="radio-inline">								
					<input 
						type="radio" 
						value="fail" 
						checked={this.state.status===MealCardStatus.Fail?'checked':null}				
						onChange={this.handleChange} />
						<Glyphicon glyph="remove-circle"/>
				</label>
				<label className="radio-inline">
					<input 
						type="radio" 
						value="miss"  
						checked={this.state.status===MealCardStatus.Miss?'checked':null}
						onChange={this.handleChange}/>
						<Glyphicon glyph="ban-circle"/>
				</label>				
				<label className="radio-inline">								
					<input 
						type="radio" 
						value="openday" 
						checked={this.state.status===MealCardStatus.OpenDay?'checked':null}				
						onChange={this.handleChange} />
						<Glyphicon glyph="cutlery"/>
				</label>				
			</div>
		);
	}
})