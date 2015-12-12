var React = require('react');
var Link = require('react-router').Link;
var _=require('underscore');

var Panel = require('react-bootstrap/lib/panel');
var Input = require('react-bootstrap/lib/input');
var Glyphicon = require('react-bootstrap/lib/glyphicon');
var Button = require('react-bootstrap/lib/button');

var auth = require('../../utils/auth');
var Login = require('../Login/Login');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			error: false,
			errorMsg: '',
			registered: false
		}
	},

	// this way user can click on 注册 again, 
  	componentWillReceiveProps: function(nextProps){
		this.setState({
			registered: false
		});
	},

	handleRegister: function(e) {
		e.preventDefault();

		var mobile = this.refs.mobile.getValue().trim();
		var name = this.refs.name.getValue().trim();
		var pass1 = this.refs.pass1.getValue();
		var pass2 = this.refs.pass2.getValue();
		var errorMsg;

		//verify user input
		if (name.trim().length<2) {
			errorMsg ='请核验您输入的名字';
		} else if (mobile.trim().length<11 || isNaN(mobile)) {
			errorMsg = '请核验您输入的手机号码';
		} else if (pass1.trim().length<6) {
			errorMsg = '密码不能少于6位';
		} else if (pass1.trim() !== pass2.trim()) {
			errorMsg = '两次输入的密码不一致';
		}

		if (errorMsg) {
			this.setState({
				error: true,
				errorMsg: errorMsg
			})
		} else {
			// user inputs are okay; try hitting the DB to create an account
			auth.register(mobile, name, pass1, function(succeeded) {
		    if (!succeeded) {
		    	return this.setState({ 
		    		error: true,
		    		errorMsg: '注册未成功。请稍候再试。',
		    		registered: false
		    	});
		    } else {
		    	return this.setState({
		    		registered: true
		    	})
		    }
		}.bind(this));
		}
	},

	renderError: function() {
		if (this.state.error) {
			return (html=<p className="error">{this.state.errorMsg}</p>);
		} else {
			return null;
		}
	},

	renderUnregistered: function() {
		const title = (
			<h4>加入PiPi, 开始轻松的健康生活</h4>
			);
		const mobileGlyphicon=<Glyphicon glyph="phone"/>;
		const passwordGlyphicon=<Glyphicon glyph="lock"/>;
		const userGlyphicon=<Glyphicon glyph="user"/>;

		return (
			<div className="register">
		        <Panel  
		          className="col-md-4 col-md-offset-4"
		          bsStyle="default">
		          {title}
		            <form>
		                <Input type="text" ref="name" placeholder="姓名" hasFeedback feedbackIcon={userGlyphicon} />            
		                <Input type="tel" ref="mobile" placeholder="手机" hasFeedback feedbackIcon={mobileGlyphicon} />
		                <Input type="password" ref="pass1" placeholder="设定密码" hasFeedback feedbackIcon={passwordGlyphicon} />
		                <Input type="password" ref="pass2" placeholder="确认密码" hasFeedback feedbackIcon={passwordGlyphicon} />
		                <Button bsStyle="info" block onClick={this.handleRegister}>现在加入</Button>
		                <p id="loginLink"><Link to="/login">我要登录</Link></p>
		                {this.renderError()}
		            </form>
		        </Panel>
	        </div>
			);
	},

	renderRegistered: function() {
		return (
  		<div className="register">
  			<p className="sysMessage">您已经注册成功，请登录PiPi</p>
    		<Login />
		</div>
			)
	},

	render: function() {
		var htmlResult;

		if (this.state.registered) {
			htmlResult = this.renderRegistered();
		} else {
			htmlResult = this.renderUnregistered();
		}

		return htmlResult;
	}
})
