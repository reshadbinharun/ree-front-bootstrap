import React, { Component } from 'react'
import { Grid, Container, Label, Button} from 'semantic-ui-react'

const mockPageNum = 1;

export default class PageNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: mockPageNum
        }
    }
  render() {
    return (
      <Container centered>
          <Grid centered>
            <Grid.Row>
            <Label>
                Page: {this.state.pageNum}
            </Label>
            </Grid.Row>
            <Grid.Row>
                <Button>
                    Next Page
                </Button>
            </Grid.Row>
            <Grid.Row>
                <Button>
                    Previos Page
                </Button>
            </Grid.Row>
          </Grid>
      </Container>
    )
  }
}