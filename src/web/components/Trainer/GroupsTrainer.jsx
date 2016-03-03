// 
// GroupsTrainer.jsx
//

var React = require('react');
var Reflux = require('reflux');
var Loader = require('react-loader');

// Bootstrap UI components
var Button = require('react-bootstrap/lib/button');
var Input = require('react-bootstrap/lib/input');

// UI components
var GroupList = require('./GroupListTrainer');
//var GroupDetail = require('./GroupDetailTrainer');

var Error = require('../common/Errors');

// data layer
var Auth = require('../../utils/auth');
var GroupsActions = require('./groups-actions-trainer');
var GroupsStore = require('./groups-store-trainer');

module.exports = React.createClass({

	// listening to account store for changes to the trainee info of this account
	mixins: [
    	Reflux.listenTo(GroupsStore, 'onGroupsChange')
  	],

	onGroupsChange: function(event, groups) {
  		this.setState({
  			groups: groups
  		});
  	},

	getInitialState: function() {
		return {
			groups: [],
			selectedGroup: null,  // this is the group that the trainer is editing

			showList: true,
			showGroupDetail: false,

			loaded: true,
			error: false,
			errorMsg: ''
		};
	},

	componentDidMount: function() {
		// trigger fetching of the detailed info for the selected group
		// the change will be propgated from the store to this component
		// through the change listening mechanism
		GroupsActions.getGroups(Auth.getCoachId(), Auth.getToken()); 
	},

	renderMainArea: function() {
		if (this.state.groups.length > 0) {
			return (
				<GroupList
					groups={this.state.groups} 
				/>);
		} else {
			return <p>您没有正在管理的班级</p>;
		}
 	},

	render: function() {
		return (
			<div className="groups trainer-groups">
				<div className="panel panel-info">
					<div className="panel-heading panel-warning">	
						<h5>我管理的班级</h5>
					</div>
					<div className="panel-body">
						<div className="well">
							<Loader loaded={this.state.loaded}>
								{this.renderMainArea()}
							</Loader>
						</div>
					</div>
				</div>			
			</div>
		);
	}
})