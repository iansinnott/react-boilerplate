import React from 'react';

import styles from './App.styl';

import 'font-awesome-webpack';

export default React.createClass({
  render() {
    return (
      <div className={styles.App}>
        <h1>React Boilerplate</h1>
        <p>What you know about React?</p>
      </div>
    );
  },
});

