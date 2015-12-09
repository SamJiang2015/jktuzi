var React = require('react');
var auth = require('../auth');
var Login = require('../Login/Login');

module.exports = React.createClass({
  componentDidMount: function() {
    auth.logout()
  },

  render: function() {
  	return (
  		<div>
  			<p> 请重新登录</p>
    		<Login />
		</div>
    	);
  }
})