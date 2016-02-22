//
// BodyInputs.jsx
//

var React = require('react');
var Input = require('react-bootstrap/lib/input');

module.exports = React.createClass({

	getInitialState: function() {

		return {
			weight: 0,
			fat: 0
		}
	},

	componentDidMount: function() {
		this.setState({
			weight: this.props.weight,
			fat: this.props.fat
		});
	 },

	 componentWillReceiveProps: function(newProps) {
		this.setState({
			weight: newProps.weight,
			fat: newProps.fat
		});
	 },

	 handleWeightChange: function(e) {
	 	e.preventDefault();

	 	var newValue = e.target.value;

		// call handler from parent component to pass up the new status
	 	this.props.handleWeightChange(newValue);

	 	this.setState({
	 		weight: newValue
	 	});
	 },

	 handleFatChange: function(e) {
	 	e.preventDefault();

	 	var newValue = e.target.value;

		// call handler from parent component to pass up the new status
	 	this.props.handleFatChange(newValue);

	 	this.setState({
	 		fat: newValue
	 	});
	 },

	render: function() {
		return (
            <div className="form-group">
                <div className="col-sm-4 col-sm-offset-2">
					<Input 
						type="number" 
						addonAfter="kg"
						min="50"
						max="350"
						value={this.state.weight}  												
						className="form-control" 
						onChange={this.handleWeightChange}/>
                </div>
                <div className="col-sm-4">
					<Input 
						type="number"  
						addonAfter="%"
						min="5"
						max="50"
						value={this.state.fat}  												
						className="form-control" 
						onChange={this.handleFatChange}/>
                </div>
            </div>
		);
	}
})