import React, { Component } from 'react'
import { Container, List} from 'semantic-ui-react'

const mockItems = [
    {
    id: 1,
    domain: 'drug',
    value: 'drug A'
    },
    {
    id: 2,
    domain: 'drug',
    value: 'drug B'
    },
    {
    id: 3,
    domain: 'mechanism',
    value: 'mechanism A'
    },
]

export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.mapToResults = this.mapToResults.bind(this);
        this.fetchResult = this.fetchResult.bind(this);
    }
    fetchResult() {
        return;
    }
    /*
    interface item {
        id;
        domain;
        value;
    }
    */
    mapToResults(items) {
        return (
        <List>
            {items.map(item => {
                return (
                    <List.Content
                        onClick={(e, item) => {this.fetchResult()}}
                        content={item.value}
                    >
                        <List.Header>
                            {item.value}
                        </List.Header>
                        <List.Description>
                            {item.domain}
                        </List.Description>
                    </List.Content>
                )
            })}
        </List>
        )
    }
    render() {
        return (
            <Container centered>
                {this.mapToResults(mockItems)}
            </Container>
        )
    }
}