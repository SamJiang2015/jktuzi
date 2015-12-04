var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({   
		
	render: function() {
		return (
			<div>
				<h4>Simple Chat App</h4>
		        <ul>
		          <li><Link to="/join">Join</Link></li>
		          <li><Link to="/ChatRoom">Chat Room</Link></li>
		        </ul>				
				{this.props.children}
			</div>);
	}
});