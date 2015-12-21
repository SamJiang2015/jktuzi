//
// Requests.jsx
//

var React = require('react');
var History = require('react-router').History;
var Button = require('react-bootstrap/lib/button');

var GroupsActions = require('../../actions/groups-actions');
var Success = require('../Common/Success');

var Api = require('../../utils/api');
var Auth = require('../../utils/auth');

module.exports = React.createClass({

	mixins: [History],

	getInitialState: function() {
		return {
			trainerChecked: false,
			groupChcecked: false,
			showGroupTypes: false,

			fatLossChecked: false,
			muscleBuildingChecked: false,
			waistChecked: false,

			error: false,
			errorMsg: ''
		}
	},

	handleTrainerRequestChange: function(e) {
		if (e.target.checked) {
			this.setState({
				trainerChecked: true,
				error: false				
			});
		} else {
			this.setState({
				trainerChecked: false,
				error: false	
			});
		}
	},

	handleGroupRequestChange: function(e) {
		if (e.target.checked) {
			this.setState({
				groupChecked: true,
				showGroupTypes: true,
				error: false
			});
		} else {
			this.setState({
				groupChecked: false,
				showGroupTypes: false,
				error: false				
			});
		}
	},	

	handleFatLossInputChange: function(e) {
		if (e.target.checked) {
			this.setState({
				fatLossChecked: true,
				error: false
			});
		} else {
			this.setState({
				fatLossChecked: false,
				error: false			
			});
		}
	},	

	handleWaistInputChange: function(e) {
		if (e.target.checked) {
			this.setState({
				waistChecked: true,
				error: false
			});
		} else {
			this.setState({
				waistChecked: false,
				error: false			
			});
		}
	},		

	handleSubmit: function() {
		if (!this.state.trainerChecked && !this.state.groupChecked) {
			return this.setState({
				error: true,
				errorMsg: '请选择您的要求'
			})
		}

		if (this.state.groupChecked) {
			if (!this.state.fatLossChecked && !this.state.waistChecked) {
				return this.setState({
					error: true,
					errorMsg: '请选择您要加入的群组类别'
				})				
			}
		}

		// Todo: to hit the server and submit the request

		var requestBody = {
			fatloss: this.state.fatLossChecked,
			waist: this.state.waistChecked
		};

		GroupsActions.createDemoGroups(
			Auth.getAccountId(),
			requestBody,
			Auth.getToken(),
			function(success, status) {
				if (success)
    				this.history.replaceState(null, '/success');
    			else {
    				this.setState({
    					error: true,
    					errorMsg: '抱歉暂时无法处理您的请求，请稍候再试'
    				})
    			}
    		}.bind(this));
	},

	renderError: function() {
		return (<p className="error">{this.state.errorMsg}</p>);
	},

	renderGroupTypes: function() {

		return (
			<div>
				请选择您感兴趣的群组类别: 
				<div className="checkbox">
					<label>
						<input 
							type="checkbox" 
							value="fatloss"  
							checked={this.state.fatLossChecked?'checked':null}
							onChange={this.handleFatLossInputChange}
						/> 减脂  
					</label>
				</div>
				<div className="checkbox">
					<label>
						<input 
							type="checkbox" 
							value="waist"  
							checked={this.state.waistChecked?'checked':null}
							onChange={this.handleWaistInputChange}
						/> 瘦腰 
					</label>
				</div>
				<div className="checkbox">
					<label>
						<input className="disabled"
							type="checkbox" 
							value="muscleBuilding"  
							disabled="true"
							/> 增肌 (即将推出) 
					</label>
				</div>				
			</div>
			);
	},

	renderRequestForm: function() {

		return (
			<form>
				<div className="checkbox">
					<label>
						<input 
							type="checkbox" 
							value="trainer"  
							checked={this.state.trainerChecked?'checked':null}
							onChange={this.handleTrainerRequestChange}
							/> 我要成为教练 
					</label>
				</div>

				<div className="checkbox">
					<label>
						<input 
							type="checkbox" 
							value="group"  
							checked={this.state.groupChecked?'checked':null}
							onChange={this.handleGroupRequestChange}
							/> 我要入群 
					</label>
				</div>

				<hr/>
				{this.state.showGroupTypes?  this.renderGroupTypes() : <span/>}

				{this.state.error? this.renderError() : <span/>}
				<div className="form-group">		
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
			</form>
		)

	},

	render: function() {
		return (
			<div className="requests">
				<div className="panel panel-default">
					<div className="panel-heading">	
						<h5>请告诉我们您的要求</h5>
					</div>
					<div className="panel-body">
						{this.renderRequestForm()}
					</div>

				</div>			
			</div>
		);
	}

})