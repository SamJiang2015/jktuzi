var React = require('react');
var auth = require('../../utils/auth');
var Login = require('../Admin/LoginAdmin');

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