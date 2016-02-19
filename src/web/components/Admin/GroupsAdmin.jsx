// 
// GroupsAdmin.jsx
//

var React = require('react');
var Reflux = require('reflux');
var Loader = require('react-loader');

// Bootstrap UI components
var ButtonToolbar = require('react-bootstrap/lib/buttontoolbar');
var DropdownButton = require('react-bootstrap/lib/dropdownbutton');
var Dropdown = require('react-bootstrap/lib/dropdown');
var MenuItem = require('react-bootstrap/lib/menuitem');
var Button = require('react-bootstrap/lib/button');
var Input = require('react-bootstrap/lib/input');

// UI components
var GroupCreateMenu = require('./GroupCreateMenuAdmin');
var GroupFindMenu = require('./GroupFindMenuAdmin');
var GroupList = require('./GroupListAdmin');
var GroupDetail = require('./GroupDetailAdmin');

var Error = require('../common/Errors');

// data layer
var Auth = require('../../utils/auth');
var GroupsActions = require('./groups-actions-admin');
var GroupsStore = require('./groups-store-admin');

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
			selectedGroup: null,  // this is the group that the admin is editing

			showCreate: false,
			showFind: false,
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

	createGroup: function(name, groupTypeId, startDate, endDate) {

		var groupInfo = {
			name: name,
			groupTypeId: groupTypeId,
			startdate: startDate,
			enddate: endDate};

		// show the spinner
		this.setState({
			loaded: false
		})

		GroupsStore.createGroup(
			Auth.getToken(),
			groupInfo,
			function(success, status) {
				this.setState({
					loaded: true,
					showCreate: false,
					showFind: false,
					showList: true,
					showGroupDetail: false,
					error: !success,
					errorMsg: Error.getMsg(status)
				});
			}.bind(this));
	},


	findGroup: function() {
		// todo: call store function to find the group
		return null;
	},

	handleClick_Create: function(e) {

		e.preventDefault();

		this.setState({
			groups: this.state.groups,
			showCreate: true,
			showFind: false,
			showList: false,
			showGroupDetail: false,
			loaded: true,
			error: false,
			errorMsg: ''

		});
	},

	handleClick_Find: function() {

		this.setState({
			groups: this.state.groups,
			showCreate: false,
			showFind: true,
			showList: false,
			showGroupDetail: false,
			error: false,
			errorMsg: ''
		})
	},

	// when user clicked on the 列表
	handleSelect_List: function(eventKey, href, target) {

		var dateFilter;

		switch (eventKey) {
			case '1':  
				// all newly created groups that have not started
				// i.e., groups with a start date in the future
				dateFilter.start = new Date();
				dateFilter.end = null;
				break;
			case '2': 
				// all ongoing groups, i.e. groups with an end date in the future			
				dateFilter.start = null;
				dateFilter.end = new Date();
				break;
			case '3': 
				dateFilter = null;
				break;
		}

		// show the spinner
		this.setState({
			loaded: false
		})

		// now hit the store to retrieve the groups based on the filter
		GroupsStore.getGroups(
			Auth.getToken(),
			dateFilter,		
			function(success, status) {
				this.setState({
					loaded: true,
					groups: this.state.groups,					
					showCreate: false,
					showFind: false,
					showList: true,
					showGroupDetail: false,
					error: !success,
					errorMsg: Error.getMsg(status)
				});
			}.bind(this));
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
				showCreate: false,
				showFind: false,
				showList: false,			
				showGroupDetail: true,
				selectedGroup: selectedGroup
			});
		} else {
			//todo: call store to retrieve the detail info about this group

			// now hit the store to retrieve the groups based on the filter
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

	renderButtons: function() {

		return (
			<ButtonToolbar justified>
				<Button 
					href="#"
					className={this.state.showCreate?'active':null}
					onClick={this.handleClick_Create}
				> 新建
				</Button>
				<Button 
					href="#"
					className={this.state.showFind?'active':null}					
					onClick={this.handleClick_Find}
				> 查找
				</Button>
				<Dropdown id="getGroups">
					<Button
						className={this.state.showList?'active':null}
						>班级列表</Button>
					<Dropdown.Toggle bsStyle="default"/>
					<Dropdown.Menu>
						<MenuItem eventKey="1" onSelect={this.handleSelect_List}>尚未开始的班级</MenuItem>
						<MenuItem eventKey="2" onSelect={this.handleSelect_List}>正在进行中的班级</MenuItem>
						<MenuItem eventKey="3" onSelect={this.handleSelect_List}>全部班级</MenuItem>
					</Dropdown.Menu>
				</Dropdown>				
			</ButtonToolbar>
			);

	},	

	// based on which button the user clicked, render the proper content
	renderMainArea: function() {
		if (this.state.showCreate) {
			return (
				<GroupCreateMenu 
					handleSubmit={this.createGroup} />);
		} else if (this.state.showFind) {
			return (
				<GroupFindMenu
					handleFind={this.findGroup} />);
		} else if (this.state.showList) {
			return (
				<GroupList
					groups={this.state.groups} 
					handleShowGroupDetail={this.handleShowGroupDetail}/>);
		} else if (this.state.showGroupDetail) {
			return (
				<GroupDetail
					group={this.state.selectedGroup}
					 />);
		} else {
			return null;
		}
 	},

	render: function() {
		return (
			<div className="groups admin-groups">
				<div className="panel panel-primary">
					<div className="panel-heading">	
						<h5>班级管理</h5>
					</div>
					<div className="panel-body">
						<div className="well">
							{this.renderButtons()}
						</div>
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