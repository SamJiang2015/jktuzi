//
// SportCard.jsx
//

// 
// HealthCard.jsx
// 

var React = require('react');
var SportCardItem = require('./SportCardItem');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');


module.exports = React.createClass({

	getInitialState: function() {
		return {
			items: []
		}
	},

	componentDidMount: function() {
		this.setState({
			items: this.props.items
		})
	},

	componentWillReceiveProps: function(newProps) {
		this.setState({
			items: newProps.items
		})
	},

	handleSubmit: function(e) {
		e.preventDefault();

		//todo: call action to update data through store
		this.props.submitInfo()
	},

	renderItems: function() {
		return this.state.items.map(function(item) {
			return (<SportCardItem 
						key={item.id}
						type={item.type}
						description={item.description}
						duration={item.duration}
						distance={item.distance}
					/>
			);
		})
	},

	render: function() {
		return (
			<div className="panel panel-success sportCard">
				<div className="panel-heading">
					<h5>运动打卡</h5>
				</div>
				<div className="panel-body">
					<ul>
						{this.renderItems()}
					</ul>

					<div className="form-group">						
							<Button 
								onClick={this.handleSubmit} 
								bsStyle="success"
								bsSize="small"
								block>
								提交
							</Button>
					</div>
				</div>
			</div>			
			);
	}
})