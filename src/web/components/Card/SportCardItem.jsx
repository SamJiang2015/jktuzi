// 
// SportCardItem.jsx
//
// Reprsent a single exercise item
//		type: Jogging/Biking/Elliptical/7Minute/Other
//		description: 跑步/自行车/椭圆机/7 分钟/'用户输入'
//		duration: in minutes
//		distance: in 公里
// 

var React = require('react');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');
var ButtonToolbar = require('react-bootstrap/lib/Buttontoolbar');
var SportCardItemModal = require('./SportCardItemModal');
var SportsTypes = require('../../utils/constants').SportsTypes;

module.exports = React.createClass({

	getInitialState: function(){
		return {
			workoutTypeId: null,
			description: '',
			duration: '',
			distance: '',
			cardEditable: false,
			showModal: false,
			error: false,
			errorMsg: ''
		};

	},

	setStateHelper: function(props) {
		this.setState({
			workoutTypeId: props.workoutTypeId,
			description: props.description,
			duration: props.duration,
			distance: props.distance,
			cardEditable: props.cardEditable,
			showModal: props.showModal,
			error: false,
			errorMsg: ''
		});
	},

	componentDidMount: function() {
		this.setStateHelper(this.props);	
	},

	componentWillReceiveProps: function(newProps) {
		this.setStateHelper(newProps);
	},	

	handleEdit: function() {
		this.setState({
			showModal: true,
			error: false
		})
	},

	handleDelete: function() {
		this.props.handleDelete(this.props.id);
	},

	handleModalSave: function(item) {
		// this callback will be called by the modal with item being set 
		// to the new (or updated) item info.  we then call the parent 
		// callback to pass the info further upstream, which will then
		// trigger re-render flowing down from SportCard to SportCardItems
		this.props.handleAddOrUpdate(item);
	},

	renderModal: function() {
		if (this.state.showModal) {
			return (
				<SportCardItemModal
					{...this.props}
					handleSave={this.handleModalSave}
					showModal={this.state.showModal}
					/>
			);
		}
	},

	renderButton: function() {
		if (this.state.cardEditable) {
			return (
				<td>
					<ButtonToolbar>
						<Button 
							onClick={this.handleEdit} 
							bsStyle="warning"
							bsSize="xsmall">
							<span className="glyphicon glyphicon-edit"/>
						</Button>
						<Button 
							onClick={this.handleDelete} 
							bsStyle="danger"
							bsSize="xsmall">
							<span className="glyphicon glyphicon-minus"/>
						</Button>
					</ButtonToolbar>							
				</td>
				);
		}
		else {
			return null;
		}
	},

	render: function() {

		// todo -- note the way we read display of SportsTypes depends on the fact
		// that type values are sequential ints: 1,2,3, .... 
		return (
			<tr className='sportCardItem'>
				<td>{SportsTypes.getDisplay(this.state.workoutTypeId)}</td>
				<td>{this.state.description}</td>
				<td>{this.state.duration}</td>
				<td>{this.state.distance}</td>
				{this.renderButton()}
				<td>{this.renderModal()}</td>
			</tr>
		);
	}

})



