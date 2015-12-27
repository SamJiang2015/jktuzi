var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var createBrowserHistory = require('history/lib/createBrowserHistory');


var auth = require('./utils/auth');

var Main = require('./components/Admin/MainAdmin');
var Login = require('./components/Admin/LoginAdmin');
var Logout = require('./components/Admin/LogoutAdmin');
var Groups = require('./components/Admin/GroupsAdmin');
var Trainees = require('./components/Admin/TraineesAdmin');
var Requests = require('./components/Admin/RequestsAdmin');
var Success = require('./components/Common/Success');

var RoleType = require('./utils/constants').RoleType;

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/admin/login');
	}
}

ReactDOM.render((
	<Router history={createBrowserHistory()}>
		<Route path='/admin' component={Main}>
			<Route path='login' component={Login} />
			<Route path='logout' component={Logout} onEnter={requireAuth} />
			<Route path='groups' component={Groups} onEnter={requireAuth} />
			<Route path='trainees' component={Trainees} onEnter={requireAuth} />
			<Route path='requests' component={Requests} onEnter={requireAuth} />
			<Route path='success' component={Success} onEnter={requireAuth} />
		</Route>
	</Router>),
	document.getElementById('admin') 
	);

 