import React, { Component } from 'react'
import { Message, Container, Button, Grid } from 'semantic-ui-react'

export default class MechanismView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        drugNames: this.props.drugNames
    }
  }
  render() {
    return (
        <Container centered fluid>
            <Grid centered>
                <Grid.Row>
                    {/* This is to add padding */}
                </Grid.Row>
                <Grid.Row>
                    <Button
                        onClick={this.props.backToSearch}
                    >Back to Search
                    </Button>
                </Grid.Row>
                <Grid.Row>
                    <Message>
                        <Message.Header>Associated Drugs:</Message.Header>
                        <Message.List>
                            {this.state.drugNames.map(name => {
                                return <Message.Item>
                                    {name}
                                </Message.Item>
                            })}
                        </Message.List>
                    </Message>
                </Grid.Row>
          </Grid>
      </Container>
    )
  }
}