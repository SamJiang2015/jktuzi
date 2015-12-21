// 
// GroupDetails.jsx
// 

var React = require('react');

var GroupMember = require('./GroupMember');

module.exports = React.createClass({

	getInitialState: function(){
		return {
			members: []
		};
	},

	setStateHelper: function(props) {
		this.setState({
			members: props.members
		});
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);	
	},

	componentWillReceiveProps: function(newProps) {		
		this.setStateHelper(newProps);
	},	

	renderMember: function() {
		return this.state.members.map(function(member) {
			return (<GroupMember 
						key={member.id}
						id={member.id}
						name={member.name}
						memberTypeId={member.groupMember.memberTypeId}
						handleHide={this.props.handleHide}
					/>
			);
		}.bind(this))
	},

	render: function() {

		return (
			<div className="well groupMembers">
				<table className="table table-condensed table-striped table-hover">
					<thead>
						<tr>
							<th>身份</th><th>姓名</th>
						</tr>
					</thead>
					<tbody>
						{this.renderMember()}					
					</tbody>
				</table>
			</div>	
			);

	}
})
