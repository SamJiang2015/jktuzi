// 
// GroupCreateMenuAdmin.jsx
//

var React = require('react');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');
var DynamicSelect = require('../Common/DynamicSelect');
var GroupType = require('../../utils/constants').GroupType;

module.exports = React.createClass({

	getInitialState: function() {
		return {
			name: null,
			groupTypeId: 1,
			startDate: null,
			endDate: null,

			error: false,
			errorMsg: ''
		}
	},

	handleNameChange: function(e) {
		e.preventDefault();
		
		this.setState({
			name: e.target.value,
		});
	},

	handleTypeChange: function(val) {
		this.setState({
			groupTypeId: val,
		});
	},

	handleStartDateChange: function(e) {
		e.preventDefault();
		
		this.setState({
			startDate: e.target.value,
		});
	},

	handleEndDateChange: function(e) {
		e.preventDefault();
		
		this.setState({
			endDate: e.target.value,
		});
	},

	handleSubmit: function() {

		// todo: data validation here

		this.props.handleSubmit(
			this.state.name,
			this.state.groupTypeId,
			this.state.startDate,
			this.state.endDate);
	},

	renderError: function() {
		if (this.state.error) {
			return (<p className="error">{this.state.errorMsg}</p>);
		} else {
			return null;
		}
	},	

	renderButton: function() {
		return (
			<div className="row">		
	            <div className="col-xs-3 col-xs-offset-3">					
					<Button 	
						onClick={this.handleCancel} 
						bsStyle="warning"
						bsSize="small"
						block>
						取消
					</Button>
				</div>				
	            <div className="col-xs-3">					
					<Button 	
						onClick={this.handleSubmit} 
						bsStyle="success"
						bsSize="small"
						block>
						提交
					</Button>
				</div>
			</div>
		);			
	},

	render: function() {

		return (
				<form>
					<div className="form-group">
						<Input 
							type="text" 
							label="名称"
							maxLen="100" 
							value={this.state.name}  												
							className="form-control" 
							onChange={this.handleNameChange}/>
					</div>

					<div className="form-group">
						<DynamicSelect 
							selectItems={GroupType.items}
							label="班级类别" 
							value={this.state.groupTypeId}  												
							className="form-control" 
							handleChange={this.handleTypeChange}/>
					</div>

					<div className="form-group">
						<Input 
							type="date" 
							label="开始日期" 
							value={this.state.startDate}  												
							className="form-control" 
							onChange={this.handleStartDateChange}/>
					</div>

					<div className="form-group">
						<Input 
							type="date" 
							label="结束日期" 
							value={this.state.endDate}  												
							className="form-control" 
							onChange={this.handleEndDateChange}/>
					</div>

					{this.renderError()}
					{this.renderButton()}
				</form>	
		);
	}


})