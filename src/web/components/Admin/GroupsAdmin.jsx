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

// data layer
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

			showCreate: false,
			showFind: false,
			showList: true,

			loaded: true,

			error: false,
			errorMsg: ''
		};
	},

	createGroup: function() {

		// todo: call store function to create the group
		return null;
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
			error: false,
			errorMsg: ''
		})
	},

	handleSelect_List: function(eventKey, href, target) {
		switch (eventKey) {
			case '1': 
				// todo: call store function to retrieve all new classes
				// upon successful callback:
				this.setState({
					groups: this.state.groups,
					showCreate: false,
					showFind: false,
					showList: true,
					error: false,
					errorMsg: ''
				});
				break;
			case '2': 
				// todo: call store function to retrieve all ongoing classes
				// upon successful callback:
				this.setState({
					groups: this.state.groups,
					showCreate: false,
					showFind: false,
					showList: true,
					error: false,
					errorMsg: ''
				});
				break;
			case '3': 
				// todo: call store function to retrieve all classes
				// upon successful callback:
				this.setState({
					groups: this.state.groups,
					showCreate: false,
					showFind: false,
					showList: true,
					error: false,
					errorMsg: ''
				});
				break;						
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
					handleCreate={this.creatGroup} />);
		} else if (this.state.showFind) {
			return (
				<GroupFindMenu
					handleFind={this.findGroup} />);
		} else if (this.state.showList) {
			return (
				<GroupList
					groups={this.state.groups} />);
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