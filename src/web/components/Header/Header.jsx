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

// package that provides a react-router wrapper for react-bootstrap elements
var LinkContainer = require('react-router-bootstrap').LinkContainer;

var auth = require('../auth');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			error: false
		}
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
	renderNavbarItemsLoggedIn: function() {
		return (
            <Nav pullRight>
                <LinkContainer to="/groups"><NavItem eventKey={1}>我的群</NavItem></LinkContainer>
                <LinkContainer to="/trainees"><NavItem eventKey={2}>我的学员</NavItem></LinkContainer>
                <LinkContainer to="/stat"><NavItem eventKey={3}>打卡统计</NavItem></LinkContainer>   
                <NavDropdown eventKey={3} title={this.props.user + '教练'} id="navbar-dropdown">
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
	renderNavbarItemsNotLoggedIn: function() {

		return (
            <Nav pullRight>
                <LinkContainer to="/about"><NavItem eventKey={1}>关于PiPi</NavItem></LinkContainer>
                <LinkContainer to="/intro"><NavItem eventKey={2}>功能说明</NavItem></LinkContainer>
                <LinkContainer to="/register"><NavItem eventKey={3}>我要注册</NavItem></LinkContainer>   
        	</Nav>
		);
	},

	render: function() {
	   	return (
		    <div className="header">
        		<Navbar inverse fixedTop id="mainPage-navbar">
	            	{this.renderNavbarHeader()}	
					<Navbar.Collapse>	            		
	            		{this.props.isLoggedIn? this.renderNavbarItemsLoggedIn():this.renderNavbarItemsNotLoggedIn()}
	            	</Navbar.Collapse>
		        </Navbar>
		    </div> );

	}

})