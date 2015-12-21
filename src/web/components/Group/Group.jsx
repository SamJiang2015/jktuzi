//
// Group.jsx : a single row in the groups table. when clicked, will bring up a table
// 				showing all members of the group
// 		
// 		- id
//		- name
//		- nickname
// 		- startdate
//		- groupTypeId
//		- members

var React = require('react');
var GroupType = require('../../utils/constants').GroupType;

module.exports = React.createClass({

	getInitialState: function(){
		return {
			id: null,
			name: '',
			nickname: '',
			startdate: '',
			groupTypeId: null
		};
	},

	setStateHelper: function(props) {
		this.setState({
			id: props.id,
			name: props.name,
			nickname: props.nickname,
			startdate: props.startdate,
			groupTypeId: props.groupTypeId,
		});
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);	
	},

	componentWillReceiveProps: function(newProps) {
		this.setStateHelper(newProps);
	},	

	handleClick: function(id, e) {
	    e.preventDefault();
	    this.props.toggleShowGroupMembers(id);
	},

	getGroupTypeDisplay: function(groupTypeId) {
		switch(groupTypeId) {
			case GroupType.FatLoss.id:
				return GroupType.FatLoss.description;
			case GroupType.MuscleBuilding.id:
				return GroupType.MuscleBuilding.description;
			case GroupType.Waist.id:
				return GroupType.Waist.description;
			case GroupType.Chat.id:
				return GroupType.Chat.description;				
		}
	},

	render: function() {

		return (
			<tr className='group'
		        onClick={this.handleClick.bind(this, this.state.id)}>
				<td>{this.state.name}</td>
				<td>{this.state.nickname}</td>
				<td>{this.state.startdate}</td>
				<td>{this.getGroupTypeDisplay(this.state.groupTypeId)}</td>				
			</tr>
		);
	}
})
