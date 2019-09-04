import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';

export const BACKEND = process.env.BACKEND || 'localhost:4000';

const compName = 'App_LS';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
    };
    this.componentCleanup = this.componentCleanup.bind(this);
  }

  componentCleanup() {
    sessionStorage.setItem(compName, JSON.stringify(this.state));
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
    const persistState = sessionStorage.getItem(compName);
    if (persistState) {
      try {
        this.setState(JSON.parse(persistState));
      } catch (e) {
        console.log("Could not get fetch state from local storage for", compName);
      }
    }
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}
