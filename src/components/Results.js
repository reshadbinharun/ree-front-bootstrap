import React, { Component } from 'react'
import { Container, Card } from 'semantic-ui-react'
import { BACKEND } from "../App";

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

const domainFetchMap = new Map();
domainFetchMap['drug'] = 'getDrug';
domainFetchMap['mechanism'] = 'getMechanism';

export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.mapToResults = this.mapToResults.bind(this);
        this.fetchResult = this.fetchResult.bind(this);
    }
    fetchResult(e, itemId, itemDomain) {
        e.preventDefault();
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        fetch(`${BACKEND}/${domainFetchMap[itemDomain]}`, {
            method: 'post',
            headers: headers,
        }).then(async res => {
            let resolvedRes = await res;
            resolvedRes = await resolvedRes.json()
            this.setState({
                results: resolvedRes && resolvedRes.results
            });
        })
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
            <Container>
                {items.map(item => {
                    return (
                        <Card
                            fluid
                        >
                            <Card.Content
                                onClick={(e, item) => { this.fetchResult(e, item.id, item.domain) }}
                                content={item.value}
                            >
                                <Card.Header>
                                    {item.value}
                                </Card.Header>
                                <Card.Description>
                                    {item.domain}
                                </Card.Description>
                            </Card.Content>
                        </Card>

                    )
                })}
            </Container>
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