// Success.jsx

var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
	render: function() {
		return (
			<div className="success">
				<h4>您的信息已成功提交</h4>
				<Link to='/'>回到主页</Link>
			</div>
		);
	}
})