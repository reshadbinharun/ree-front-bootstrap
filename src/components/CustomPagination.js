import React, { Component } from 'react'
import { Container, Grid, Button } from 'semantic-ui-react'

export default class CustomPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
        totalPages: this.props.totalPages,
        currentPage: this.props.currentPage
    }
    console.log("props in page nav", this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
        totalPages: nextProps.totalPages,
        currentPage: nextProps.currentPage
    });  
  }
  render() {
      let pageDisp = `${this.state.currentPage} / ${this.state.totalPages}`
    return (
      <Container>
        <Grid centered fluid>
            <Grid.Row>
            {/* Added for padding */}
            </Grid.Row>
        <Button.Group>
            <Button
                color='green'
                onClick={this.props.handlePrevMove}
            >Previous Page</Button>
            <Button>{pageDisp}</Button>
            <Button
                color='purple'
                onClick={this.props.handleNextMove}
            >Next Page</Button>
        </Button.Group>
            <Grid.Row>
                {/* Added for padding */}
            </Grid.Row>
        </Grid>
      </Container>
    )
  }
}