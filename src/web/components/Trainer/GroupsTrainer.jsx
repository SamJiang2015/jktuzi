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

	// on rerendering: just get the cached groups from the store
	// this way if user click on other tabs and click back, the same
	// set of groups will still show here.
	componentDidMount: function() {
		this.setState({
			groups: GroupsStore.getCachedGroups()
		});
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
				<div className="panel panel-primary">
					<div className="panel-heading">	
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