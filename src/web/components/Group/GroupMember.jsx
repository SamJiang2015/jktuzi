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

	setStateHelper: function(props) {
		this.setState({
			id: props.id,
			name: props.name,
			memberTypeId: props.memberTypeId
		});
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);
	},

	componentWillReceiveProps: function(newProps) {
		this.setStateHelper(newProps);
	},

	handleClick: function() {
		this.props.handleHide();
	},

	getMemberTypeDisplay: function() {
		switch(this.state.memberTypeId) {
			case GroupMemberType.HeadCoach.id:
				return GroupMemberType.HeadCoach.description;
			case GroupMemberType.AssistantCoach.id:
				return GroupMemberType.AssistantCoach.description;
			case GroupMemberType.Student.id:
				return GroupMemberType.Student.description;			
		}
	},

	render: function() {
		return (
			<tr 
				className='groupMember'
				onClick={this.handleClick}
			>
				<td>{this.getMemberTypeDisplay()}</td>
				<td>{this.state.name}</td>
			</tr>

		);
	}
})
