var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var Main = require('./Main/Main');
var auth = require('./auth');

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
	}
}

ReactDOM.render((
	<Router history={createBrowserHistory()}>
		<Route path='/' component={Main}>
		</Route>
	</Router>),
	document.getElementById('app') 
	);

 