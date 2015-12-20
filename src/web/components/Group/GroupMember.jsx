// 
// GroupMember.jsx
// 
//		-- id (accountId)
//		-- name
//		-- memberTypeId
// 

var React = require('react');
var GroupMemberType = require('../../utils/constants').GroupMemberType;

module.exports = React.createClass({

	getInitialState: function() {
		return {
			id: null,
			name: '',
			memberTypeId: null
		};
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);
	},

	componentWillReceiveProps: function(newProps) {
		this.setStateHelper(newProps);
	},

	getMemberTypeDisplay: function() {
		switch(this.memberTypeId) {
			case GroupMemberType.HeadCoach.id:
				return GroupMemberType.HeadCoach.description;
			case GroupMemberType.AssistantCoach.id:
				return GroupMemberType.AssistantCoach.description;
			case GroupMemberType.Student.id:
				return GroupMemberType.HeadCoach.description;			
		}
	},

	render: function() {
		return (
			<tr className='groupMember'>
				<td>{this.getMemberTypeDisplay()}</td>
				<td>{this.state.name}</td>
			</tr>

		);
	}
})
