const React  = require('react');

require('./App.styl');

require('font-awesome-webpack');

let App = React.createClass({
  render() {
    return (
      <div className="app container">
        <h1>React Boilerplate</h1>
        <p>What you know about React?</p>
      </div>
    );
  }
});

module.exports = App;

