import React, { Component } from 'react'
import { Search, Grid} from 'semantic-ui-react'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: 'Default',
      onSearchMode: true,
    }
  }
  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search 
            open={false}
            onSearchChange={this.state.onSearchMode}
            placeholder='Search by key words...'
            value={this.state.searchValue}
          />
        </Grid.Column>
      </Grid>
    )
  }
}