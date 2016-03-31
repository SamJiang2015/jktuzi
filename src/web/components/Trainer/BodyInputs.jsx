//
// BodyInputs.jsx
//

var React = require('react');
var Input = require('react-bootstrap/lib/input');
var EMPTY = require('../../utils/constants').EMPTY;

module.exports = React.createClass({

	getInitialState: function() {

		return {
			weight: null,
			fat: null
		}
	},

	setStateHelper: function(props) {
		var weight=props.weight;
		var fat=props.fat;

		if (!isNaN(weight) && parseFloat(weight) == EMPTY) {
			weight=null;
		}

		if (!isNaN(fat) && parseFloat(fat) == EMPTY) {
			fat=null;
		}

		this.setState({
			weight: weight,
			fat: fat
		});
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);
	 },

	 componentWillReceiveProps: function(newProps) {
		this.setStateHelper(newProps);
	 },

	 handleWeightChange: function(e) {
	 	e.preventDefault();

	 	var newValue = e.target.value;

	 	var newNumber;
	 	if (newValue.trim()!=='') {
	 		if (!isNaN(newValue)) {
				// 四舍五入保留小数点后一位
		 		newNumber = parseFloat(newValue).toFixed(1);
		 	} else {
		 		newNumber = newValue;
		 	}
		 } else {
		 	newNumber = EMPTY;
		 }

		// call handler from parent component to pass up the new status
		this.props.handleBodyCardStatusChange(newNumber, this.state.fat?this.state.fat:EMPTY);

		this.setState({
			weight: newValue
		});			 	
	 },

	 handleFatChange: function(e) {
	 	e.preventDefault();

	 	var newValue = e.target.value;

	 	var newNumber;
	 	if (newValue.trim()!=='') {
	 		if (!isNaN(newValue)) {
				// 四舍五入保留小数点后一位	 			
		 		newNumber = parseFloat(newValue).toFixed(1);
		 	} else {
		 		newNumber = newValue;
		 	}
		} else {
		 	newNumber = EMPTY;
		}

		// call handler from parent component to pass up the new value
		this.props.handleBodyCardStatusChange(this.state.weight?this.state.weight:EMPTY, newNumber);

		this.setState({
			fat: newValue
		});			 	
	 },

	handleFocus: function(e) {
		var target = e.target;
		setTimeout(function() {
		    target.select();
		  }, 0);
	},

	render: function() {
		return (
            <div className="form-group">
                <div className="col-sm-4 col-sm-offset-2">
					<Input 
						type="text" 
						addonAfter="kg"
						value={this.state.weight}  												
						className="form-control" 
						onChange={this.handleWeightChange}
						onFocus={this.handleFocus}/>
                </div>
                <div className="col-sm-4">
					<Input 
						type="text"  
						addonAfter="%"
						value={this.state.fat}  												
						className="form-control"					 
						onChange={this.handleFatChange}
						onFocus={this.handleFocus}/>
                </div>
            </div>
		);
	}
})