//
// GroupDetailTrainer.jsx
// 
//   Display 

var React = require('react');
var Reflux = require('reflux');
var Loader = require('react-loader');

// Bootstrap UI components
var ButtonToolbar = require('react-bootstrap/lib/buttontoolbar');
var ButtonGroup = require('react-bootstrap/lib/buttongroup');
var Button = require('react-bootstrap/lib/button');
var Input = require('react-bootstrap/lib/input');
var Glyphicon = require('react-bootstrap/lib/glyphicon');

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
var EMPTY = require('../../utils/constants').EMPTY;

module.exports = React.createClass({

	mixins: [
		Reflux.listenTo(GroupsStore, 'onGroupCardsChange')
	],

	onGroupCardsChange: function() {

		var groupFromStore = GroupsStore.pickGroupById(this.props.params.id);

		// need to deep copy so that user can easily roll back unsubmitted
		// changes by clicking on "Cancel"
		var deepCopiedGroup = JSON.parse(JSON.stringify(groupFromStore));

		// move breakfast, lunch and dinner out of group.cardinfo, so that
		// we can easily sort by these three fields
		if (deepCopiedGroup.trainees) {
			for (var i=0; i<deepCopiedGroup.trainees.length; i++) {
				var trainee = deepCopiedGroup.trainees[i];
				if (trainee.cardInfo) {
					trainee.breakfast = trainee.cardInfo.breakfast;
					trainee.lunch = trainee.cardInfo.lunch;
					trainee.dinner= trainee.cardInfo.dinner;
				} else {
					trainee.breakfast = null;
					trainee.lunch = null;
					trainee.dinner= null;					
				}
			}
		}

		deepCopiedGroup.trainees.sort(function(a,b){
		  return (a.nickname.localeCompare(b.nickname));
		});

	    this.setState({
	      group: deepCopiedGroup,
	      newRemarks: [],
	      newExerciseInfo: [],
	      newMealInfo: [],
	      newBodyInfo: []
	    });
	},

	getInitialState: function(){
	    return {
	    	group: null,
	    	groupFromStore: null, // cache the state from store so that user can cancel changes
	    	cardType: null,
	    	checkAllStatus: null,
	    	showTrainees: false,
	    	cardDate: new Date().toJSON().slice(0,10),

	    	newRemarks: [],
		    newExerciseInfo: [],
		    newMealInfo:[],		    
		    newBodyInfo: [],    	

	    	loading: false
	    }
	},

	componentDidMount: function() {
		// by default, retrieve today's info first
		var date = new Date().toJSON().slice(0,10);
		// trigger fetching of the detailed info for the selected group
		// the change will be propgated from the store to this component
		// through the change listening mechanism
		GroupsActions.getGroupCards(
			this.props.params.id,
			date,
			Auth.getAccountId(),
			Auth.getToken(),
			function(success) {
				if (!success) {
					alert('抱歉数据读取未成功，请稍候再试。如果持续有问题，请通过我们的微信公众号(PiPi健康)联系我们');
				}
			}); 
	},

	componentWillReceiveProps: function(nextProps) {
		// by default, retrieve today's info first
		var date = new Date().toJSON().slice(0,10);

		// trigger fetching of the detailed info for the selected group
		// the change will be propgated from the store to this component
		// through the change listening mechanism
		GroupsActions.getGroupCards(
			nextProps.params.id,
			date,
			Auth.getAccountId(),
			Auth.getToken(),
			function(success) {
				if (!success) {
					alert('抱歉数据读取未成功，请稍候再试。如果持续有问题，请通过我们的微信公众号(PiPi健康)联系我们');
				}
			});
	},

	handleCardDateChange: function(e) {
		e.preventDefault();

		var dateInput = e.target.value;

		// date is in the format of "YYYY-MM-DD"
		// m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'				
		var m = dateInput.match(/(\d{4})-(\d{2})-(\d{2})/);

		var inputDate = new Date(m[1], m[2]-1, m[3]);
        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);// 7 days before today        
        var endDate = new Date();

        if(inputDate < startDate || inputDate > endDate) {
            alert("您只能编辑过去7天以内的信息");
        } else {

		GroupsActions.getGroupCards(
			this.props.params.id,
			dateInput, //date
			Auth.getAccountId(),
			Auth.getToken(),
			function(success) {      
				if (success) {  		
					this.setState({
						cardDate: dateInput,
						showTrainees: false
					});
				} else {
					alert('抱歉数据读取未成功，请稍候再试。如果持续有问题，请通过我们的微信公众号(PiPi健康)联系我们');					
				}
			}.bind(this));		
		}
	},

	// when user clicks on one of these buttons, meal status for all trainees
	// will be set to the value represented by the clicked button
	handleCheckAllChange: function(e) {

		var checkAllStatus; 

		// determine which checkall button has been clicked
		if (e.target.value==='pass' && this.state.checkAllStatus!==MealCardStatus.Pass) {
			checkAllStatus = MealCardStatus.Pass;
		} else if (e.target.value==='fail' && this.state.checkAllStatus!==MealCardStatus.Fail) {
			checkAllStatus = MealCardStatus.Fail;
		} else if (e.target.value==='miss' && this.state.checkAllStatus!==MealCardStatus.Miss) {
			checkAllStatus = MealCardStatus.Miss;
		} else if (e.target.value==='openday' && this.state.checkAllStatus!==MealCardStatus.OpenDay) {
			checkAllStatus = MealCardStatus.OpenDay;
		} else {
			checkAllStatus = null;
		}		

		// set the meal status for all trainees in this group
		for (var i=0; i<this.state.group.trainees.length; i++) {
			var trainee=this.state.group.trainees[i];

			// save the new status to the array of info that will be submitted
			// when coach clicks on 'submit'
			this.handleMealCardStatusChange(trainee.userId, checkAllStatus===null?EMPTY:checkAllStatus);

			// update state to show the UI.
			if (!trainee.cardInfo) {
				trainee.cardInfo = {
					breakfast: EMPTY,
					lunch: EMPTY,
					dinner: EMPTY,
					seven: 0,
					keep: 0,
					run: 0,
					otherDetal: 0,
					bodyweight: EMPTY,
					bodyfat: EMPTY
				};
			}

			trainee.cardInfo[this.state.cardType.propertyName] = checkAllStatus;
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

		var groupFromStore = GroupsStore.pickGroupById(this.props.params.id);

		// need to deep copy so that user can easily roll back unsubmitted
		// changes by clicking on "Cancel"
		var deepCopiedGroup = JSON.parse(JSON.stringify(groupFromStore));

		// move breakfast, lunch and dinner out of group.cardinfo, so that
		// we can easily sort by these three fields
		if (deepCopiedGroup.trainees) {
			for (var i=0; i<deepCopiedGroup.trainees.length; i++) {
				var trainee = deepCopiedGroup.trainees[i];
				if (trainee.cardInfo) {
					trainee.breakfast = trainee.cardInfo.breakfast;
					trainee.lunch = trainee.cardInfo.lunch;
					trainee.dinner= trainee.cardInfo.dinner;
				} else {
					trainee.breakfast = null;
					trainee.lunch = null;
					trainee.dinner= null;					
				}
			}
		}

		deepCopiedGroup.trainees.sort(function(a,b){
		  return (a.nickname.localeCompare(b.nickname));
		});

		this.setState({
			group: deepCopiedGroup,
			cardType: this.state.cardType,
			checkAllStatus: null,
			newRemarks: [],
			newBodyInfo: [],
			newMealInfo: [],
			newExerciseInfo: []
		})
	},

	// when user clicks on submit, write the corresponding card info saved in this 
	// component to store.  Store function will automatically broadcast 
	// the change and trigger a re-render
	handleSubmit: function(e) {
		e.preventDefault();

		if (this.state.newMealInfo.length===0 &&
			this.state.newBodyInfo.length===0 &&
			this.state.newExerciseInfo.length===0 &&
			this.state.newRemarks.length===0) {
			alert('您还没有修改信息');
			return;
		}

		this.setState({
			loading: true
		});

		switch (this.state.cardType) {
			case CardType.Breakfast:
			case CardType.Lunch:
			case CardType.Dinner:
				if (this.state.newMealInfo.length>0) {
					GroupsActions.writeMealInfo(
						this.props.params.id, //classId
						Auth.getCoachId(), //coachId
						Auth.getAccountId(), //operatorId,
						this.state.cardDate, // date,
						this.state.cardType.propertyName, // URI path
						this.state.newMealInfo, // new info
						Auth.getToken(),
						function(success) {
							if (success) {
								alert('您已成功提交餐卡信息');
								this.setState({
									loading: false,
									showTrainees: false,
									cardType: null,
									newMealInfo: [],
								})
							} else {
								alert('抱歉提交未成功，请稍候再试。如果持续有问题，请通过我们的微信公众号(PiPi健康)联系我们');							
								this.setState({
									loading: false						
								});							
							}
						}.bind(this));
				}						
				break;
			case CardType.Sports:
				if (this.state.newExerciseInfo.length>0) {
					GroupsActions.writeExerciseInfo(
						this.props.params.id, //classId
						Auth.getCoachId(), //coachId
						Auth.getAccountId(), //operatorId,
						this.state.cardDate, // date
						this.state.newExerciseInfo, // new info
						Auth.getToken(),
						function(success) {
							if (success) {
								alert('您已成功提交运动卡信息');
								this.setState({
									showTrainees: false,
									cardType: null,
									newExerciseInfo: [],
									loading: false
								})
							} else {
								alert('抱歉提交未成功，请稍候再试。如果持续有问题，请通过我们的微信公众号(PiPi健康)联系我们');							
								this.setState({
									loading: false						
								});														
							}
						}.bind(this));			
				}
				break;
			case CardType.Body:
				if (this.state.newBodyInfo.length>0) {
					GroupsActions.writeBodyInfo(			
						this.props.params.id, //classId
						Auth.getCoachId(), //coachId
						Auth.getAccountId(), //operatorId,
						this.state.cardDate, // date,
						this.state.newBodyInfo, // new info
						Auth.getToken(),
						function(success) {
							if (success) {
								alert('您已成功提交体卡信息');
								this.setState({
									showTrainees: false,
									cardType: null,
									newBodyInfo: [],
									loading: false
								})
							} else {
								alert('抱歉提交未成功，请稍候再试。如果持续有问题，请通过我们的微信公众号(PiPi健康)联系我们');							
								this.setState({
									loading: false						
								});														
							}
						}.bind(this));					
				}
				break;
			case CardType.Remarks:
				if (this.state.newRemarks.length>0) {
					GroupsActions.writeRemarks(
						this.props.params.id, //classId
						Auth.getCoachId(), //coachId
						Auth.getAccountId(), //operatorId,
						this.state.cardDate, // date
						this.state.newRemarks, // remarks
						Auth.getToken(),
						function(success) {
							if (success) {
								alert('您已成功提交备注信息');
								this.setState({
									showTrainees: false,
									cardType: null,
									newRemarks: [],
									loading: false
								})
							} else {
								alert('抱歉提交未成功，请稍候再试。如果持续有问题，请通过我们的微信公众号(PiPi健康)联系我们');							
								this.setState({
									loading: false						
								});														
							}
						}.bind(this));
				}
				break;
			default:
				//should not be here
		}
	},

	// helper function
	pickObjectByUserId: function(userId, objects) {
		var obj = null;

		for (var i=0; i<objects.length; i++) {
			if (objects[i].userId.toString() === userId.toString()) {
				obj = objects[i];
			}
		}

		return obj;
	},

	// when user changes the remark for a trainee, 
	// save the new value so that we can commit to store later when
	// user clicks on submit button
	handleRemarkChange: function(traineeId, newValue) {

		// coach edited a remark, first check if the corresponding user is 
		// already in the data array that will be submitted to DB. Update
		// if it is, or insert into the array if not
		var remark=this.pickObjectByUserId(traineeId, this.state.newRemarks);
		if (remark) {
			remark.remark = newValue;
		} else {
 			this.state.newRemarks.push({
				userId: traineeId,
				remark: newValue 				
 			})
		}

		// also update the state -- this way when we set loading to true
		// which causes a re-render, the UI will not jump back
		var trainee = this.pickObjectByUserId(traineeId, this.state.group.trainees);
		if (!trainee.remarks) {trainee.remarks=[];}
		for(var i=0; i<trainee.remarks.length; i++) {
			if (trainee.remarks[i].coachId.toString()===Auth.getCoachId().toString()) {
				trainee.remarks[i].remark=newValue;
				trainee=null;
				break;
			}
		}
		// we did not find a matching remark made by this coach
		if (trainee!==null) {
			trainee.remarks.push({
				coachId: Auth.getCoachId(),
				coachName: Auth.getAccountName(),
				remark: newValue
			})
		}
	},

	// when user changes the sport card status for a trainee, 
	// save the new status so that we can commit to store later when
	// user clicks on submit button
	handleSportsCardStatusChange: function(traineeId, newExerciseInfo) {
		
		var exercise=this.pickObjectByUserId(traineeId, this.state.newExerciseInfo);

		// need to convert to string as otherwise the backend API will throw errors
		// if these 1s and 0s are passed in without ""s
		var newExerciseInfoStringFormat = {
					seven: newExerciseInfo.seven.toString(),
					keep: newExerciseInfo.keep.toString(),
					run: newExerciseInfo.run.toString(),
					otherDetail: newExerciseInfo.otherDetail.toString()
			};

		if (exercise) {
			exercise.exerciseInfo=newExerciseInfoStringFormat;
		} else {
 			this.state.newExerciseInfo.push({
				userId: traineeId,
				exerciseInfo: newExerciseInfoStringFormat
 			})
		}

		// also update the state -- this way when we set loading to true
		// which causes a re-render, the UI will not jump back
		var trainee = this.pickObjectByUserId(traineeId, this.state.group.trainees);
		if (!trainee.cardInfo) {trainee.cardInfo={};}
		trainee.cardInfo.seven=newExerciseInfo.seven;
		trainee.cardInfo.keep=newExerciseInfo.keep;
		trainee.cardInfo.run=newExerciseInfo.run;
		trainee.cardInfo.otherdetail=newExerciseInfo.otherDetail; // note the API server returns "otherdetail"
																  // but demands "otherDetail" when passing data in
	},	

	// when user changes the body card status for a trainee, 
	// save the new status so that we can commit to store later when
	// user clicks on submit button
	handleBodyCardStatusChange: function(traineeId, bodyWeight, bodyFat) {
		
		var bodyInfo=this.pickObjectByUserId(traineeId, this.state.newBodyInfo);
		if (bodyInfo) {
			bodyInfo.bodyWeight=bodyWeight.toString();
			bodyInfo.bodyFat=bodyFat.toString();
		} else {
 			this.state.newBodyInfo.push({
				userId: traineeId,
				bodyWeight: bodyWeight.toString(),
				bodyFat: bodyFat.toString()
 			});
		}

		// also update the state -- this way when we set loading to true
		// which causes a re-render, the UI will not jump back
		var trainee = this.pickObjectByUserId(traineeId, this.state.group.trainees);
		if (!trainee.cardInfo) {trainee.cardInfo={};}
		trainee.cardInfo.bodyweight=bodyWeight;
		trainee.cardInfo.bodyfat=bodyFat;
	},	

	// when user changes the meal card status for a trainee, 
	// save the new status so that we can commit to store later when
	// user clicks on submit button
	handleMealCardStatusChange: function(traineeId, newStatus) {

		var mealInfo=this.pickObjectByUserId(traineeId, this.state.newMealInfo);
		if (!mealInfo) {
			mealInfo={};
			mealInfo['userId'] = traineeId;
 			this.state.newMealInfo.push(mealInfo);			
		}

		mealInfo[this.state.cardType.propertyName]=newStatus.toString();

		// also update the state -- this way when we set loading to true
		// which causes a re-render, the UI will not jump back
		var trainee = this.pickObjectByUserId(traineeId, this.state.group.trainees);
		if (!trainee.cardInfo) {trainee.cardInfo={};}
		trainee.cardInfo[this.state.cardType.propertyName]=newStatus;
	},

	handleNickNameClick: function(e) {
		e.preventDefault();

		this.state.group.trainees.sort(function(a,b){
		  return (a.nickname.localeCompare(b.nickname));
		});

		this.setState({
			group: this.state.group
		})
	},

	handleCardTypeClick: function(e) {
		e.preventDefault();

		var compareFunc; 

		switch (this.state.cardType) {
			case CardType.Breakfast:
			case CardType.Lunch:
			case CardType.Dinner:
				compareFunc=function(a,b) {
				  return (a[this.state.cardType.propertyName] - b[this.state.cardType.propertyName]);
						}.bind(this);					
				break;
			case CardType.Sports: 
			default: 
				compareFunc=function(a,b) {
					return a.nickname.localeCompare(b.nickname);
				};
		}
		this.state.group.trainees.sort(compareFunc);

		this.setState({
			group: this.state.group
		})
	},

	// Buttons to switch the input card type: 早、中、晚、运动、体重/体脂
	renderCardTypeButtons: function() {

		return (
			<ButtonToolbar>

				<ButtonGroup>
				    <Button 
				    	href="#" 
						className={this.state.cardType===CardType.Breakfast?'active':null}				    	
				    	onClick={function(e){
				    		e.preventDefault(); 
				    		this.setState({cardType:CardType.Breakfast, showTrainees:true});
				    	}.bind(this)}>
				    	早
		    		</Button>
				    <Button 
				    	href="#" 
						className={this.state.cardType===CardType.Lunch?'active':null}				    	
				    	onClick={function(e){
				    		e.preventDefault(); 
				    		this.setState({cardType:CardType.Lunch, showTrainees:true})}.bind(this)}>
				    	午
				    </Button>
				    <Button 
				    	href="#" 
						className={this.state.cardType===CardType.Dinner?'active':null}				    	
				    	onClick={function(e){
				    		e.preventDefault(); 
				    		this.setState({cardType:CardType.Dinner, showTrainees:true})}.bind(this)}>
				    	晚
				    </Button>
				</ButtonGroup>
				<ButtonGroup>
				    <Button 
				    	href="#" 
						className={this.state.cardType===CardType.Sports?'active':null}				    	
				    	onClick={function(e){
				    		e.preventDefault(); 
				    		this.setState({cardType:CardType.Sports, showTrainees:true})}.bind(this)}>
				    	运动
				    </Button>
				</ButtonGroup>
				<ButtonGroup>
				    <Button 
				    	href="#" 
						className={this.state.cardType===CardType.Body?'active':null}				    	
				    	onClick={function(e){
				    		e.preventDefault(); 		    		
				    		this.setState({cardType:CardType.Body, showTrainees:true})}.bind(this)}>
				    	体卡
				    </Button>
				</ButtonGroup>
				<ButtonGroup>
				    <Button 
				    	href="#" 
						className={this.state.cardType===CardType.Remarks?'active':null}				    	
				    	onClick={function(e){
				    		e.preventDefault(); 			    		
				    		this.setState({cardType:CardType.Remarks, showTrainees:true})}.bind(this)}>
				    	备注
				    </Button>
				</ButtonGroup>				
			</ButtonToolbar>
		);
	},	

	// render table of trainees
	renderTraineesList: function() {

		if (!this.state.group || !this.state.group.trainees) {
			return null;
		}		

		return this.state.group.trainees.map(function(trainee) {
			return (<Trainee 
						key={trainee.userId}
						id={trainee.userId}
						name={trainee.name}
						nickname={trainee.nickname}
						mealCardStatus={trainee.cardInfo ? trainee.cardInfo[this.state.cardType.propertyName] : null}
						seven={trainee.cardInfo ? trainee.cardInfo.seven  : null}
						keep={trainee.cardInfo ? trainee.cardInfo.keep : null}
						jogging={trainee.cardInfo ? trainee.cardInfo.run : null}
						others={trainee.cardInfo ? trainee.cardInfo.otherdetail : null}
						weight={trainee.cardInfo ? trainee.cardInfo.bodyweight : null}
						fat={trainee.cardInfo ? trainee.cardInfo.bodyfat : null}
						remarks={trainee.remarks}
						cardType={this.state.cardType}
						handleMealCardStatusChange={this.handleMealCardStatusChange}
						handleSportsCardStatusChange={this.handleSportsCardStatusChange}
						handleBodyCardStatusChange={this.handleBodyCardStatusChange}
						handleLabelChange={this.handleLabelChange}
						handleRemarkChange={this.handleRemarkChange}
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
				<div className="table-responsive cardTable">
					<table className="table table-condensed table-hover">
						<thead>
							<tr>
								<th style={{width: '9%'}} onClick={this.handleNickNameClick}>昵称</th>
								<th style={{width: '90%'}} onClick={this.handleCardTypeClick}>{this.state.cardType.description}</th>
								<th style={{width: '1%'}}></th>
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
							value="pass"  
							checked={this.state.checkAllStatus===MealCardStatus.Pass?'checked':null}
							onChange={this.handleCheckAllChange}/>
							<Glyphicon glyph="ok-circle"/>
					</label>
					<label className="checkbox-inline">								
						<input 
							type="checkbox" 
							value="fail" 
							checked={this.state.checkAllStatus===MealCardStatus.Fail?'checked':null}
							onChange={this.handleCheckAllChange} />
							<Glyphicon glyph="remove-circle"/>
					</label>
					<label className="checkbox-inline">
						<input 
							type="checkbox" 
							value="miss"  
							checked={this.state.checkAllStatus===MealCardStatus.Miss?'checked':null}
							onChange={this.handleCheckAllChange}/>
							<Glyphicon glyph="ban-circle"/>
					</label>					
					<label className="checkbox-inline">								
						<input 
							type="checkbox" 
							value="openday" 
							checked={this.state.checkAllStatus===MealCardStatus.OpenDay?'checked':null}
							onChange={this.handleCheckAllChange} />
							<Glyphicon glyph="cutlery"/>
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
						{this.state.loading?'请稍候...':'提交'}
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
						<h5>{this.state.group? this.state.group.classname : ''}</h5>
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