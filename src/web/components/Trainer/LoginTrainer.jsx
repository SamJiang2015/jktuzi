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
			loading: false,
			error: false,
			errorMsg: '登录信息不正确'
		}
	},

	handleLogin: function(event) {
		event.preventDefault();

		const phone = this.refs.phone.getValue();
		const pass = this.refs.pass.getValue();

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
		    		this.history.replaceState(null, '/trainer');
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
		const title = (
			<h4>欢迎您登录PiPi</h4>
			);
		const mobileGlyphicon=<Glyphicon glyph="phone"/>;
		const passwordGlyphicon=<Glyphicon glyph="lock"/>;
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
		                	ref="phone" 
		                	placeholder="手机"
		                	defaultValue="18877777777"
		                	hasFeedback 
		                	feedbackIcon={mobileGlyphicon} 
		                />
		                <Input 
		                	type="password" 
		                	ref="pass" 
		                	placeholder="密码" 
		                	defaultValue="password"
		                	hasFeedback 
		                	feedbackIcon={passwordGlyphicon} 
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
