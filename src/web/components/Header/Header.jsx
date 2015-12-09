var React = require('react');
var Link = require('react-router').Link;
var History = require('react-router').History;


// all the React Bootstrap components we are going to use
// for the header component
var Navbar = require('react-bootstrap/lib/navbar');
var Nav = require('react-bootstrap/lib/nav');
var NavItem = require('react-bootstrap/lib/navitem');
var NavDropdown = require('react-bootstrap/lib/navdropdown');
var MenuItem = require('react-bootstrap/lib/menuitem');
var Input = require('react-bootstrap/lib/input');
var Button = require('react-bootstrap/lib/button');
var Glyphicon = require('react-bootstrap/lib/glyphicon');

var auth = require('../auth');

module.exports = React.createClass({

	mixins: [History],

	getInitialState: function() {
		return {
			error: false
		}
	},

	handleSubmit: function(event) {
		event.preventDefault();

		const phone = this.refs.phone.value;
		const pass = this.refs.pass.value;

		auth.login(phone, pass, function(loggedIn) {
		    if (!loggedIn)
		    	return this.setState({ error: true });

		    	const location = this.props.location;

		    if (location.state && location.state.nextPathname) {
		        this.history.replaceState(null, location.state.nextPathname)
		    } else {
		        this.history.replaceState(null, '/')
		    }
		}.bind(this));
	},


	// left part of the navbar
	renderNavbarHeader: function() {
		return (
			<Navbar.Header>
				<Navbar.Brand>
	      			<Link to="/">
	          			PiPi健康生活
	      			</Link>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			);
	},

	// right part of the navbar -- if the user is logged in, render a few links 
	renderNavbarItems: function() {
		return (
            <Nav>
                <NavItem eventKey={1}>
                	<Link to="/groups">我的群</Link>
            	</NavItem>
                <NavItem eventKey={2}>
                	<Link to="/stat">打卡统计</Link>
            	</NavItem>          
                <NavDropdown eventKey={3} title={this.props.user.name + '教练'} id="navbar-dropdown">
                	<MenuItem eventKey={3.1}>
                		<Link to="/user-info">注册信息</Link>
                		</MenuItem>
                	<MenuItem eventKey={3.1}>
                		<Link to="/preference">账户设置</Link>
            		</MenuItem>
                	<MenuItem divider />
                	<MenuItem eventKey={3.1}>
                		<Link to="/logout">退出登录</Link>
            		</MenuItem>
            	</NavDropdown>
        	</Nav>
		);
	},

	// right part of the navbar -- if the user is not logged in, render the login form
	renderNavbarLoginForm: function() {

		const mobileGlyphicon=<Glyphicon glyph="phone"/>;
		const passwordGlyphicon=<Glyphicon glyph="lock"/>;

		return (
            <Navbar.Form pullRight onSubmit={this.handleSubmit}>
                <Input type="tel" ref="phone" placeholder="手机" hasFeedback feedbackIcon={mobileGlyphicon} />	
                <Input type="password" ref="pass" placeholder="密码" hasFeedback feedbackIcon={passwordGlyphicon} />
                <Button type="submit" bsStyle="success" onClick={this.props.handleLogin}>登录</Button>
            </Navbar.Form>
		);

	},

	render: function() {
	   	return (
		    <div className="header">
        		<Navbar inverse fixedTop id="mainPage-navbar">
	            	{this.renderNavbarHeader()}	
					<Navbar.Collapse>	            		
	            		{this.props.isLoggedIn? this.renderNavbarItems():this.renderNavbarLoginForm()}
	            	</Navbar.Collapse>
		        </Navbar>
		    </div> );

	}

})