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
var Groups = require('./Group/Groups');
var About = require('./About/About');
var Intro = require('./Intro/Intro');

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
	}
}

ReactDOM.render((
	<Router history={createBrowserHistory()}>
		<Route path='/' component={Main}>
			<IndexRoute component={Groups} onEnter={requireAuth} />
			<Route path='login' component={Login} />
			<Route path='about' component={About} />
			<Route path='intro' component={Intro} />
			<Route path='logout' component={Logout} />
			<Route path='register' component={Register} />
			<Route path='groups' component={Groups} onEnter={requireAuth} />
		</Route>
	</Router>),
	document.getElementById('app') 
	);

 