//
// Remarks.jsx
//

var React = require('react');
var RemarkInputModal = require('./RemarkInputModal');
var Input = require('react-bootstrap/lib/input');
var Auth = require('../../utils/auth');


module.exports = React.createClass({

	getInitialState: function() {

		return {
			remarks: [],
			ownRemark: null,
			showModal: false
		}
	},

	setStateHelper: function(props) {

		var remarks=[];
		var ownRemark = {
			coachId: Auth.getCoachId(),
			coachName: Auth.getAccountName(),
			remark: ''
		};

		// separate out remarks left by other trainers
		if (props.remarks && props.remarks.length>0) {
			for (var i=0; i< props.remarks.length; i++) {
				var remark = props.remarks[i];
				if (remark.coachId.toString() === Auth.getCoachId().toString()) {
					ownRemark = remark;
				} else {				
					if (remark.remark && remark.remark.trim() !== '') {
						// only display remarks that are not emplty
						remarks.push(remark);
					}
				}
			}
		}

		this.setState({
			remarks: remarks,
			ownRemark: ownRemark,
			showModal: false
		})
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);
	 },

	 componentWillReceiveProps: function(newProps) {
		this.setStateHelper(newProps);
	 },

	 handleRemarkChange: function(newRemarkContent) {

		// call handler from parent component to pass up the new status
	 	this.props.handleRemarkChange(newRemarkContent);

	 	var ownRemark=this.state.ownRemark;
	 	ownRemark.remark = newRemarkContent;

	 	this.setState({
	 		ownRemark: ownRemark,
	 		showModal: false
	 	});
	},

	handleClick: function(e) {
		e.preventDefault();

		this.setState({
			showModal: true
		})
	},

	renderRemarks: function() {

		return this.state.remarks.map(function(remark) {
			return (
        		<li
        			key={remark.coachId}>
        			<span className="trainerName">
        				{'['+remark.coachName+'教练:]'}
        			</span>        			
        			{remark.remark}
        		</li>				
			);			
		}.bind(this));
	},

	renderOwnRemark: function() {
		if (!this.state.ownRemark) {
			return null;
		}

		return (
				<li 
					className="ownRemark"
					onClick={this.handleClick}>
					<span>
					{this.state.ownRemark.remark.trim()===''?null:'[我:]'}
					</span>        			
					{this.state.ownRemark.remark.trim()===''?'点击输入备注':this.state.ownRemark.remark}
				</li>				
			);
	},

	renderModal: function() {
		if (this.state.showModal) {
			return (
				<RemarkInputModal
					remark={this.state.ownRemark?this.state.ownRemark.remark:''}
					handleRemarkChange={this.handleRemarkChange}
					showModal={this.state.showModal}
				/>
			);
		}
	},

	render: function() {
		return (
            <div 
            	className="remarksList">
            	<ul>
            		{this.renderRemarks()}
            		{this.renderOwnRemark()}
            	</ul>
            	{this.renderModal()}
            </div>
		);
	}
})