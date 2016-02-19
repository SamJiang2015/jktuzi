var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Header = require('../Trainer/HeaderTrainer');
var Footer = require('../Footer/Footer');
var Login = require('../Trainer/LoginTrainer');
var Groups = require('../Trainer/GroupsTrainer');

var auth = require('../../utils/auth');
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
	    // auth.login();
	},

	renderContent: function() {

		// the request is just to '/' -- we either present a login page or a signup page
		if (!this.state.isLoggedIn) {
			return <Login/>;
		} else {
			if (this.props.children) {
				return this.props.children;
			} else {
				return <Groups/>
			}
		}
	},

	render: function() {
		return (
			<div id="main">
				<Header 
					isLoggedIn={this.state.isLoggedIn}
					accountName={this.state.isLoggedIn? auth.getAccountName():null}
					roleName={this.state.isLoggedIn? auth.getRoleName():null}
					/>
				<div className="container mainContent">	
					{this.renderContent()}
				</div>
			</div>);
	}
});