import React, { Component } from 'react'
import { Container, Card, Label, Segment, List, Message, Button, Grid } from 'semantic-ui-react'

export default class DrugView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: this.props.name,
        namesCode: this.props.namesCode,
        namesBrand: this.props.namesBrand,
        namesGeneric: this.props.namesGeneric,
        molecularMechanisms: this.props.molecularMechanisms,
        developmentStatusSummaries: this.props.developmentStatusSummaries,
    }
  }
  render() {
    return (
        <Container centered fluid>
            <Grid centered>
                <Grid.Row>
                    {/* This is to provide spacing */}
                </Grid.Row>
                <Grid.Row>
                <Button
                    onClick={this.props.backToSearch}
                    >Back to Search
                </Button>
                </Grid.Row>
                <Grid.Row>
                
                    <Card>
                        <Card.Header>
                            {this.state.name}
                        </Card.Header>
                        <Label>Names Code</Label>
                        <List>
                            {this.state.namesCode.map(name => {
                                return <List.Item>
                                    {name}
                                </List.Item>
                            })}
                        </List>
                        <Label>Names Brand</Label>
                        <List>
                            {this.state.namesBrand.map(name => {
                                return <List.Item>
                                    {name}
                                </List.Item>
                            })}
                        </List>
                        <Label>Names Generic</Label>
                        <List>
                            {this.state.namesGeneric.map(name => {
                                return <List.Item>
                                    {name}
                                </List.Item>
                            })}
                        </List>
                        <Label>Molecular Mechanisms</Label>
                        <List>
                            {this.state.molecularMechanisms.map(mechanism => {
                                return <List.Item>
                                    {mechanism.name}
                                </List.Item>
                            })}
                        </List>
                        <Segment>
                            {this.state.developmentStatusSummaries.map(status => {
                                return (
                                    <Container>
                                        <Message>
                                            <Message.Header>Condition</Message.Header>
                                            <p>{status.condition}</p>
                                        </Message>
                                        <Message>
                                            <Message.Header>Highest Phase</Message.Header>
                                            <p>{status.phaseHighest}</p>
                                        </Message>
                                        <Message>
                                            <Message.Header>Condition in Active Development?</Message.Header>
                                            <p>{status.conditionInActiveDevelopment}</p>
                                        </Message>
                                        <Message>
                                            <Message.Header>Year</Message.Header>
                                            <p>{status.year}</p>
                                        </Message>
                                        <Message>
                                            <Message.Header>Organizations:</Message.Header>
                                            <Message.List>
                                                {status.organizations.map(org => {
                                                    return <Message.Item>
                                                        {org.name}
                                                    </Message.Item>
                                                })}
                                            </Message.List>
                                        </Message>
                                        <Message>
                                            <Message.Header>Administration Routes:</Message.Header>
                                            <Message.List>
                                                {status.administrationRoutes.map(route => {
                                                    return <Message.Item>
                                                        {route.name}
                                                    </Message.Item>
                                                })}
                                            </Message.List>
                                        </Message>
                                    </Container>
                                )
                            })}
                        </Segment>
                    </Card>
                </Grid.Row>
            </Grid>
        </Container>
    )
  }
}