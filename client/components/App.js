import React from 'react';
import 'font-awesome-webpack';
import style from './App.styl';

export const App = React.createClass({
  render() {
    return (
      <div className={style.App}>
        <h1>React Boilerplate</h1>
        <p>What you know about React?</p>
      </div>
    );
  },
});

