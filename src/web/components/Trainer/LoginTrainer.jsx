var React = require('react');
var History = require('react-router').History;
var Link = require('react-router').Link;

// UI components
var Panel = require('react-bootstrap/lib/panel');
var Input = require('react-bootstrap/lib/input');
var Glyphicon = require('react-bootstrap/lib/glyphicon');
var Button = require('react-bootstrap/lib/button');
//var Button = require('react-progress-button');

var auth = require('../../utils/auth');

var RoleType = require('../../utils/constants').RoleType;
var Error = require('../Common/Errors');

module.exports = React.createClass({

	mixins: [History],

	getInitialState: function() {
		return {
			phone: '',
			password: '',
			loading: false,
			error: false,
			errorMsg: '登录信息不正确'
		}
	},

	handlePhoneChange: function(e) {
		e.preventDefault();

		this.setState({
			phone:e.target.value
		});
	},

	handlePasswordChange: function(e) {
		e.preventDefault();

		this.setState({
			password:e.target.value
		});
	},

	handleLogin: function(event) {
		event.preventDefault();

		var phone = this.state.phone;
		var pass = this.state.password;

		this.setState({
			loading:true
		});

		auth.login(
			phone, 
			pass, 
			[RoleType.Trainer.id], // must be trainer
			function(loggedIn, status) {
			    if (!loggedIn) {
			    	var errorMsg = '登录信息不正确'; 
			    	this.setState({ loading: false, error: true, errorMsg: errorMsg});
			    } else {
			    	this.setState({loading: false, error: false});
		    		this.history.replaceState(null, '/');
			    }
			    // const location = this.props.location;

			    // if (location.state && location.state.nextPathname) {
			    //     this.history.replaceState(null, location.state.nextPathname);
			    // } else {
			    //     this.history.replaceState(null, '/');
			    // }
			}.bind(this)
		);
	},

	render: function() {
		var title = (
			<h4>欢迎您登录PiPi</h4>
			);
		var mobileGlyphicon=<Glyphicon glyph="phone"/>;
		var passwordGlyphicon=<Glyphicon glyph="lock"/>;
		var errorMsg = <p className="error">{this.state.errorMsg}</p>;	
		
		return (
			<div className="loginTrainer">
		        <Panel  
		          className="col-md-4 col-md-offset-4"
		          bsStyle="default">
		          {title}
		            <form>
		                <Input 
		                	type="tel" 
		                	placeholder="手机"
		                	hasFeedback 
		                	feedbackIcon={mobileGlyphicon} 
		                	onChange={this.handlePhoneChange}
		                />
		                <Input 
		                	type="password" 
		                	placeholder="密码" 
		                	hasFeedback 
		                	feedbackIcon={passwordGlyphicon} 
		                	onChange={this.handlePasswordChange}		                	
		                />
		                <Button 
		                	block
		                	onClick={this.handleLogin}>
		                	{this.state.loading? '请稍候...':'登录'}
		                </Button>
		                {this.state.error && errorMsg}
		            </form>
		        </Panel>
	        </div>
			);
	}
})
