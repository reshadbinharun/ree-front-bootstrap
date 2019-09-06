import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import SearchBar from './SearchBar'
import PageNav from './PageNav'

export default class SearchUnit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Grid>
          <Grid.Column width={8}>
            <SearchBar
              handleSearchTermChange={this.props.handleSearchTermChange}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <PageNav />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}