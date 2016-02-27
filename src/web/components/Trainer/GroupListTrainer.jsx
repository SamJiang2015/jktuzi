//
// GroupListTrainer.jsx
//

var React = require('react');
var GroupSummary = require('./GroupSummaryTrainer');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			groups: []
		};
	},

	componentDidMount: function() {
		this.setState({
			groups: this.props.groups
		})
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			groups: nextProps.groups
		})
	},

	renderGroup: function() {
		return this.state.groups.map(function(group) {
			return (<GroupSummary 
						key={group.id}
						id={group.id}
						name={group.name}
						enddate={group.enddate}
						groupTypeId={group.groupTypeId}
					/>
			);
		}.bind(this))
	},

	render: function() {

		return (
			<div>
				<p>点击任一班级进行操作</p> 
				<table className="table table-condensed table-hover table-striped">
					<thead>
						<tr>
							<th>名字</th><th>结束日</th>
						</tr>
					</thead>
					<tbody>
						{this.renderGroup()}					
					</tbody>
				</table>
			</div>
		);			
	}

})