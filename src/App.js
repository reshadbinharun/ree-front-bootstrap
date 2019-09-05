import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import SearchUnit from './components/SearchUnit';
import Results from './components/Results';

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

  /*
  App structure
    Pagination: on backend, sort then request first 20, and then page-th number of batch...
    Page No.
    Next Page
    Prev Page
    List that is clickable
  */
  render() {
    return (
      <div>
        <SearchUnit/>
        <Results/>
      </div>
    )
  }
}
