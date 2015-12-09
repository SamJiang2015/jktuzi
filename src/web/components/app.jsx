var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var Main = require('./Main/Main');
var auth = require('./auth');
var Register = require('./Register/Register');
var Login = require('./Login/Login');
var Logout = require('./Logout/Logout');
var TestContent = require('./TestContent');

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
	}
}

ReactDOM.render((
	<Router history={createBrowserHistory()}>
		<Route path='/' component={Main}>
			<IndexRoute component={Register} />
			<Route path='login' component={Login} />
			<Route path='logout' component={Logout} />
			<Route path='TestContent' component={TestContent} onEnter={requireAuth} />
		</Route>
	</Router>),
	document.getElementById('app') 
	);

 