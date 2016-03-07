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
		var weight=parseFloat(props.weight);
		var fat=parseFloat(props.fat);

		if (!isNaN(weight) && weight !== EMPTY) {
			weight = weight.toFixed(1);
		} else {
			weight=null;
		}

		if (!isNaN(fat) && fat !== EMPTY) {
			fat = fat.toFixed(1);
		} else {
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
		 	newNumber = parseFloat(newValue);
		 } else {
		 	newNumber = EMPTY;
		 }

	 	if (!isNaN(newNumber)) {
			// call handler from parent component to pass up the new status
			// 四舍五入保留小数点后一位
		 	this.props.handleBodyCardStatusChange(newNumber.toFixed(1), this.state.fat?this.state.fat:EMPTY);
		}

		this.setState({
			weight: newValue
		});			 	
	 },

	 handleFatChange: function(e) {
	 	e.preventDefault();

	 	var newValue = e.target.value;

	 	var newNumber;
	 	if (newValue.trim()!=='') {
		 	newNumber = parseFloat(newValue);
		} else {
		 	newNumber = EMPTY;
		}

	 	if (!isNaN(newNumber)) {
			// call handler from parent component to pass up the new value
			// 四舍五入保留小数点后一位
		 	this.props.handleBodyCardStatusChange(this.state.weight?this.state.weight:EMPTY, newNumber.toFixed(1));
		}

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
						type="number" 
						addonAfter="kg"
						min="30"
						max="350"
						value={this.state.weight}  												
						className="form-control" 
						onChange={this.handleWeightChange}
						onFocus={this.handleFocus}/>
                </div>
                <div className="col-sm-4">
					<Input 
						type="number"  
						addonAfter="%"
						min="5"
						max="50"
						value={this.state.fat}  												
						className="form-control"					 
						onChange={this.handleFatChange}
						onFocus={this.handleFocus}/>
                </div>
            </div>
		);
	}
})