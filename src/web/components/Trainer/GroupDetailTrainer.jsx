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
var SportsType = require('../../utils/constants').SportsType;
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
	    	cardType: null,
	    	checkAllStatus: null,
	    	showTrainees: false,
	    	cardDate: new Date().toISOString().slice(0,10)
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

	handleCardDateChange: function(e) {
		e.preventDefault();

		this.setState({
			cardDate: e.target.value
		});		

		//todo: fetch card info for the new date from store
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
			this.state.group.trainees[i][this.state.cardType.propertyName] = checkAllStatus;
		}

		this.setState({
			group: this.state.group,
			checkAllStatus: checkAllStatus
		});
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

	// when user clicks on submit, write the card info saved in this 
	// component to store.  Store function will automatically broadcast 
	// the change and trigger a re-render
	handleSubmit: function(e) {
		e.preventDefault();

		// todo: wrap this in an async call
		GroupsActions.writeGroupCards(this.state.group);
		alert('您已成功提交打卡信息');
		this.setState({
			showTrainees: false,
			cardType: null
		})
	},

	// when user changes the meal card status for a trainee, 
	// save the new status so that we can commit to store later when
	// user clicks on submit button
	handleMealCardStatusChange: function(traineeId, newStatus) {
		for (var i=0; i<this.state.group.trainees.length; i++) {
			if (this.state.group.trainees[i].id.toString() === traineeId.toString()) {
				this.state.group.trainees[i][this.state.cardType.propertyName] = newStatus;
				break;
			}
		}
	},

	// when user changes the sport card status for a trainee, 
	// save the new status so that we can commit to store later when
	// user clicks on submit button
	handleSportsCardStatusChange: function(traineeId, sportsType, newStatus) {
		
		if (this.state.cardType!==CardType.Sports) {
			console.log('Error: handleSportsCardStatusChange called when card type is not sports!');
		}

		for (var i=0; i<this.state.group.trainees.length; i++) {
			if (this.state.group.trainees[i].id.toString() === traineeId.toString()) {
				this.state.group.trainees[i][sportsType.propertyName] = newStatus;
				break;
			}
		}
	},	

	// when user changes the weight value for a trainee, 
	// save the new weight so that we can commit to store later when
	// user clicks on submit button
	handleWeightChange: function(traineeId, newValue) {
		for (var i=0; i<this.state.group.trainees.length; i++) {
			if (this.state.group.trainees[i].id.toString() === traineeId.toString()) {
				this.state.group.trainees[i].weight = newValue;
				break;
			}
		}
	},

	// when user changes the bodyfat value for a trainee, 
	// save the new value so that we can commit to store later when
	// user clicks on submit button
	handleFatChange: function(traineeId, newValue) {
		for (var i=0; i<this.state.group.trainees.length; i++) {
			if (this.state.group.trainees[i].id.toString() === traineeId.toString()) {
				this.state.group.trainees[i].bodyfat = newValue;
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
						className={this.state.cardType===CardType.Breakfast?'active':null}				    	
				    	onClick={function(e){
				    		e.preventDefault(); this.setState({cardType:CardType.Breakfast, showTrainees:true})}.bind(this)}>
				    	早餐
		    		</Button>
				    <Button 
				    	href="#" 
						className={this.state.cardType===CardType.Lunch?'active':null}				    	
				    	onClick={function(e){
				    		e.preventDefault(); this.setState({cardType:CardType.Lunch, showTrainees:true})}.bind(this)}>
				    	午餐
				    </Button>
				    <Button 
				    	href="#" 
						className={this.state.cardType===CardType.Dinner?'active':null}				    	
				    	onClick={function(e){
				    		e.preventDefault(); this.setState({cardType:CardType.Dinner, showTrainees:true})}.bind(this)}>
				    	晚餐
				    </Button>
				    <Button 
				    	href="#" 
						className={this.state.cardType===CardType.Sports?'active':null}				    	
				    	onClick={function(e){
				    		e.preventDefault(); this.setState({cardType:CardType.Sports, showTrainees:true})}.bind(this)}>
				    	运动
				    </Button>
				    <Button 
				    	href="#" 
						className={this.state.cardType===CardType.Body?'active':null}				    	
				    	onClick={function(e){
				    		e.preventDefault(); this.setState({cardType:CardType.Body, showTrainees:true})}.bind(this)}>
				    	体卡
				    </Button>
				</ButtonGroup>			
			);
	},	

	// render table of trainees
	renderTraineesList: function() {

		if (!this.state.group || !this.state.group.trainees) {
			return null;
		}		

		var sortedByField;

		// if meal card, sort by meal card status; otherwise sort by wechat nickname
		switch(this.state.cardType) {
			case CardType.Breakfast:
			case CardType.Lunch:
			case CardType.Dinner:
				sortedByField = this.state.cardType.propertyName;
				break;
			default: 
				sortedByField = 'nickname';
		}

		// first sort the list of trainees based on current meal status
		var traineesSorted = _.sortBy(this.state.group.trainees, sortedByField);

		return traineesSorted.map(function(trainee) {
			return (<Trainee 
						key={trainee.id}
						id={trainee.id}
						name={trainee.name}
						nickname={trainee.nickname}
						mealCardStatus={trainee[this.state.cardType.propertyName]}
						seven={trainee.seven}
						keep={trainee.keep}
						jogging={trainee.jogging}
						others={trainee.others}
						weight={trainee.weight}
						fat={trainee.bodyfat}
						labels={trainee.labels}
						cardType={this.state.cardType}
						handleMealCardStatusChange={this.handleMealCardStatusChange}
						handleSportsCardStatusChange={this.handleSportsCardStatusChange}
						handleWeightChange={this.handleWeightChange}
						handleFatChange={this.handleFatChange}
					/>
			);
		}.bind(this))
	},

	renderTraineesTable: function() {

		if (!this.state.showTrainees) {
			return null;
		}

		return (
			<div>
				<div className="table-responsive">
					<table className="table table-condensed table-hover">
						<thead>
							<tr>
								<th style={{width: '10%'}}>昵称</th>
								<th style={{width: '90%'}}>{this.state.cardType.description}</th>
							</tr>
							{this.renderMealStatusCheckAllButtons()}								
						</thead>
						<tbody>
							{this.renderTraineesList()}					
						</tbody>
					</table>
				</div>
				{this.renderSCButtons()}
			</div>
		);
	},

	// click on these buttons will set all trainees' meal status 
	renderMealStatusCheckAllButtons: function() {
		// only render these buttons if user is editing a meal type card
		if (this.state.cardType!==CardType.Breakfast 
				&& this.state.cardType!==CardType.Lunch 
				&& this.state.cardType!==CardType.Dinner) {
			return null;
		}

		return (
			<tr><td></td><td>
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
			</td></tr>
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
				<div className="panel panel-info">
					<div className="panel-heading">	
						<h5>{this.state.group? this.state.group.name : ''}</h5>
					</div>
					<div className="panel-body">
						<div className="well">
							<div className="row">
								<div className="col-sm-2">
									<p>选择打卡日期和类型：</p>
								</div>
								<div className="col-sm-4">
									<Input 
										type="date" 
										value={this.state.cardDate}						
										className="form-control" 
										onChange={this.handleCardDateChange}/>
								</div>
							</div>
							{this.renderCardTypeButtons()}
						</div>
						{this.renderTraineesTable()}					
					</div>
				</div>			
			</div>
		);	
	}

})