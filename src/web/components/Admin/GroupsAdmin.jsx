// 
// GroupsAdmin.jsx
//

var React = require('react');

var ButtonToolbar = require('react-bootstrap/lib/buttontoolbar');
var DropdownButton = require('react-bootstrap/lib/dropdownbutton');
var Dropdown = require('react-bootstrap/lib/dropdown');
var MenuItem = require('react-bootstrap/lib/menuitem');
var Button = require('react-bootstrap/lib/button');
var Input = require('react-bootstrap/lib/input');

var GroupAddMenu = require('./GroupAddMenuAdmin');
var GroupFindMenu = require('./GroupFindMenuAdmin');
var GroupList = require('./GroupListAdmin');


module.exports = React.createClass({

	getInitialState: function() {
		return {
			groups: [],

			showAdd: false,
			showFind: false,
			showList: true,
			error: false,
			errorMsg: ''
		};
	},

	handleCreate: function() {

		alert('here');
	},

	// top: a well that contains:
	//        	- find groups: a search area, 
	//			- create a new group
	//			- get all groups
	//
	renderButtons: function() {

		return (
			<ButtonToolbar justified>
				<Button 
					href="#"
					onClick={this.handleCreate}
				> 新建
				</Button>
				<Button 
					href="#"
					onClick={this.handleCreate}
				> 查找
				</Button>
				<Dropdown id="getGroups">
					<Button>班级列表</Button>
					<Dropdown.Toggle bsStyle="default"/>
					<Dropdown.Menu className="super-colors">
						<MenuItem eventKey="1" onSelect={this.handleCreate}>尚未开始的班级</MenuItem>
						<MenuItem eventKey="2">正在进行中的班级</MenuItem>
						<MenuItem eventKey="3">全部班级</MenuItem>
					</Dropdown.Menu>
				</Dropdown>				
			</ButtonToolbar>
			);

	},

	// based on which button the user clicked, render the proper content
	renderMainArea: function() {
		if (this.state.showAdd) {
			return (
				<GroupAddMenu 
					handleAdd={this.handleAdd} />);
		} else if (this.state.showFind) {
			return (
				<GroupFindMenu
					handleFind={this.handleFind} />);
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
						{this.renderButtons()}
						{this.renderMainArea()}
					</div>
				</div>			
			</div>
		);
	}
})