var React = require('react');
var auth = require('../auth');
var Login = require('../Login/Login');

module.exports = React.createClass({
  componentDidMount: function() {
    auth.logout()
  },

  render: function() {
  	return (
  		<div className="logout">
  			<p>谢谢您使用PiPi！欢迎您再来！</p>
    		<Login />
		</div>
    	);
  }
})