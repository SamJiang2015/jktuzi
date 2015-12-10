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
			error: false,
			navExpanded: false
		}
	},

	handleToggle(navExpanded) {

		this.setState({
			navExpanded: navExpanded
		});
	},

	handleNavClick(e) {
		if (this.state.navExpanded) {
			this.setState({
				navExpanded: false
			});
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
				<Navbar.Toggle onClick={this.handleToggle} />
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
                	<LinkContainer to="/user-info">
                		<MenuItem eventKey={3.1}>注册信息</MenuItem>
            		</LinkContainer>
                	<LinkContainer to="/preference">
                		<MenuItem eventKey={3.1}>账户设置</MenuItem>
            		</LinkContainer>
                	<MenuItem divider />
                	<LinkContainer to="/logout">
                		<MenuItem eventKey={3.1}>退出登录</MenuItem>
            		</LinkContainer>
            	</NavDropdown>
        	</Nav>
		);
	},

	// right part of the navbar -- if the user is not logged in, render the login form
	renderNavbarItemsNotLoggedIn: function() {

		return (
            <Nav pullRight onClick={this.handleNavClick}>
                <LinkContainer to="/about"><NavItem eventKey={1}>关于PiPi</NavItem></LinkContainer>
                <LinkContainer to="/intro"><NavItem eventKey={2}>功能说明</NavItem></LinkContainer>
                <LinkContainer to="/register"><NavItem eventKey={3}>我要注册</NavItem></LinkContainer>   
        	</Nav>
		);
	},

	render: function() {
	   	return (
		    <div className="header">
        		<Navbar inverse fixedTop expanded={this.state.navExpanded} onToggle={this.handleToggle} id="mainPage-navbar">
	            	{this.renderNavbarHeader()}	
					<Navbar.Collapse>	            		
	            		{this.props.isLoggedIn? this.renderNavbarItemsLoggedIn():this.renderNavbarItemsNotLoggedIn()}
	            	</Navbar.Collapse>
		        </Navbar>
		    </div> );

	}

})