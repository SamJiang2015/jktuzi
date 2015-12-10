var React = require('react');
var Link = require('react-router').Link;

var Panel = require('react-bootstrap/lib/panel');
var Input = require('react-bootstrap/lib/input');
var Glyphicon = require('react-bootstrap/lib/glyphicon');
var Button = require('react-bootstrap/lib/button');


module.exports = React.createClass({
	render: function() {
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
		                <Input type="text" placeholder="姓名" hasFeedback feedbackIcon={userGlyphicon} />            
		                <Input type="tel" placeholder="手机" hasFeedback feedbackIcon={mobileGlyphicon} />
		                <Input type="password" placeholder="设定密码" hasFeedback feedbackIcon={passwordGlyphicon} />
		                <Input type="password" placeholder="确认密码" hasFeedback feedbackIcon={passwordGlyphicon} />
		                <Button bsStyle="info" block>现在加入</Button>
		                <p id="loginLink"><Link to="/login">我要登录</Link></p>
		            </form>
		        </Panel>
	        </div>
			);
	}
})
