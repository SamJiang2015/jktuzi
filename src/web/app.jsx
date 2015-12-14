var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var Main = require('./components/Main/Main');
var auth = require('./utils/auth');
var Register = require('./components/Register/Register');
var Login = require('./components/Login/Login');
var Logout = require('./components/Logout/Logout');
var Groups = require('./components/Group/Groups');
var About = require('./components/About/About');
var Intro = require('./components/Intro/Intro');
var TraineeInfo = require('./components/TraineeInfo/TraineeInfo');

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
	}
}

ReactDOM.render((
	<Router history={createBrowserHistory()}>
		<Route path='/' component={Main}>
			<Route path='groups' component={Groups} onEnter={requireAuth} />
			<Route path='login' component={Login} />
			<Route path='about' component={About} />
			<Route path='intro' component={Intro} />
			<Route path='logout' component={Logout} />
			<Route path='register' component={Register} />
			<Route path='myInfo' component={TraineeInfo} onEnter={requireAuth} />			
		</Route>
	</Router>),
	document.getElementById('app') 
	);

 