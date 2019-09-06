import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import SearchUnit from './components/SearchUnit';
import Results from './components/Results';

export const BACKEND = process.env.BACKEND || 'localhost:4000';

const compName = 'App_LS';

// page views
const SEARCH = 'Search';
const DRUG = 'drug';
const MECHANISM = 'mechanism';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      // stores pageNum, searchTerms from SearchUnit to make requests to backend and get data to populate results
      pageNum: null,
      searchTerms: '',
      results: [],
      view: SEARCH,
      itemPayload: null,
      searchMode: false, // TODO: used in any way?
    };
    this.componentCleanup = this.componentCleanup.bind(this);
    this.handleSearchTermsChange = this.handleSearchTermsChange.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  async getSearchResults(searchTerms, pageNum) {
    let requestParams = {
      searchTerms: searchTerms,
      pageNum: pageNum
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    fetch(`${BACKEND}/getSearchResults`, {
      method: 'post',
      headers: headers,
      body: requestParams,
    }).then(async res => {
      let resolvedRes = await res;
      resolvedRes = await resolvedRes.json()
      this.setState({
        results: resolvedRes && resolvedRes.results
      });
    })
  }

  handleSelectItem(e, itemPayload, itemDomain) {
    // TODO: get info about item and select correct view
  }

  handleSearchTermsChange(e, searchObject) {
    let searchTerms = searchObject.value
    e.preventDefault();
    if (!searchTerms) {
      this.setState({
        searchMode: false,
        searchTerms: searchTerms,
      })
    } else {
      this.setState({
        searchTerms: searchTerms,
        searchMode: true
      }, async () => {
        //make fetch call to get results
        await this.getSearchResults(this.state.searchTerms, this.state.pageNum);
      })
    }
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
    let searchView =
      <div>
        <SearchUnit
          handleSearchTermsChange={this.handleSearchTermsChange}
        />
        <Results
          results={this.state.results}
          handleSelectItem={this.handleSelectItem}
        />
      </div>
    switch (this.state.view) {
      case (SEARCH):
        return searchView;
      case (DRUG):
        //TODO: drug view
        return null;
      case (MECHANISM):
        //TODO: mechanism view
        return null;
      default:
        return searchView;
    }
  }
}
