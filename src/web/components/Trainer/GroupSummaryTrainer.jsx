//
// GroupSummaryTrainer.jsx : a single row in the groups table.
//

var React = require('react');
var History = require('react-router').History;

var GroupType = require('../../utils/constants').GroupType;

module.exports = React.createClass({

	mixins: [History],

	getInitialState: function(){
		return {
			id: null,
			name: '',
			startdate: '',
			enddate:'',
			groupTypeId: null
		};
	},

	setStateHelper: function(props) {
		this.setState({
			id: props.id,
			name: props.name,
			startdate: props.startdate,
			enddate: props.enddate,
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

	    //this.props.handleShowGroupDetail(id);

	    this.history.pushState(null, '/trainer/groups/'+id)
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
				<td>{this.state.enddate}</td>		
			</tr>
		);
	}
})
