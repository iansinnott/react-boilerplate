'use strict';

/**
 * The App. This is the global component within which all other components are
 * nested. As such global requirements are addedd here, such as font-awesome.
 * Also note that the App.styl file is the global stylus file as it applies to
 * the root component.
 *
 * Note: Since this is a simple example app all components are defined within
 * this file, however in a real project we would likely separate these into
 * separate components.
 */

var React  = require('react'),
    Router = require('react-router'),
    { Link, RouteHandler } = Router;

// Global stylesheet
require('./Layout.styl');

require('font-awesome-webpack');

var readme = { __html: require('../../README.md') };
var resources = { __html: require('./resources.md') };

var Layout = React.createClass({
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

/**
 * Loads the README.md file as html within the component.
 */
var Readme = React.createClass({
  render() {
    return (
      <div className='readme markdown' dangerouslySetInnerHTML={ readme }/>
    );
  }
});

/**
 * Like Readme this component also simply loads a markdown file into the react
 * component.
 */
var Resources = React.createClass({
  render() {
    return (
      <div className='resources markdown' dangerouslySetInnerHTML={ resources }/>
    );
  }
});

/**
 * A feed of tweets relating to react.
 */
var Feed = React.createClass({
  render() {
    var tweets = [
      { text: 'Tweets about react!' },
      { text: "So much win when you're tweeting about react" },
      { text: "Gotta love dem tweets 'marite?" },
      { text: "Just kidding, these aren't real tweets..." }
    ].map((tweet, i) => {
      return (
        <div className='tweet' key={i}>
          <i className='fa fa-twitter'/>
          {tweet.text}
        </div>
      );
    });

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

module.exports = { Layout, Readme, Resources, Feed };

