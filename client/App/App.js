import React from 'react';
import 'font-awesome-webpack';
import styles from './App.styl';

export const App = React.createClass({
  render() {
    return (
      <div className={styles.App}>
        <h1>React Boilerplate</h1>
        <p>What you know about React?</p>
      </div>
    );
  },
});

