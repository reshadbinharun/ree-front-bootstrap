import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import SearchUnit from './components/SearchUnit';
import Results from './components/Results';
import { Segment, Container } from 'semantic-ui-react'
import Test from './components/Test';
import DrugView from './components/DrugView';
import MechanismView from './components/MechanismView';

export const BACKEND = process.env.REACT_APP_BACKEND || 'http://localhost:8080';

// page views
const SEARCH = 'Search';
const DRUG = 'Drug';
const MECHANISM = 'Mechanism';

const RESULTS_PER_PAGE = process.env.REACT_APP_RESULTS_PER_PAGE || 2;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      // stores pageNum, searchTerms from SearchUnit to make requests to backend and get data to populate results
      currentPage: 1,
      totalPages: 1,
      searchTerms: '',
      results: [],
      view: SEARCH,
      itemPayload: null,
      searchMode: false, // TODO: used in any way?
      loading: false,
    };
    this.handleSearchTermsChange = this.handleSearchTermsChange.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.getSearchResultsPage = this.getSearchResultsPage.bind(this);
    this.testAPI = this.testAPI.bind(this);
    this.backToSearch = this.backToSearch.bind(this);
    this.handlePrevMove = this.handlePrevMove.bind(this);
    this.handleNextMove = this.handleNextMove.bind(this);
  }

  backToSearch(e) {
    e.preventDefault();
    this.setState({
      view: SEARCH
    })
  }
  async testAPI(e) {
    e.preventDefault();
    await fetch(`${BACKEND}/test`).then(async res => {
      let resolvedRes = await res.json();
      alert(`Server says ${resolvedRes.message}`);
    })
  }

  async getSearchResultsPage(searchTerms, pageNum) {
    console.log("sending currPage as", pageNum)
    let requestParams = {
      searchTerms: searchTerms,
      pageNum: pageNum,
      resultsPerPage: RESULTS_PER_PAGE,
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    fetch(`${BACKEND}/searchWithPage`, {
      method: 'post',
      headers: headers,
      body: JSON.stringify(requestParams),
    }).then(async res => {
      let resolvedRes = await res;
      resolvedRes = await resolvedRes.json();
      this.setState({
        results: resolvedRes && resolvedRes.responseObj.results,
        totalPages: resolvedRes && resolvedRes.responseObj.numPages,
        loading: false
      });
    })
  }

  handleSelectItem(e, itemPayload, itemDomain) {
    e.preventDefault();
    this.setState({
      itemPayload: itemPayload,
      view: itemDomain
    })
  }

  handleSearchTermsChange(e, searchObject) {
    let searchTerms = searchObject.value
    if (searchTerms !== this.state.searchTerms) {
      // reset page counts
      console.log("resetting currPage")
      this.setState({
        currentPage: 1,
        totalPages: 1
      })
    }
    e.preventDefault();
    if (!searchTerms) {
      this.setState({
        searchMode: false,
        searchTerms: searchTerms,
        results: []
      })
    } else {
      this.setState({
        searchTerms: searchTerms,
        searchMode: true,
        loading: true
      }, async () => {
        await this.getSearchResultsPage(this.state.searchTerms, this.state.currentPage);
      })
    }
  }

  handleNextMove(e) {
    e.preventDefault();
    let currPage = this.state.currentPage + 1;
    if (currPage > this.state.totalPages) {
      alert('You\'ve reached end of results!');
      return;
    }
    this.setState({
      currentPage: currPage
    }, async () => {
      await this.getSearchResultsPage(this.state.searchTerms, this.state.currentPage);
    })
  }

  handlePrevMove(e) {
    e.preventDefault();
    let currPage = this.state.currentPage - 1;
    if (currPage < 1) {
      alert('You\'ve reached beginning of results!');
      return;
    }
    this.setState({
      currentPage: currPage
    }, async () => {
      await this.getSearchResultsPage(this.state.searchTerms, this.state.currPage);
    })
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
        <Container>
            {process.env.REACT_APP_MODE === 'test' ? 
            <Segment>
              <Test
                testAPI={this.testAPI}
              />
              </Segment>
              : null}
          <Segment>
            <SearchUnit
              handleSearchTermChange={this.handleSearchTermsChange}
              searchValue={this.state.searchTerms}
            />
          </Segment>
          <Segment>
            <Results
              loading={this.state.loading}
              results={this.state.results}
              handleSelectItem={this.handleSelectItem}
              handleNextMove={this.handleNextMove}
              handlePrevMove={this.handlePrevMove}
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
            />
          </Segment>
        </Container>
      </div>
    switch (this.state.view) {
      case (SEARCH):
        return searchView;
      case (DRUG):
        //TODO: drug view
        return <DrugView
          //props
          name={this.state.itemPayload.name}
          namesCode={this.state.itemPayload.namesCode}
          namesBrand={this.state.itemPayload.namesBrand}
          namesGeneric={this.state.itemPayload.namesGeneric}
          molecularMechanisms={this.state.itemPayload.molecularMechanism}
          developmentStatusSummaries={this.state.itemPayload.developmentStatusSummary}
          backToSearch={this.backToSearch}
        />
      case (MECHANISM):
        //TODO: mechanism view
        return <MechanismView
        //props
        drugNames={this.state.itemPayload.drugs}
        backToSearch={this.backToSearch}
        />;
      default:
        return searchView;
    }
  }
}
