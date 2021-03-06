var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var Main = require('./components/Main/Main');
var auth = require('./utils/auth');

var Login = require('./components/Login/Login');
var Logout = require('./components/Logout/Logout');
var About = require('./components/About/About');
var Intro = require('./components/Intro/Intro');

var Register = require('./components/Register/Register');
var TraineeInfo = require('./components/TraineeInfo/TraineeInfo');

var Cards = require('./components/Card/Cards');
var Groups = require('./components/Group/Groups');
var Requests = require('./components/Request/Requests');
var Success = require('./components/Common/Success');


function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
	}
}

ReactDOM.render((
	<Router history={createBrowserHistory()}>
		<Route path='/' component={Main}>
			<Route path='login' component={Login} />
			<Route path='about' component={About} />
			<Route path='intro' component={Intro} />
			<Route path='logout' component={Logout} />
			<Route path='register' component={Register} />
			<Route path='myInfo' component={TraineeInfo} onEnter={requireAuth} />			
			<Route path='groups' component={Groups} onEnter={requireAuth} />
			<Route path='cards' component={Cards} onEnter={requireAuth} />
			<Route path='requests' component={Requests} onEnter={requireAuth} />
			<Route path='success' component={Success} onEnter={requireAuth} />
		</Route>
	</Router>),
	document.getElementById('app') 
	);

 