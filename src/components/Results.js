import React, { Component } from 'react'
import { Container, Card } from 'semantic-ui-react'
import { BACKEND } from "../App";

const drugDomain = 'Drug';
const mechanismDomain = 'Mechanism'

export default class Results extends Component {
    constructor(props) {
        super(props);
        this.mapToResults = this.mapToResults.bind(this);
        this.fetchResult = this.fetchResult.bind(this);
    }
    fetchResult(e, itemId, itemDomain) {
        let isDrug = itemDomain === drugDomain;
        let route = isDrug ? 'getDrugInfo' : 'getMechanismInfo'
        e.preventDefault();
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        fetch(`${BACKEND}/${route}`, {
            method: 'post',
            headers: headers,
            body: JSON.stringify({id: itemId})
        }).then(async res => {
            let resolvedRes = await res;
            resolvedRes = await resolvedRes.json()
            let payload = isDrug ? resolvedRes && resolvedRes.drugInfo : resolvedRes && resolvedRes.mechanismInfo
            console.log(payload)
            this.props.handleSelectItem(e, payload, itemDomain)
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
        if (!items.length) {
            return (
                <Container>
                    <Card fluid>
                        <Card.Content>
                            <Card.Description>Search Results will appear here</Card.Description>
                        </Card.Content>
                    </Card>
                </Container>
            )
        }
        return (
            <Container>
                {items && items.map(item => {
                    let color = item.domain === 'Drug'? '#E8B1FB' : '#B1FBBC'
                    return (
                        <Card
                            fluid
                            style={{"background-color": color}}
                        >
                            <Card.Content
                                value={item}
                                onClick={(e) => { this.fetchResult(e, item.relationalId, item.domain) }}
                                content={item.name}
                            >
                                <Card.Header>
                                    {item.name}
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
        const items = this.props.results;
        return (
            <Container centered>
                {this.mapToResults(items)}
            </Container>
        )
    }
}