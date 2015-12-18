// 
// HealthCard.jsx
// 

var React = require('react');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');

var Limits = require('../../utils/constants').Limits;
var Errors = require('../Common/Errors');


module.exports = React.createClass({

	getInitialState: function() {
		return {
			weight: '',
			bodyfat: '',

			editable: false,
			error: false,
			errorMsg: ''
		}
	},

	setStateHelper: function(props) {
		this.setState({
			weight: props.weight,
			bodyfat: props.bodyfat,

			// this way the user gets a visual prompt that submit failed
			editable: props.submitError ? props.submitError : false,  
			error: props.submitError ? props.submitError : false,  
			errorMsg: Errors.getMsg(props.submitErrorCode)
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
		if (this.state.editable) {
			this.setState({
				weight: e.target.value,
				error: false,
				errorMsg: ''
			});
		}
	},


	handleBodyfatChange: function(e) {
		e.preventDefault();

		if (this.state.editable) {
			this.setState({
				bodyfat: e.target.value,
				error: false,
				errorMsg: ''
			});
		}
	},	


	handleEditableChange: function(e) {
		e.preventDefault();
		if (!this.state.editable)
			this.setState({
				editable: true,
				error: false
		})
	},

	handleSubmit: function(e) {
		e.preventDefault();

		var data = {
			weight: this.state.weight,
			bodyfat: this.state.bodyfat
		};		

		var errorMsg='';
		//input validation happens here
		if (isNaN(data.weight) || Number(data.weight)<Limits.Weight.min || Number(data.weight)>Limits.Weight.max) {
			errorMsg='请核验您输入的体重（以斤为单位）';
		} else if ((data.bodyfat !== '') &&
			(isNaN(data.bodyfat) || Number(data.bodyfat)<Limits.Bodyfat.min || Number(data.bodyfat)>Limits.Bodyfat.max)) {
			errorMsg='请核验您输入的体脂率（百分比）';
		}

		if (errorMsg!=='') {
			this.setState({
				error: true,
				errorMsg: errorMsg
			});
		} else {		
			//todo: call action to update data through store
			this.props.submitInfo(data);

			// after submit the field should become non-editable
			this.setState({
				editable: false
			});
		}
	},

	renderError: function() {
		if (this.state.error) {
			return (<p className="error">{this.state.errorMsg}</p>);
		} else {
			return null;
		}
	},	

	renderContent: function() {
		if (this.state.editable) {
			return this.renderEditableContent();
		} else {
			return this.renderStaticContent();
		}
	},

	renderEditableContent: function(){

		return (
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
						disabled={this.state.editable?false:"disabled"}								
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
						disabled={this.state.editable?false:"disabled"}
						className="form-control" 
						onChange={this.handleBodyfatChange}/>
				</div>

				{this.renderError()}	
				
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
			</div>
			);
	},

	renderStaticContent: function(){

		return (
			<div className="panel-body">
				<table>
					<tbody>
						<tr>
							<td>
								体重:  
								{(this.state.weight&&this.state.weight!=='') ? ('  '+ this.state.weight+'斤') : '  无信息'}
							</td>
							<td>
								体脂率: 
								{(this.state.bodyfat&&this.state.weight!=='') ? ('  ' +this.state.bodyfat+'%') : '  无信息'}
							</td>
						</tr>
					</tbody>
				</table>	
				
				{this.renderError()}	
				
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
				</div>
			</div>
			);
	},	

	render: function() {
		return (
			<div className="panel panel-info healthCard">
				<div className="panel-heading">
					<h5>健康情况打卡</h5>
				</div>
				{this.renderContent()}
			</div>			
			);
	}
})