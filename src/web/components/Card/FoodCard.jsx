// 
// FoodCard.jsx
//
//		


var React = require('react');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			breakfast: false,
			lunch: false,
			dinner: false,
		}
	},

	componentDidMount: function() {
		this.setState({
			breakfast: this.props.breakfast,
			lunch: this.props.lunch,
			dinner: this.props.dinner
		})
	},

	handleChange: function(e) {
		e.preventDefault();
		var breakfast=this.state.breakfast;
		var lunch=this.state.lunch;
		var dinner=this.state.dinner;

		switch (e.target.value) {
			case 'breakfast':
				breakfast = e.target.checked;
				break;
			case 'lunch':
				lunch = e.target.checked;
				break;
			case 'dinner':
				dinner = e.target.checked;
				break;
		}

		this.setState({
			breakfast: breakfast,
			lunch: lunch,
			dinner: dinner
		});
	},

	handleSubmit: function(e) {
		e.preventDefault();

		//todo: call action to update data through store
		this.props.submitInfo();
	},

	render: function() {
		return (
			<div className="panel panel-default healthCard">
				<div className="panel-heading">
					<h5>三餐打卡</h5>
				</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
							<Input 
								type="checkbox" 
								label="早餐" 
								checked={this.state.breakfast?'checked':null}
								className="form-control" 
								onChange={this.handleChange}/>
						</div>
						<div className="form-group">
							<Input 
								type="checkbox" 
								label="午餐" 
								checked={this.state.lunch?'checked':null}
								className="form-control" 
								onChange={this.handleChange}/>
						</div>
						<div className="form-group">
							<Input 
								type="checkbox" 
								label="晚餐" 
								checked={this.state.dinner?'checked':null}
								className="form-control" 
								onChange={this.handleChange}/>
						</div>
						<div className="form-group">							
								<Button 
									onClick={this.handleSubmit} 
									bsStyle="default"
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