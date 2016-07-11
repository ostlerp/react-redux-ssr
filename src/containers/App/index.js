import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <p>React Reduc SSR</p>
      </div>
    );
  }
}

export default connect()(App);
