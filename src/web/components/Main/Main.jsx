var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var auth = require('../../utils/auth');
var Header = require('../Header/Header');
var Footer = require('../Footer/Footer');
var Login = require('../Login/Login');
var RoleName = require('../../utils/constants').RoleName;


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
	    
	    // log the user in if the user still has a valid token stored
	    auth.login();
	},

	render: function() {

		return (
			<div id="main">
				<Header 
					isLoggedIn={this.state.isLoggedIn}
					user={this.state.isLoggedIn? auth.getUser():null}
					roleName={this.state.isLoggedIn? auth.getRoleName():null}
					/>
				<div className="container">	
					{this.props.children}
				</div>


			</div>);
	}
});