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

module.exports = React.createClass({

	getInitialState: function() {
		return {
			error: false,
			navExpanded: false
		}
	},

	handleToggle: function(navExpanded) {
		this.setState({
			navExpanded: navExpanded
		});
	},

	handleNavClick: function(e) {
		// if user clicked on a <span>, this is likely a dropdown menu within 
		// the nav menu, if so, cannot collapse the nav menu
		// Todo: is there a better way to tell than checking for 'span' ????
		if (e.target.nodeName.toLowerCase() !== 'span' && this.state.navExpanded) {
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
	      			<Link to="/admin/" onClick={this.handleNavClick}>
	          			PiPi健康生活管理员端
	      			</Link>
				</Navbar.Brand>
				<Navbar.Toggle  />
			</Navbar.Header>
			);
	},

	// right part of the navbar -- if the user is logged in, render a few links 
	renderNavbarItemsLoggedIn: function() {
		return (
           <Nav pullRight>
           		<LinkContainer to="/admin/"><NavItem eventKey={1}>欢迎您，{this.props.accountName + this.props.roleName}</NavItem></LinkContainer>
                <LinkContainer to="/admin/groups"><NavItem eventKey={2}>班级管理</NavItem></LinkContainer>
                <LinkContainer to="/admin/trainees"><NavItem eventKey={3}>学员管理</NavItem></LinkContainer>
            	<LinkContainer to="/admin/logout"><NavItem eventKey={4}>退出登录</NavItem></LinkContainer>
        	</Nav>);

	},
	// renderNavbarItemsLoggedIn: function() {
	// 	return (
 //            <Nav pullRight>
 //                <LinkContainer to="/groups"><NavItem eventKey={1}>我的群</NavItem></LinkContainer>
 //                <LinkContainer to="/trainees"><NavItem eventKey={2}>我的学员</NavItem></LinkContainer>
 //                <LinkContainer to="/stat"><NavItem eventKey={3}>打卡统计</NavItem></LinkContainer>   
 //                <NavDropdown eventKey={3} title={this.props.accountName + this.props.roleName} id="navbar-dropdown">
 //                	<LinkContainer to="/myInfo">
 //                		<MenuItem eventKey={3.1}>修改注册信息</MenuItem>
 //            		</LinkContainer>
 //                	<LinkContainer to="/preference">
 //                		<MenuItem eventKey={3.1}>账户设置</MenuItem>
 //            		</LinkContainer>
 //                	<MenuItem divider />
 //                	<LinkContainer to="/logout">
 //                		<MenuItem eventKey={3.1}>退出登录</MenuItem>
 //            		</LinkContainer>
 //            	</NavDropdown>
 //        	</Nav>
	// 	);
	// },

	// right part of the navbar -- if the user is not logged in, render the login form
	renderNavbarItemsNotLoggedIn: function() {

		return null;
	},

	render: function() {
	   	return (
		    <div className="header">
        		<Navbar 
        			inverse 
        			fixedTop 
        			expanded={this.state.navExpanded} 
        			onToggle={this.handleToggle} >
	            	{this.renderNavbarHeader()}	
					<Navbar.Collapse onClick={this.handleNavClick}>	            		
	            		{this.props.isLoggedIn? this.renderNavbarItemsLoggedIn():this.renderNavbarItemsNotLoggedIn()}
	            	</Navbar.Collapse>
		        </Navbar>
		    </div> );

	}

})