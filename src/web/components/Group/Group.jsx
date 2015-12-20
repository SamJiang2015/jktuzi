//
// Group.jsx : a single row in the groups table. when clicked, will bring up a table
// 				showing all members of the group
// 		
// 		- id
//		- name
//		- nickname
// 		- startdate
//		- enddate
//		- members

var React = require('react');

module.exports = React.createClass({

	getInitialState: function(){
		return {
			id: null,
			name: '',
			nickname: '',
			startdate: '',
			enddate: ''
		};
	},

	setStateHelper: function(props) {
		this.setState({
			id: props.id,
			name: props.name,
			nickname: props.duration,
			startdate: props.startdate,
			enddate: props.enddate,
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

	render: function() {

		return (
			<tr className='group'
		        onClick={this.handleClick.bind(this, this.state.id)}>
				<td>{this.state.name}</td>
				<td>{this.state.nickname}</td>
				<td>{this.state.startdate}</td>
				<td>{this.state.enddate}</td>				
			</tr>
		);
	}
}
