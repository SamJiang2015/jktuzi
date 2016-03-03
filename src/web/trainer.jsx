var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var createBrowserHistory = require('history/lib/createBrowserHistory');


var auth = require('./utils/auth');

var Main = require('./components/Trainer/MainTrainer');
var Login = require('./components/Trainer/LoginTrainer');
var Logout = require('./components/Trainer/LogoutTrainer');
var Groups = require('./components/Trainer/GroupsTrainer');
var GroupDetail = require('./components/Trainer/GroupDetailTrainer');
var Success = require('./components/Common/Success');

var RoleType = require('./utils/constants').RoleType;

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/trainer/login');
	}
}

ReactDOM.render((
	<Router history={createBrowserHistory()}>
		<Route path='/' component={Main}>
			<Route path='login' component={Login} />
			<Route path='logout' component={Logout} onEnter={requireAuth} />
			<Route path='groups' component={Groups} onEnter={requireAuth} />
			<Route path='groups/:id' component={GroupDetail} onEnter={requireAuth} />
			<Route path='success' component={Success} onEnter={requireAuth} />
		</Route>
	</Router>),
	document.getElementById('trainer') 
	);