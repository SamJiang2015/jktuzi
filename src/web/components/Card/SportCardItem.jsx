// 
// SportCardItem.jsx
//
// Reprsent a single exercise item
//		type: Jogging/Biking/Elliptical/7Minute/Other
//		description: 跑步/自行车/椭圆机/7 分钟/'用户输入'
//		duration: in minutes
//		distance: in 公里
// 

var React = require('react');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');

module.exports = React.createClass({

	getInitialState: function(){
		return {
			type: null,
			description: '',
			duration: '',
			distance: '',
			error: false,
			errorMsg: ''
		};

	},

	componentDidMount: function() {
		this.setState({
			type: this.props.type,
			description: this.props.description,
			duration: this.props.duration,
			distance: this.props.distance,
			error: false,
			errorMsg: ''
		});
	},

	componentWillReceiveProps: function(newProps) {
		this.setState({
			type: newProps.type,
			description: newProps.description,
			duration: newProps.duration,
			distance: newProps.distance,
			error: false,
			errorMsg: ''
		});
	},	

	handleTypeChange: function(e) {
		e.preventDefault();
		this.setState({
			type: e.target.value,
			error: false,
			errorMsg: ''
		});
	},

	handleDescriptionChange: function(e) {
		e.preventDefault();
		this.setState({
			description: e.target.value,
			error: false,
			errorMsg: ''
		});
	},

	handleDistanceChange: function(e) {
		e.preventDefault();
		this.setState({
			distance: e.target.value,
			error: false,
			errorMsg: ''
		});
	},

	handleDurationChange: function(e) {
		e.preventDefault();
		this.setState({
			duration: e.target.value,
			error: false,
			errorMsg: ''
		});
	},

	render: function() {
		return (
			<li className='sportCardItem'>
				<form>
					<div className="form-group">
						<Input 
							type="text" 
							label="运动方式" 
							value={this.state.type}  												
							className="form-control" 
							onChange={this.handleTypeChange}/>
					</div>

					<div className="form-group">
						<Input 
							type="text" 
							label="描述"
							maxLen="100" 
							value={this.state.description}  												
							className="form-control" 
							onChange={this.handleDurationChange}/>
					</div>

					<div className="form-group">
						<Input 
							type="number" 
							label="时间" 
							addonAfter="分钟"
							value={this.state.duration}  												
							className="form-control" 
							onChange={this.handleDurationChange}/>
					</div>
					<div className="form-group">
						<Input 
							type="number" 
							label="距离" 
							addonAfter="公里"
							value={this.state.distance}  												
							className="form-control" 
							onChange={this.handleDistanceChange}/>
					</div>
				</form>						
			</li>

			);
	}
})



