//
// TraineeInfoModal.jsx
//

//
// SportCardItemModal.jsx
//
//  	This is the modal component that handles adding
//		a new SportCardItem or Updating an existing one

var React = require('react');
var Reflux = require('reflux');
var Loader = require('react-loader');

var TraineeActions = require('./trainee-actions');
var TraineeStore = require('./trainee-store');
var Auth = require('../../utils/auth');

var LabelsEditModal = require('./TraineeLabelsEditModal');

var Modal = require('react-bootstrap/lib/modal');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');
var ButtonToolbar = require('react-bootstrap/lib/Buttontoolbar');

var LabelDisplay = require('../../utils/constants').LabelDisplay;
var LifeStatusDisplay = require('../../utils/constants').LifeStatusDisplay;
var PractiseHobbyDisplay = require('../../utils/constants').PractiseHobbyDisplay;

module.exports = React.createClass({

	// mixins: [
	// 	Reflux.listenTo(TraineeStore, 'onLabelsChange')
	// ],

	// onLabelsChange: function() {

 //    	var labelsFromStore = TraineeStore.findTrainee(this.props.id).labels;

	// 	// need to deep copy so that user can easily roll back unsubmitted
	// 	// changes by clicking on "Cancel"
	// 	var copiedLabels = [];
	// 	for (var i=0; i<labelsFromStore.length; i++) {
	// 		copiedLabels.push(labelsFromStore[i]);
	// 	}

	//     this.setState({
	//       labels: copiedLabels,
	//       showSelf: this.props.showModal      
	//     });
	// },

	getInitialState: function(){
		return {
            gender: null,
            birthday: null,
            city: null,
            college: null,
            lifeStatus: null,
            practiseHobby: null,
            height: null,
            curWeight: null,
            factori: null,
            hopeWeight: null,			
			labels: [],
			showSelf: false,
			showLabelEditModal: false,
			labelChanged: false,
			loading: false
		};
	},

	setStateHelper: function(props) {
		// todo: put this in an async call
		TraineeActions.getTraineeLabels(
			props.id,
			Auth.getAccountId(),
			props.classId,
			Auth.getToken(),
			function(success, json) {
				if (success) {
					var trainee = TraineeStore.findTrainee(props.id);
			    	var labelsFromStore = trainee.bodyLabels;

					// need to deep copy so that user can easily roll back unsubmitted
					// changes by clicking on "Cancel"
					var copiedLabels = [];
					for (var i=0; i<labelsFromStore.length; i++) {
						copiedLabels.push(labelsFromStore[i]);
					}

					if (trainee.infoSynced) {
					    this.setState({
				            gender: trainee.gender,
				            birthday: trainee.birthday,
				            city: trainee.city,
				            college: trainee.college,
				            lifeStatus: trainee.lifeStatus,
				            practiseHobby: trainee.practiseHobby,
				            height: trainee.height,
				            curWeight: trainee.curWeight,
				            factori: trainee.fatori,
				            hopeWeight: trainee.hopeWeight,
						    labels: copiedLabels,
						    
						    showSelf: props.showModal,
						    showLabelEditModal: false,
						    labelChanged: false,
						    loading: false      
					    });
					} else {
						// haven't called DB to get the user's registration info
						TraineeActions.getTraineeInfo(
							props.id,
							Auth.getAccountId(),
							Auth.getToken(),
							function(success, json) {
								if (success) {
									    this.setState({
								            gender: trainee.gender,
								            birthday: trainee.birthday,
								            city: trainee.city,
								            college: trainee.college,
								            lifeStatus: trainee.lifeStatus,
								            practiseHobby: trainee.practiseHobby,
								            height: trainee.height,
								            curWeight: trainee.curWeight,
								            factori: trainee.fatori,
								            hopeWeight: trainee.hopeWeight,
								            labels: copiedLabels,
										    
										    showSelf: props.showModal,
										    showLabelEditModal: false,
										    loading: false      
									    });
								}  else {
									alert('抱歉数据读取未成功，请稍候再试。如果持续有问题，请通过我们的微信公众号(PiPi健康)联系我们');
									alert('错误信息：'+JSON.stringify(json));					
								}
							}.bind(this));						
					}
				}  else {
					alert('抱歉数据读取未成功，请稍候再试。如果持续有问题，请通过我们的微信公众号(PiPi健康)联系我们');
					alert('错误信息：'+JSON.stringify(json));					
				}

			}.bind(this));
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);
	},

	componentWillReceiveProps: function(nextProps) {
		this.setStateHelper(nextProps);
	},	

	close: function() {		
		this.setState({
			showSelf: false,
			labelChanged: false
		})
	},

	open: function() {
		this.setState({
			showSelf: true,
			labelChanged: false
		})
	},	

	saveLabelData: function(labels) {
		this.setState({
			labels: labels,
			showSelf: true,
			showLabelEditModal: false,
			labelChanged: true,
			loading: false
		})
	},

	submitInfo: function(e) {
		e.preventDefault();

		this.setState({
			loading:true
		});		

		// todo: wrap this in an async call
		TraineeActions.writeTraineeLabels(
			this.props.id, 
			this.state.labels,
			Auth.getCoachId(),
			Auth.getAccountId(),
			this.props.classId,
			Auth.getToken(),
			function(success, json) {
				if (success) {
					alert('您已成功提交'+this.props.nickname+'的标签信息');
					this.setState({
						showSelf: false,
						labelChanged: false,
						loading: false
					});					
				} else {
					alert('抱歉提交未成功，请稍候再试。如果持续有问题，请通过我们的微信公众号(PiPi健康)联系我们');
					alert('错误信息：'+JSON.stringify(json));					
				}
			}.bind(this)
		);


	},

	renderLabels: function(){
		if (this.state.labels && this.state.labels.length>0) {
			return this.state.labels.map(function(label) {
				return (<Button
							key={label}
							bsSize='small' 
							bsStyle='info'>
						{LabelDisplay[label]}
						</Button>
				);
			})
		} else {
			return '无';
		}
	},

	renderLabelsEditModal: function() {
		if (this.state.showLabelEditModal) {
			return (
				<LabelsEditModal
					labels={this.state.labels}
					saveData={this.saveLabelData}
					showModal={this.state.showLabelEditModal}
					/>
			);
		}
	},

	renderModalBody: function() {
		return (
			<div className="panel panel-success">
				<div className="panel-heading">
					<h4>{this.props.nickname}</h4>
				</div>
				<div className="panel-body">
					<table className="table table-responsive table-striped table-condensed">
						<tbody>
							<tr> 
								<td>姓名</td> 
								<td>{this.props.name}</td>
								<td></td>
								<td></td>
							</tr>						
							<tr> 
								<td>性别</td> <td>{this.state.gender===1?'男':'女'}</td><td></td><td></td>
							</tr>
							<tr> 
								<td>出生年月</td> <td>{this.state.birthday}</td><td></td><td></td>
							</tr>
							<tr> 
								<td>城市</td> <td>{this.state.city}</td><td></td><td></td>
							</tr>
							<tr> 
								<td>毕业院校</td> <td>{this.state.college}</td><td></td><td></td>
							</tr>
							<tr> 
								<td>生活状态</td> <td>{this.state.lifeStatus?LifeStatusDisplay[this.state.lifeStatus]:''}</td><td></td><td></td>
							</tr>
							<tr> 
								<td>运动习惯</td> <td>{this.state.practiseHobby? PractiseHobbyDisplay[this.state.practiseHobby] + '次/周':''}</td><td></td><td></td>
							</tr>
							<tr> 
								<td>身高</td> <td>{this.state.height!=='-1'? this.state.height + '厘米':''}</td><td></td><td></td>
							</tr>
							<tr> 
								<td>原体重</td> <td>{this.state.curWeight!=='-1'?this.state.curWeight+'公斤':''}</td><td></td><td></td>
							</tr>
							<tr> 
								<td>原体脂</td> <td>{this.state.factori!=='-1'? this.state.factori+'％':''}</td><td></td><td></td>
							</tr>
							<tr> 
								<td>期望体重</td> <td>{this.state.hopeWeight!=='-1'?this.state.hopeWeight+'公斤':''}</td><td></td><td></td>
							</tr>

							<tr>
								<td>标签</td>
								<td className="traineeLabelsDisplay">{this.renderLabels()}</td>						
								<td>
									<Button
										onClick={function(e) {e.preventDefault(); this.setState({showLabelEditModal: true});}.bind(this)} 
										bsStyle="warning"
										bsSize="xsmall">									
										编辑
									</Button>
								</td>
								<td>{this.renderLabelsEditModal()}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			);
	},

	render: function(){

		return (
			<Modal 
				show={this.state.showSelf}
				onHide={this.close} >
				<Modal.Body>
					{this.renderModalBody()}
				</Modal.Body>
				<Modal.Footer>
					<ButtonToolbar>
						<Button disabled={this.state.labelChanged?null:true} bsStyle="success" onClick={this.submitInfo}>
		                	{this.state.loading? '请稍候...':'提交'}
						</Button>
						<Button bsStyle="default" onClick={this.close}>取消</Button>
					</ButtonToolbar>	
				</Modal.Footer>
			</Modal>);
	}
})
