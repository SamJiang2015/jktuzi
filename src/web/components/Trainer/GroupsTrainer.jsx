// 
// GroupsTrainer.jsx
//

var React = require('react');
var Reflux = require('reflux');

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

	onGroupsChange: function(groups) {
  		this.setState({
  			groups: groups,
  			loaded: true
  		});
  	},

	getInitialState: function() {
		return {
			groups: [],
			selectedGroup: null,  // this is the group that the trainer is editing

			showList: true,
			showGroupDetail: false,

			loaded: false,
			error: false,
			errorMsg: ''
		};
	},

	componentDidMount: function() {
		// trigger fetching of the detailed info for the selected group
		// the change will be propgated from the store to this component
		// through the change listening mechanism
		GroupsActions.getGroups(
			Auth.getCoachId(), 
			Auth.getToken(), 
			Auth.getAccountId(), 
			function(success) {
				if (!success) {
					alert('抱歉数据读取未成功，请稍候再试。如果持续有问题，请通过我们的微信公众号(PiPi健康)联系我们');
				}
			}); 
	},

	renderMainArea: function() {
		if (this.state.groups.length > 0) {
			return (
				<GroupList
					groups={this.state.groups} 
				/>);
		} else {
			if (this.state.loaded) {
				return <p>您没有正在管理的班级</p>;
			} else {
				return <p>正在读取数据，请稍候...</p>
			}
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
							{this.renderMainArea()}
						</div>
					</div>
				</div>			
			</div>
		);
	}
})