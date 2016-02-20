//
// SportsCardButtons.jsx


var React = require('react');
var SportsType = require('../../utils/constants').SportsType;

module.exports = React.createClass({

	getInitialState: function() {

		return {
			seven: 0,
			keep: 0,
			jogging: 0,
			others: 0
		}
	},

	componentDidMount: function() {
		this.setState({
			seven: this.props.seven,
			keep: this.props.keep,
			jogging: this.props.jogging,
			others: this.props.others
		});
	 },

	 componentWillReceiveProps: function(newProps) {
		this.setState({
			seven: newProps.seven,
			keep: newProps.keep,
			jogging: newProps.jogging,
			others: newProps.others
		});
	 },

	 handleSevenChange: function(e) {
	 	e.preventDefault();

	 	var newValue=e.target.checked ? 1:0;

		// call handler from parent component to pass up the new status
	 	this.props.handleSportsCardStatusChange(SportsType.Seven, newValue);

	 	this.setState({
	 		seven: newValue
	 	});
	 },

	 handleKeepChange: function(e) {
	 	e.preventDefault();

	 	var newValue=e.target.checked ? 1:0;

		// call handler from parent component to pass up the new status
	 	this.props.handleSportsCardStatusChange(SportsType.Keep, newValue);

	 	this.setState({
	 		keep: newValue
	 	});
	 },

	 handleJoggingChange: function(e) {
	 	e.preventDefault();

	 	var newValue=e.target.checked ? 1:0;

		// call handler from parent component to pass up the new status
	 	this.props.handleSportsCardStatusChange(SportsType.Jogging, newValue);

	 	this.setState({
	 		jogging: newValue
	 	});
	 },

	 handleOthersChange: function(e) {
	 	e.preventDefault();

	 	var newValue=e.target.checked ? 1:0;

		// call handler from parent component to pass up the new status
	 	this.props.handleSportsCardStatusChange(SportsType.Others, newValue);

	 	this.setState({
	 		others: newValue
	 	});
	 },	 

	render: function() {
		return (
			<div className="form-group">
				<label className="checkbox-inline">
					<input 
						type="checkbox" 
						value="seven"  
						checked={this.state.seven===1?'checked':null}
						onChange={this.handleSevenChange}/>
						Seven
				</label>
				<label className="checkbox-inline">
					<input 
						type="checkbox" 
						value="keep"  
						checked={this.state.keep===1?'checked':null}
						onChange={this.handleKeepChange}/>
						Keep
				</label>
				<label className="checkbox-inline">								
					<input 
						type="checkbox" 
						value="jogging" 
						checked={this.state.jogging===1?'checked':null}
						onChange={this.handleJoggingChange} />
						跑步
				</label>
				<label className="checkbox-inline">								
					<input 
						type="checkbox" 
						value="others" 
						checked={this.state.others===1?'checked':null}
						onChange={this.handleOthersChange} />
						其他
				</label>				
			</div>
		);
	}
})