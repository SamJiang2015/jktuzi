// 
// Error.jsx
//

var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({

	renderReLogin: function() {
		return (
			<p> 很抱歉您的登录已经失效。请点击<Link to='/login'>重新登录</Link></p>
			);
	},

	renderInputError: function() {
		return (
			<p> 好像您输入的信息有误哦。请点击返回键核对信息后再试。如果持续有问题，请您联系我们客服(电话：58888888)</p>
			);
	},

	render: function() {
		switch (this.props.errorCode) {
			case 401: 
				return this.renderReLogin();
			case 400: 
				return this.renderInputError();
			default: 
				return (
					<p>很抱歉暂时不能提交信息。请您稍侯再试。如果持续有问题，请联系我们客服(电话：58888888)</p>
					);
		}
	}
})