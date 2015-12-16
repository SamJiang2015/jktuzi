// 
// HealthCard.jsx
// 

var React = require('react');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			weight: '',
			bodyfat: '',
			error: false,
			errorMsg: ''
		}
	},

	componentDidMount: function() {
		this.setState({
			weight: this.props.weight,
			bodyfat: this.props.bodyfat,
			error: false,
			errorMsg: ''
		})
	},

	handleWeightChange: function(e) {
		e.preventDefault();
		this.setState({
			weight: e.target.value,
			error: false,
			errorMsg: ''
		});
	},


	handleBodyfatChange: function(e) {
		e.preventDefault();
		this.setState({
			bodyfat: e.target.value,
			error: false,
			errorMsg: ''
		});
	},	

	handleSubmit: function(e) {
		e.preventDefault();

		//todo: call action to update data through store
		this.props.submitInfo();
	},

	render: function() {
		return (
			<div className="panel panel-info healthCard">
				<div className="panel-heading">
					<h5>健康情况打卡</h5>
				</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
							<Input 
								type="number" 
								label="体重" 
								addonAfter="斤"
								min="50"
								max="350"
								value={this.state.weight}  												
								className="form-control" 
								onChange={this.handleWeightChange}/>
						</div>

						<div className="form-group">
							<Input 
								type="number" 
								label="体脂率(百分比)" 
								addonAfter="%"
								min="5"
								max="50"
								value={this.state.bodyfat}  												
								className="form-control" 
								onChange={this.handleBodyfatChange}/>
						</div>

						<div className="form-group">		
								<Button 
									onClick={this.handleSubmit} 
									bsStyle="info"
									bsSize="small"
									block>
									提交
								</Button>
						</div>
					</form>
				</div>
			</div>			
			);
	}
})