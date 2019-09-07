import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            open={false}
            onSearchChange={this.props.handleSearchTermChange}
            placeholder='Search by drug name or mechanism...'
            value={this.props.searchValue}
          />
        </Grid.Column>
      </Grid>
    )
  }
}