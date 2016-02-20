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
var Trainee = require('./TraineeTrainer');

var Error = require('../common/Errors');

// data layer
var Auth = require('../../utils/auth');
var GroupsActions = require('./groups-actions-trainer');
var GroupsStore = require('./groups-store-trainer');

// misc
var CardType = require('../../utils/constants').CardType;
var MealCardStatus = require('../../utils/constants').MealCardStatus;

module.exports = React.createClass({

	mixins: [
		Reflux.listenTo(GroupsStore, 'onGroupCardsChange')
	],

	onGroupCardsChange: function() {

		var groupFromStore = GroupsStore.findGroupCards(this.props.params.id);

		// need to deep copy so that user can easily roll back unsubmitted
		// changes by clicking on "Cancel"
		var deepCopiedGroup = JSON.parse(JSON.stringify(groupFromStore));

	    this.setState({
	      group: deepCopiedGroup,
	    });
	},

	getInitialState: function(){
	    return {
	    	group: null,
	    	groupFromStore: null, // cache the state from store so that user can cancel changes
	    	cardType: CardType.Breakfast,
	    	checkAllStatus: null
	    }
	},

	componentDidMount: function() {
		// trigger fetching of the detailed info for the selected group
		// the change will be propgated from the store to this component
		// through the change listening mechanism
		GroupsActions.getGroupCards(this.props.params.id); 
	},

	componentWillReceiveProps: function(nextProps) {
		// trigger fetching of the detailed info for the selected group
		// the change will be propgated from the store to this component
		// through the change listening mechanism
		GroupsActions.getGroupCards(nextProps.params.id);
	},

	// when user clicks on one of these buttons, meal status for all trainees
	// will be set to the value represented by the clicked button
	handleCheckAllChange: function(e) {

		var checkAllStatus; 

		// determine which checkall button has been clicked
		if (e.target.value==='pass' && e.target.checked) {
			checkAllStatus = MealCardStatus.Pass;
		} else if (e.target.value==='fail' && e.target.checked) {
			checkAllStatus = MealCardStatus.Fail;
		} else if (e.target.value==='miss' && e.target.checked) {
			checkAllStatus = MealCardStatus.Miss;
		} else if (e.target.value==='openday' && e.target.checked) {
			checkAllStatus = MealCardStatus.OpenDay;
		} else {
			checkAllStatus = null;
		}		

		// set the meal status for all trainees in this group
		for (var i=0; i<this.state.group.trainees.length; i++) {
			this.state.group.trainees[i].breakfast = checkAllStatus;
		}

		this.setState({
			group: this.state.group,
			checkAllStatus: checkAllStatus
		})
	},

	// when user clicks on cancel, just re-render the page using the data
	// loaded from DB
	handleCancel: function(e) {
		e.preventDefault();

		var groupFromStore = GroupsStore.findGroupCards(this.props.params.id);

		// need to deep copy so that user can easily roll back unsubmitted
		// changes by clicking on "Cancel"
		var deepCopiedGroup = JSON.parse(JSON.stringify(groupFromStore));

		this.setState({
			group: deepCopiedGroup,
			cardType: this.state.cardType,
			checkAllStatus: null
		})
	},

	// when user changes the meal card status for a trainee, 
	// save the new status so that we can commit to store later when
	// user clicks on submit button
	handleMealCardStatusChange: function(traineeId, newStatus) {
		for (var i=0; i<this.state.group.trainees.length; i++) {
			if (this.state.group.trainees[i].id.toString() === traineeId.toString()) {
				this.state.group.trainees[i].breakfast = newStatus;
				break;
			}
		}
	},

	// Buttons to switch the input card type: 早、中、晚、运动、体重/体脂
	renderCardTypeButtons: function() {

		return (
				  <ButtonGroup justified>
				    <Button 
				    	href="#" 
				    	onClick={function(e){e.preventDefault(); this.setState({cardType:CardType.Breakfast})}}>
				    		早餐
		    		</Button>
				    <Button href="#">午餐</Button>
				    <Button href="#">晚餐</Button>
				    <Button href="#">运动</Button>
				    <Button href="#">体重/脂</Button>
				  </ButtonGroup>			);
	},	

	// render table of trainees
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
							handleMealCardStatusChange={this.handleMealCardStatusChange}
						/>
				);
			}.bind(this))
		} else {
			return null;
		}
	},

	// click on these buttons will set 
	renderMealStatusButtons: function() {
		return (
			<div className="form-group">
				<label className="checkbox-inline">
					<input 
						type="checkbox" 
						value="miss"  
						checked={this.state.checkAllStatus===MealCardStatus.Miss?'checked':null}
						onChange={this.handleCheckAllChange}/>
						未打卡
				</label>
				<label className="checkbox-inline">
					<input 
						type="checkbox" 
						value="pass"  
						checked={this.state.checkAllStatus===MealCardStatus.Pass?'checked':null}
						onChange={this.handleCheckAllChange}/>
						合格
				</label>
				<label className="checkbox-inline">								
					<input 
						type="checkbox" 
						value="fail" 
						checked={this.state.checkAllStatus===MealCardStatus.Fail?'checked':null}
						onChange={this.handleCheckAllChange} />
						不合格
				</label>
				<label className="checkbox-inline">								
					<input 
						type="checkbox" 
						value="openday" 
						checked={this.state.checkAllStatus===MealCardStatus.OpenDay?'checked':null}
						onChange={this.handleCheckAllChange} />
						开放日
				</label>				
			</div>
		);
	},

	// submit and cancel buttons
	renderSCButtons: function() {
		return (
			<div className="row">		
	            <div className="col-xs-3 col-xs-offset-3">					
					<Button 	
						onClick={this.handleCancel} 
						bsStyle="warning"
						bsSize="small"
						block>
						取消
					</Button>
				</div>				
	            <div className="col-xs-3">					
					<Button 	
						onClick={this.handleSubmit} 
						bsStyle="success"
						bsSize="small"
						block>
						提交
					</Button>
				</div>
			</div>
		);			
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
							{this.renderCardTypeButtons()}
						</div>					
						<table className="table table-condensed table-hover table-responsive">
							<thead>
								<tr>
									<th>姓名</th><th>微信昵称</th><th>早餐</th>
								</tr>
								<tr>
									<td></td><td></td><td>{this.renderMealStatusButtons()}</td>
								</tr>
							</thead>
							<tbody>
								{this.renderTrainees()}					
							</tbody>
						</table>

						{this.renderSCButtons()}
					</div>
				</div>			
			</div>
		);	
	}

})