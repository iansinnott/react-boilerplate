var React  = require('react'),
    Router = require('react-router'),
    { Link, Route, RouteHandler, DefaultRoute } = Router;

require('./App.styl');

require('./react-logo.png'); // Used as a bg image in stylus

var readme = { __html: require('../../README.md') };
var resources = { __html: require('./resources.md') };

var App = React.createClass({
  render() {
    return (
      <div className="app">
        <div className="banner">
          <h1>React<br/>Boilerplate</h1>
        </div>
        <div className="container">
          <nav>
            <Link to="readme">Readme</Link>
            <Link to="resources">Resources</Link>
            <Link to="feed">Feed</Link>
          </nav>
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

var Readme = React.createClass({
  render() {
    return <div className='readme' dangerouslySetInnerHTML={ readme }/>;
  }
});

var Resources = React.createClass({
  render() {
    return <div className='resources' dangerouslySetInnerHTML={ resources }/>;
  }
})

var Feed = React.createClass({
  render() {
    var tweets = [
      { text: 'Tweets about react!' },
      { text: "So much win when you're tweeting about react" },
      { text: "Gotta love dem tweets 'marite?" }
    ].map( (tweet, i) => <div className='tweet' key={i}>{tweet.text}</div> );

    return (
      <div className="feed">
        <h1>Feed</h1>
        <p>A bunch of tweets about react</p>
        <div className="tweets">
          { tweets }
        </div>
      </div>
    );
  }
});

module.exports = { App, Readme, Resources, Feed };

