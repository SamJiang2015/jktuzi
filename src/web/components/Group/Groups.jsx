//
// groups.jsx
//

var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var _ = require('underscore');

var Auth = require('../../utils/auth');
var GroupsStore = require('../../stores/groups-store');
var GroupsActions = require('../../actions/groups-actions');

var Group = require('./Group');
var GroupMembers = require('./GroupMembers');

module.exports = React.createClass({

	// listening to account store for changes to the trainee info of this account
	mixins: [
    	Reflux.listenTo(GroupsStore, 'onGroupsChange')
  	],

	getInitialState: function() {
		return {
			groups: [],
			showMembers: false,
			showingGroupId: null,
			error: false,
			errorMsg: ''
		}
	},

	onGroupsChange: function(event, groups) {
  		this.setState({
  			groups: groups
  		});
  	},

	componentDidMount: function() {
		GroupsActions.getGroups(
			Auth.getAccountId(), 
			Auth.getToken());
	},

	toggleShowGroupMembers: function(groupId) {

		if (!this.state.showMembers || 
			(groupId && groupId !== this.state.showingGroupId)) {
			// we were in the no-show state, so toggle to show state

			// first call store to fetch the members data 
			// note store may already have this info cached			
			GroupsActions.getGroupMembers(
				Auth.getAccountId(), 
				groupId,
				Auth.getToken(), 
				function(success, status) {
					if (success) {
						this.setState({
							showMembers: true,
							showingGroupId: groupId,
							error: false
						})
					} else {
						this.setState({
							error: true,
							errorMsg: '抱歉暂时无法获取群组信息，请稍候再试。'
						})
					}
				}.bind(this));
		} else {
			// we were showing the members, so toggle to no show
			this.setState({
				showMembers: false
			})
		}
	},

	renderGroup: function() {
		return this.state.groups.map(function(group) {
			return (<Group 
						key={group.id}
						id={group.id}
						name={group.name}
						nickname={group.nickname}
						startdate={group.startdate}
						groupTypeId={group.groupTypeId}
						toggleShowGroupMembers={this.toggleShowGroupMembers}
					/>
			);
		}.bind(this))
	},

	renderMembers: function() {
		var displayingGroup = _.findWhere(this.state.groups, {id: this.state.showingGroupId});			
		
		return (
			<GroupMembers 
				members={displayingGroup.members}
				handleHide={this.toggleShowGroupMembers}
				/>
			)
	},

	renderPanelBody: function() {

		if (this.state.groups && this.state.groups.length>0) {
			return (
				<div className="panel-body">
					<p>点击任一群查看成员信息</p>
					<table className="table table-condensed table-striped table-hover">
						<thead>
							<tr>
								<th>名字</th><th>别名</th><th>开始日期</th><th>类别</th>
							</tr>
						</thead>
						<tbody>
							{this.renderGroup()}					
						</tbody>
					</table>
					{this.state.showMembers? this.renderMembers():<span/>}
				</div>
			);
		} else {
			return (
				<div className="panel-body">
					<p>您还没有加入群组。请点击
						<Link to='requests'>申请入群</Link>
					</p>	
				</div>				
				)
		}			
	},

	render: function() {

		return (
			<div className="groups">
				<div className="panel panel-primary">
					<div className="panel-heading">	
						<h5>我的群</h5>
					</div>
					{this.renderPanelBody()}
				</div>			
			</div>
		);
	}
})
