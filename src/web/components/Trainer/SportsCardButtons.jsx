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

	setStateHelper: function(props) {
		this.setState({
			seven: props.seven?props.seven:0,
			keep: props.keep?props.keep:0,
			jogging: props.jogging?props.jogging:0,
			others: props.others?props.others:0
		});
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);
	 },

	 componentWillReceiveProps: function(newProps) {
		this.setStateHelper(newProps);	 
	},

	 handleSevenChange: function(e) {

	 	var newValue=e.target.checked ? 1:0;

		// call handler from parent component to pass up the new status
	 	this.props.handleSportsCardStatusChange(
	 		{
	 			seven: newValue.toString(),
	 			keep: this.state.keep.toString(),
	 			run: this.state.jogging.toString(),
	 			otherDetail: this.state.others.toString()
	 		});

	 	this.setState({
	 		seven: newValue
	 	});
	 },

	 handleKeepChange: function(e) {

	 	var newValue=e.target.checked ? 1:0;

		// call handler from parent component to pass up the new status
	 	this.props.handleSportsCardStatusChange(	 		
	 		{
	 			seven: this.state.seven.toString(),
	 			keep: newValue.toString(),
	 			run: this.state.jogging.toString(),
	 			otherDetail: this.state.others.toString()
	 		});

	 	this.setState({
	 		keep: newValue
	 	});
	 },

	 handleJoggingChange: function(e) {

	 	var newValue=e.target.checked ? 1:0;

		// call handler from parent component to pass up the new status
	 	this.props.handleSportsCardStatusChange(
	 		{
	 			seven: this.state.seven.toString(),
	 			keep: this.state.keep.toString(),
	 			run: newValue.toString(),
	 			otherDetail: this.state.others.toString()
	 		});

	 	this.setState({
	 		jogging: newValue
	 	});
	 },

	 handleOthersChange: function(e) {

	 	var newValue=e.target.checked ? 1:0;

		// call handler from parent component to pass up the new status
	 	this.props.handleSportsCardStatusChange(
	 		{
	 			seven: this.state.seven.toString(),
	 			keep: this.state.keep.toString(),
	 			run: this.state.jogging.toString(),
	 			otherDetail: newValue.toString()
	 		});

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