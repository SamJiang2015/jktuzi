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

	handleShowGroupDetail(groupId) {
		// first see if the group detail is already cached here/
		// no need to call store since everytime store is changed,
		// this.state.groups will change accordingly

	    // search the cache first
	    var selectedGroup;

	    for (var i=0; i<this.state.groups.length; i++) {
	      if (this.state.groups[i].id === groupId && this.state.groups[i].members) {
	        selectedGroup = this.state.groups[i];
	        break;
	      }
	    }

	    if (selectedGroup) {
			this.setState({
				showList: false,			
				showGroupDetail: true,
				selectedGroup: selectedGroup
			});
		} else {
			//todo: call store to retrieve the detail info about this group			
			GroupsStore.getGroups(
				Auth.getToken(),
				groupId,		
				function(success, status) {
					this.setState({
						loaded: true,
						groups: this.state.groups,			
						showCreate: false,
						showFind: false,
						showList: false,			
						showGroupDetail: true,
						error: !success,
						errorMsg: Error.getMsg(status)
					});
				}.bind(this));
		}
	},

	renderMainArea: function() {
		if (this.state.groups.length > 0) {
			return (
				<GroupList
					groups={this.state.groups} 
					handleShowGroupDetail={this.handleShowGroupDetail}/>);
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