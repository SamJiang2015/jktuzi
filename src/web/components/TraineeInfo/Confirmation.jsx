// Confirmation.jsx

var React = require('react');
var Table = require('react-bootstrap/lib/table');
var Button = require('react-bootstrap/lib/button');

module.exports = React.createClass({

	render: function() {
		return (
			<div className="panel panel-success traineeInfoConfirmation">
				<div className="panel-heading">
					<h4>请确认您所输入的信息</h4>
				</div>
				<div className="panel-body">
					<table className="table table-responsive table-striped table-condensed">
						<tbody>
							<tr>
								<td>姓名</td>
								<td>{this.props.fieldValues.name}</td>
							</tr>					
							<tr> 
								<td>生日</td> 
								<td>{this.props.fieldValues.birthdate}</td>
							</tr>

							<tr>
								<td>性别</td>
								<td>{this.props.fieldValues.isMale===null? '': (this.props.fieldValues.isMale?'男':'女')}</td>
							</tr>
							<tr> 
								<td>邮箱</td> 
								<td>{this.props.fieldValues.email}</td>
							</tr>
							<tr> 
								<td>职业</td> 
								<td>{this.props.fieldValues.profession}</td>
							</tr>
							<tr> 
								<td>身高</td> 
								<td>{this.props.fieldValues.height!==''? (this.props.fieldValues.height+'厘米'):''}</td>
							</tr>
							<tr> 
								<td>体重</td> 
								<td>{this.props.fieldValues.weight!==''? (this.props.fieldValues.weight+'斤'):''}</td>
							</tr>
							<tr> 
								<td>体脂率</td> 
								<td>{this.props.fieldValues.bodyfat!=''? (this.props.fieldValues.bodyfat+'%'):''}</td>
							</tr>
							<tr>
								<td>目标体重</td> 
								<td>{this.props.fieldValues.weightGoal!==''? (this.props.fieldValues.weightGoal+'斤'):''}</td>
							</tr>
							<tr>
								<td>目标体脂率</td> 
								<td>{this.props.fieldValues.bodyfatGoal!=''? (this.props.fieldValues.bodyfatGoal+'%'):''}</td>
							</tr>
							<tr>
								<td>运动习惯</td> 
								<td>{this.props.fieldValues.habbit}</td>
							</tr>
							<tr>
								<td>昵称</td> 
								<td>{this.props.fieldValues.nickname}</td>
							</tr>
							<tr> 
								<td>个性签名</td> 
								<td>{this.props.fieldValues.signature}</td>
							</tr>							
							<tr>
								<td>介绍人</td> 
								<td>{this.props.fieldValues.sponsor}</td>
							</tr>
						</tbody>
					</table>

					<div className="form-group">		
		              	<div className="col-xs-4 col-xs-offset-2">				
							<Button 
								bsStyle="default"
								onClick={this.props.previousStep}
								bsSize="small"
								block>
								返回
							</Button>					
						</div>
	              		<div className="col-xs-4">					
							<Button 
								onClick={this.props.submitTraineeInfo} 
								bsStyle="success"
								bsSize="small"
								block>
								提交
							</Button>
						</div>
					</div>	
				</div>
			</div>
		);
	}
})