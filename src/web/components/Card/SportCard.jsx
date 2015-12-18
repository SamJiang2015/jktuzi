//
// SportCard.jsx
//

// 
// HealthCard.jsx
// 

var React = require('react');
var SportCardItem = require('./SportCardItem');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');
var ButtonToolbar = require('react-bootstrap/lib/buttontoolbar');
var Limits = require('../../utils/constants').Limits;

var SportCard = React.createClass({

	statics: {
		newItemId: 0
	},

	getInitialState: function() {
		return {
			items: [],
			editable: false,
			error: false,
			errorMsg: ''
		}
	},

	copySportCardItems: function(items) {

		var copy = [];

		for (var i=0; i<items.length; i++){
			item=items[i];
			copy[i] = {
				id: item.id,
				workoutTypeId: item.workoutTypeId,
				description: item.description,
				duration: item.duration,
				distance: item.distance
			};
		}
		return copy;
	},

	componentDidMount: function() {
		this.setState({
			//deep copy the array so that we can easily rollback by resetting state.items to props.items
			//items: JSON.parse(JSON.stringify(this.props.items)), 
			items: this.copySportCardItems(this.props.items),
			editable: false,
			error: false,
			errorMsg: ''
		})
	},

	componentWillReceiveProps: function(newProps) {
		this.setState({
			//items: JSON.parse(JSON.stringify(newProps.items)), 
			items: this.copySportCardItems(newProps.items),
			editable: false,
			error: false,
			errorMsg: ''
		})
	},

	handleItemAddOrUpdate: function(item) {
	
		var items = this.state.items;
		// need to update the items list stored in the state to reflect the
		// added (or updated) item
		for (var i=items.length-1; i>=0; i--) {
			if (items[i].id === item.id) {
				items[i] = item;
				break;
			}
		} 

		// reset the state to trigger a rerender
		this.setState({
			items: items,
			error: false,
			errorMsg: ''			
		});
	},

	handleItemDelete: function(id) {
		var items = this.state.items;
		var i = items.length-1;
		// need to update the items list stored in the state to reflect the
		// added (or updated) item
		for (; i>=0; i--) {
			if (this.state.items[i].id === id) {
				break;
			}
		} 

		// remove the item from in-memory list
		items.splice(i, 1);

		// reset the state to trigger a rerender
		this.setState({
			items: items,
			error: false,
			errorMsg: ''
		});
	},

	handleEditableChange: function(e) {
		e.preventDefault();
		if (!this.state.editable)
			this.setState({
				editable: true,
				error: false,
				errorMsg: ''
		})
	},

	handleAdd: function(e) {
		e.preventDefault();

		if (this.state.items.length >= Limits.Workout.ItemCount.max) {
			this.setState({
				error: true,
				errorMsg: '抱歉，您已超过一天可以记录运动项目的上限了'
			});

			return;
		}

		// we first create a new SportCardItem and update the list stored in memory,
		// this will trigger a re-render s.t. the logic inside <SportCardItem> will take care 
		// of the job of rendering a form.  When SportCardItem is done, the user will click a confirm 
		// button and call the handleItemAdd here in parent.  That function will then hit the server
		// to add the item.  

		var items = this.state.items;
		var newId = SportCard.newItemId--;

		var newItem = {
			id: newId, // we use a static negative counter as ID place holders
									   // to avoid conflict with existing ids. the real ID will be set
										// once we hit the server
			workoutTypeId: 1,  // set to the first one otherwise if user does not change the select item
					  // type won't get set
			description: '',
			distance: '',
			duration: '',
			isNew: true // this flag will tell SportCardItem that it needs to show a form for user
					    // to complete the information
		};

		items.push(newItem);

		// set the items in memory to trigger a re-render
		this.setState({
			items: items,
			error: false,
			errorMsg: ''			
		});		
	},

	handleCancel: function(e) {
		e.preventDefault();

		this.setState({
			items: this.copySportCardItems(this.props.items),
			editable: false,
			error: false,
			errorMsg: ''
		});
	},

	handleSubmit: function(e) {
		e.preventDefault();

		//todo: call action to update data through store
		this.props.submitInfo(this.state.items);

		// after submit the field should become non-editable
		this.setState({
			editable: false,
			error: false,
			errorMsg: ''			
		});
	},

	renderItems: function() {
		return this.state.items.map(function(item) {
			return (<SportCardItem 
						key={item.id}
						id={item.id}
						workoutTypeId={item.workoutTypeId}
						description={item.description}
						duration={item.duration}
						distance={item.distance}
						isNew={item.isNew}
						cardEditable={this.state.editable}
						showModal={item.isNew ? item.isNew : false}
						handleDelete={this.handleItemDelete}
						handleAddOrUpdate={this.handleItemAddOrUpdate}
					/>
			);
		}.bind(this))
	},

	renderError: function() {
		if (this.state.error) {
			return (<p className="error">{this.state.errorMsg}</p>);
		} else {
			return null;
		}
	},	

	renderAddButton: function() {
		return (
			<tr>
			<td></td><td></td><td></td><td></td>
			<td>
	            <ButtonToolbar>			
					<Button 
						onClick={this.handleAdd} 
						bsStyle="success"
						bsSize="xsmall">
						<span className="glyphicon glyphicon-plus"></span>
					</Button>				
	            </ButtonToolbar>			
			</td>
			</tr>)

	},

	renderButton: function() {
		if (this.state.editable) {
			return (
				<div className="row">		
		            <div className="col-xs-2 col-xs-offset-4">					
						<Button 	
							onClick={this.handleCancel} 
							bsStyle="warning"
							bsSize="small"
							block>
							取消
						</Button>
					</div>				
		            <div className="col-xs-2">					
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
		}
		else {
			return (
				<div className="row">		
		            <div className="col-xs-4 col-xs-offset-4">	
						<Button 
							onClick={this.handleEditableChange} 
							bsStyle="default"
							bsSize="small"
							block>
							打卡
						</Button>
					</div>
				</div>);
		}
	},

	// extra column for the edit button
	renderEmptyHeading: function() {
		return (<th></th>);
	},

	render: function() {
		return (
			<div className="panel panel-info sportCard">
				<div className="panel-heading">
					<h5>运动打卡</h5>
				</div>
				<div className="panel-body">
					<table className="table table-condensed table-striped">
						<thead>
							<tr>
								<th>运动</th><th>描述</th><th>分钟</th><th>千米</th>
								{this.state.editable ? this.renderEmptyHeading() : null}
							</tr>
						</thead>
						<tbody>
							{this.renderItems()}
							{this.state.editable ? this.renderAddButton() : null}						
						</tbody>
					</table>
					{this.renderError()}	
					{this.renderButton()}

				</div>
			</div>			
		);
	}
})

module.exports = SportCard;