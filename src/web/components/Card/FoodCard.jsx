// 
// FoodCard.jsx
//
//		


var React = require('react');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');
var Auth = require('../../utils/auth');
var Constants = require('../../utils/constants');
var Errors = require('../Common/Errors');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			breakfast: false,
			lunch: false,
			dinner: false,

			editable: false,
			error: false,
			errorMsg: ''
		}
	},

	setStateHelper: function(props) {
		this.setState({
			breakfast: props.breakfast,
			lunch: props.lunch,
			dinner: props.dinner,
			editable: props.submitFoodCardError,  // this way the user gets a visual prompt that submit failed
			error: props.submitFoodCardError,
			errorMsg: Errors.getMsg(props.submitFoodCardErrorCode)
		});
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);
	},

	componentWillReceiveProps: function(newProps) {
		this.setStateHelper(newProps);
	},

	handleBreakfastChange: function(e) {
		if (this.state.editable) {
			this.setState({
				breakfast: e.target.checked,
			});
		}
	},

	handleLunchChange: function(e) {
		if (this.state.editable) {
			this.setState({
				lunch: e.target.checked,
			});
		}
	},

	handleDinnerChange: function(e) {
		if (this.state.editable) {
			this.setState({
				dinner: e.target.checked,
			});
		}
	},

	handleEditableChange: function(e) {
		e.preventDefault();

		// tainees cannot edit foodcard info
		if (Auth.getRole()!==Constants.RoleValue.Trainer &&
			Auth.getRole()!==Constants.RoleValue.Admin) {
			this.setState({
				error: true,
				errorMsg: '为了更好的帮助您实现减脂目标，三餐打卡由您的教练完成哦'
			})
		} else {
			if (!this.state.editable)
			this.setState({
				editable: true,
				error: false
			})
		}
	},

	handleSubmit: function(e) {
		e.preventDefault();

		var data = {
			breakfast: this.state.breakfast,
			lunch: this.state.lunch,
			dinner: this.state.dinner
		};

		this.props.submitInfo(data);

		// after submit the field should become non-editable
		this.setState({
			editable: false
		});

	},

	renderError: function() {
		if (this.state.error) {
			return (<p className="error">{this.state.errorMsg}</p>);
		} else {
			return null;
		}
	},	

	renderButton: function() {
		if (this.state.editable) {
			return (
				<div className="row">		
		            <div className="col-xs-4 col-xs-offset-4">					
						<Button 	
							onClick={this.handleSubmit} 
							bsStyle="success"
							bsSize="small"
							block>
							提交
						</Button>
					</div>
				</div>
			)			
		}
		else {
			return (
				<div className="row">		
		            <div className="col-xs-4 col-xs-offset-4">					
						<Button 
							onClick={this.handleEditableChange} 
							bsStyle="default"
							bsSize="small"
							block>
							打卡
						</Button>
					</div>
				</div>);
		}
	},

	render: function() {

		return (
			<div className="panel panel-info foodCard">
				<div className="panel-heading">
					<h5>三餐打卡</h5>
				</div>
				<div className="panel-body">
					<table>
						<tbody>
							<tr>
								<td>
						<label className="checkbox-inline">
							<input 
								type="checkbox" 
								value="breakfast"
								checked={this.state.breakfast?'checked':null}
								disabled={this.state.editable?false:"disabled"}
								onClick={this.handleBreakfastChange}
							/>
							早餐
						</label>
							</td>
							<td>
						<label className="checkbox-inline">
							<input 
								type="checkbox" 
								value="lunch"
								checked={this.state.lunch?'checked':null}
								disabled={this.state.editable?false:"disabled"}						
								onClick={this.handleLunchChange}
							/>
							午餐
						</label>
						</td>
						<td>
						<label className="checkbox-inline">
							<input 
								type="checkbox" 
								value="dinner"
								checked={this.state.dinner?'checked':null}
								disabled={this.state.editable?false:"disabled"}					
								onClick={this.handleDinnerChange}
							/>
							晚餐
						</label>
						</td>
						</tr>
						</tbody></table>	
				</div>
				{this.renderError()}						
				{this.renderButton()}
			</div>
			);
	}
})