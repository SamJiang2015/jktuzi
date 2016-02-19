//
// MealCardButtons.jsx
// 

var React = require('react');
var MealCardStatus = require('../../utils/constants').MealCardStatus;

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

	handleChange: function(e) {
		if (e.target.value==='pass' && e.target.checked) {
			this.setState({
				status: MealCardStatus.Pass
			});
		} else if (e.target.value==='fail' && e.target.checked) {
			this.setState({
				status: MealCardStatus.Fail
			});
		} else if (e.target.value==='miss' && e.target.checked) {
			this.setState({
				status: MealCardStatus.Miss
			});
		} else if (e.target.value==='openday' && e.target.checked) {
			this.setState({
				status: MealCardStatus.OpenDay
			});
		} else {
			this.setState({
				status: null
			})
		}
	},

	render: function() {
		return (
			<div className="form-group">
				<label className="radio-inline">
					<input 
						type="radio" 
						value="pass"  
						checked={this.state.status===MealCardStatus.Pass?'checked':null}
						onChange={this.handleChange}/>
						合格
				</label>
				<label className="radio-inline">								
					<input 
						type="radio" 
						value="fail" 
						checked={this.state.status===MealCardStatus.Fail?'checked':null}
						onChange={this.handleChange} />
						不合格
				</label>
				<label className="radio-inline">
					<input 
						type="radio" 
						value="miss"  
						checked={this.state.status===MealCardStatus.Miss?'checked':null}
						onChange={this.handleChange}/>
						未打卡
				</label>
				<label className="radio-inline">								
					<input 
						type="radio" 
						value="openday" 
						checked={this.state.status===MealCardStatus.OpenDay?'checked':null}
						onChange={this.handleChange} />
						开放日
				</label>				
			</div>
		);
	}
})