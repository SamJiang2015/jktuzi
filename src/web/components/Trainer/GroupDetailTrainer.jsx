//
// GroupDetailTrainer.jsx
// 
//   Display 

var React = require('react');
var Reflux = require('reflux');
var Loader = require('react-loader');
var _=require('underscore');

// Bootstrap UI components
var ButtonToolbar = require('react-bootstrap/lib/buttontoolbar');
var ButtonGroup = require('react-bootstrap/lib/buttongroup');
var Button = require('react-bootstrap/lib/button');
var DropdownButton = require('react-bootstrap/lib/dropdownbutton');
var MenuItem = require('react-bootstrap/lib/menuitem');
var Input = require('react-bootstrap/lib/input');

// UI components
//var GroupList = require('./GroupListTrainer');
var Trainee = require('./TraineeTrainer');

var Error = require('../common/Errors');

// data layer
var Auth = require('../../utils/auth');
var GroupsActions = require('./groups-actions-trainer');
var GroupsStore = require('./groups-store-trainer');

module.exports = React.createClass({

	mixins: [
		Reflux.listenTo(GroupsStore, 'onGroupCardsChange')
	],

	onGroupCardsChange: function() {
	    this.setState({
	      group: GroupsStore.findGroupCards(this.props.params.id)
	    });
	},

	getInitialState: function(){
	    return {
	    	group: null
	    }
	},

	componentDidMount: function() {
		GroupsActions.getGroupCards(this.props.params.id); 
	},

	componentWillReceiveProps: function(nextProps) {
		GroupsActions.getGroupCards(nextProps.params.id);
	},

	renderTrainees: function() {

		if (this.state.group && this.state.group.trainees) {
			// first sort the list of trainees based on current meal status
			var traineesSortedByBreakfast = _.sortBy(this.state.group.trainees, 'breakfast');

			return traineesSortedByBreakfast.map(function(trainee) {
				return (<Trainee 
							key={trainee.id}
							id={trainee.id}
							name={trainee.name}
							nickname={trainee.nickname}
							breakfast={trainee.breakfast}
						/>
				);
			}.bind(this))
		} else {
			return null;
		}
	},

	renderButtons: function() {

		return (
				  <ButtonGroup justified>

				    <DropdownButton title="餐卡" id="bg-justified-dropdown">
				      <MenuItem eventKey="1">早</MenuItem>
				      <MenuItem eventKey="2">中</MenuItem>
				      <MenuItem eventKey="3">晚</MenuItem>
				    </DropdownButton>

				    <Button href="#">运动卡</Button>
				    <Button href="#">体重/体脂</Button>

				  </ButtonGroup>			);
	},	


	render: function() {
		return (
			<div className="groups trainer-group">
				<div className="panel panel-primary">
					<div className="panel-heading">	
						<h5>{this.state.group? this.state.group.name : ''}</h5>
					</div>
					<div className="panel-body">
						<div className="well">
							{this.renderButtons()}
						</div>					
							<table className="table table-condensed table-hover table-responsive">
								<thead>
									<tr>
										<th>姓名</th><th>微信昵称</th><th>早餐</th>
									</tr>
								</thead>
								<tbody>
									{this.renderTrainees()}					
								</tbody>
							</table>
					</div>
				</div>			
			</div>
		);	
	}

})