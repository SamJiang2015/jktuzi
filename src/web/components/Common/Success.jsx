// Success.jsx

var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
	render: function() {
		return (
			<div className="success">
				<h4>您的信息已成功提交</h4>
				<p>请点击浏览器的返回键回到上一页</p>
				或点击<Link to='/'>回到主页</Link><br/>
				
			</div>
		);
	}
})