var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var auth = require('../auth');
var Header = require('../Header/Header');

module.exports = React.createClass({   
		
	getInitialState: function() {
		return {
			isLoggedIn: false
		};
	},

	updateAuth: function(loggedIn) {
	    this.setState({
	      isLoggedIn: loggedIn,
	    })
	  },

	componentWillMount: function() {
		//hook up with auth service so that main will be updated if user login status changes
	    auth.onChange = this.updateAuth;
	    //auth.login();
	},

	handleLogin: function() {

	},

	render: function() {

		return (
			<div id="main">
				<Header 
					isLoggedIn={this.state.isLoggedIn}
					user={this.state.isLoggedIn? auth.getUser():null}
					handleLogin={this.handleLogin}
					/>		
				{this.props.children}
			</div>);
	}
});