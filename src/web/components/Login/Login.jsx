var React = require('react');
var History = require('react-router').History;
var Link = require('react-router').Link;

// UI components
var Panel = require('react-bootstrap/lib/panel');
var Input = require('react-bootstrap/lib/input');
var Glyphicon = require('react-bootstrap/lib/glyphicon');
//var Button = require('react-bootstrap/lib/button');
var Button = require('react-progress-button');

var auth = require('../../utils/auth');
var Error = require('../Common/Errors');

module.exports = React.createClass({

	mixins: [History],

	getInitialState: function() {
		return {
			error: false,
			errorMsg: '登录信息不正确'
		}
	},

	handleLogin: function(event) {
		event.preventDefault();

		const phone = this.refs.phone.getValue();
		const pass = this.refs.pass.getValue();

		this.refs.button.loading();

		auth.login(phone, pass, function(loggedIn, status) {

		    if (!loggedIn) {
		    	this.refs.button.error();
		    	return this.setState({ error: true, errorMsg: Error.getMsg(status)});
		    }
		    // const location = this.props.location;

		    // if (location.state && location.state.nextPathname) {
		    //     this.history.replaceState(null, location.state.nextPathname);
		    // } else {
		    //     this.history.replaceState(null, '/');
		    // }
		    this.refs.button.success();
		    this.history.replaceState(null, '/');

		}.bind(this));
	},

	render: function() {
		const title = (
			<h4>欢迎您登录PiPi</h4>
			);
		const mobileGlyphicon=<Glyphicon glyph="phone"/>;
		const passwordGlyphicon=<Glyphicon glyph="lock"/>;
		var errorMsg = <p className="error">{this.state.errorMsg}</p>;	
		
		return (
			<div className="login">
		        <Panel  
		          className="col-md-4 col-md-offset-4"
		          bsStyle="default">
		          {title}
		            <form>
		                <Input 
		                	type="tel" 
		                	ref="phone" 
		                	placeholder="手机"
		                	hasFeedback 
		                	feedbackIcon={mobileGlyphicon} 
		                />
		                <Input 
		                	type="password" 
		                	ref="pass" 
		                	placeholder="密码" 
		                	hasFeedback 
		                	feedbackIcon={passwordGlyphicon} 
		                />
		                <Button 
		                	bsStyle="info" 
		                	block 
		                	ref='button'
		                	onClick={this.handleLogin}>
		                	登录
		                </Button>
		                <p id="registrationLink"><Link to="/register">我要注册</Link></p>
		                {this.state.error && errorMsg}
		            </form>
		        </Panel>
	        </div>
			);
	}
})
