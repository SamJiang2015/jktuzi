//
// MealCardButtons.jsx
// 

var React = require('react');

var Glyphicon = require('react-bootstrap/lib/glyphicon');
var OverlayTrigger = require('react-bootstrap/lib/overlaytrigger');
var Tooltip = require('react-bootstrap/lib/tooltip');


var MealCardStatus = require('../../utils/constants').MealCardStatus;
var EMPTY = require('../../utils/constants').EMPTY;

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

	// when user clicks on one of the meal status button
	handleChange: function(e) {
		var newStatus; 

		// determine which button has been clicked 
		if (e.target.value==='pass' && this.state.status!==MealCardStatus.Pass) {
				newStatus = MealCardStatus.Pass;
		} else if (e.target.value==='fail' && this.state.status!==MealCardStatus.Fail) {
				newStatus = MealCardStatus.Fail;
		} else if (e.target.value==='miss' && this.state.status!==MealCardStatus.Miss) {
				newStatus = MealCardStatus.Miss;
		} else if (e.target.value==='openday' && this.state.status!==MealCardStatus.OpenDay) {
				newStatus = MealCardStatus.OpenDay;
		} else {
			newStatus = null;
		}

		// call handler from parent component to pass up the new status
		this.props.handleMealCardStatusChange(newStatus!==null?newStatus:EMPTY);

		// render UI to show the new status
		this.setState({
			status: newStatus
		});

	},

	handleMouseOverPass: function(e) {
		e.preventDefault();
		alert('合格');
	},

	render: function() {

		return (
			<div className={"form-group"}>
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

	// render: function() {
	// 	var tooltipPass = (
 //  			<Tooltip id='ttp'>合格</Tooltip>
	// 	);
	// 	var tooltipFail = (
 //  			<Tooltip id='ttf'>不合格</Tooltip>
	// 	);
	// 	var tooltipMiss = (
 //  			<Tooltip id='ttm'>未打卡</Tooltip>
	// 	);
	// 	var tooltipOpenDay = (
 //  			<Tooltip id='ttod'>开放日</Tooltip>
	// 	);					

	// 	return (
	// 		<div className={"form-group"}>
	// 			<label className="radio-inline">
	// 				<input 
	// 					type="radio" 
	// 					value="pass"  
	// 					checked={this.state.status===MealCardStatus.Pass?'checked':null}					
	// 					onChange={this.handleChange}/>
 //    					<OverlayTrigger placement="top" overlay={tooltipPass}>
	// 						<Glyphicon glyph="ok-circle"/>
	// 					</OverlayTrigger>
	// 			</label>
	// 			<label className="radio-inline">								
	// 				<input 
	// 					type="radio" 
	// 					value="fail" 
	// 					checked={this.state.status===MealCardStatus.Fail?'checked':null}				
	// 					onChange={this.handleChange} />
	// 					<OverlayTrigger placement="top" overlay={tooltipFail}>
	// 						<Glyphicon glyph="remove-circle"/>
	// 					</OverlayTrigger>
	// 			</label>
	// 			<label className="radio-inline">
	// 				<input 
	// 					type="radio" 
	// 					value="miss"  
	// 					checked={this.state.status===MealCardStatus.Miss?'checked':null}
	// 					onChange={this.handleChange}/>
 //    					<OverlayTrigger placement="top" overlay={tooltipMiss}>						
	// 						<Glyphicon glyph="ban-circle"/>
	// 					</OverlayTrigger>
	// 			</label>				
	// 			<label className="radio-inline">								
	// 				<input 
	// 					type="radio" 
	// 					value="openday" 
	// 					checked={this.state.status===MealCardStatus.OpenDay?'checked':null}				
	// 					onChange={this.handleChange} />
 //    					<OverlayTrigger placement="top" overlay={tooltipOpenDay}>
	// 						<Glyphicon glyph="cutlery"/>
	// 					</OverlayTrigger>
	// 			</label>				
	//  		</div>
	// 	);
	// }
})