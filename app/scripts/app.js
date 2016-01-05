var React = require('react');
var Router = require('react-router');
var Route = Router.Route
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
var RouteNotFound = Router.NotFoundRoute;
var Home = require('./home.js');
var About = require('./about.js');
var Tags = require('./tags.js');
var Question = require('./question.js');

var App = React.createClass({
    render: function() {
        return (
            <div className='container'>
                <div className='row header'>
                    <div className="title ten columns">
                        <h3>Grey Matter Quiz</h3>
                    </div>
                    <div className="about two columns">
                        <Link to='about'>About</Link>
                    </div>
                </div>
                <RouteHandler/>
            </div>
        );
}});

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Home}/>
        <RouteNotFound handler={Home}/>
        <Route handler={About} name='about'/>
        <Route name='question' handler={Home} path='question/:id'/>
        <Route handler={Tags} name='tag'/>
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
