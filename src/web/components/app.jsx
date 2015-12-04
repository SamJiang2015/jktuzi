var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var ChatRoom = require('./ChatRoom/ChatRoom');
var Main = require('./Main/Main');
var JoinChat = require('./JoinRoom/JoinRoom');


ReactDOM.render((
	<Router history={createBrowserHistory()}>
		<Route path='/' component={Main}>
			<Route path='join' component={JoinChat} />
			<Route path='chatroom' component={ChatRoom} />
		</Route>
	</Router>),
	document.getElementById('app') 
	);

 