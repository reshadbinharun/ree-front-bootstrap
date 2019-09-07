import React, { Component } from 'react'
import { Container, Grid, Button } from 'semantic-ui-react'
import { BACKEND } from '../App'
import { fakeData } from '../testData/drugData';

const TEST_DATA_FILE = '../../testData/drugData.json'

/*

Random drug data is generated using this string -->
[
  '{{repeat(5)}}',
  {
    mainName: '{{lorem(1,"word")+integer(0,1000)}}',
    namesCode: 
    [
      '{{repeat(1,4)}}', '{{lorem(1, "word")+lorem(1, "word")}}'
    ],
    namesBrand:
    [
      '{{repeat(1,4)}}', '{{lorem(1, "word")+surname()}}'
    ],
    namesGeneric:
    [
      '{{repeat(1,4)}}', '{{lorem(1, "word")+surname()}}'
    ],
    molecularMechanism: 
    [
      '{{repeat(1,4)}}', 
      {
        name: '{{random("cold", "warm", "hot")+random(" press", " push", " pull", " moonwalk")}}'
      }
    ],
    developmentStatusSummary:
    [
      '{{repeat(1,2)}}',
      {
        condition: '{{random("stomach", "brain", "eye", "hair", "liver", "feet")+random(" tears", " balloons", " tickles", " ache", " laughter")}}',
      phaseHighest: '{{random("phaseI","phaseII","phaseIII","launched")}}',
      conditionInActiveDevelopment: '{{random("yes","no")}}',
      year: '{{random(1990, 2020)}}',
      organizations:
        [
          '{{repeat(1,3)}}',
          {
            name: '{{firstName()}}'
          }
        ],
        administrationRoutes: [
          '{{repeat(1,2)}}',
          {
            name: '{{random("oral", "IV", "nasal")+random(" spray", " pill", " injection")}}'
          }
        ]
      }
    ]
  }
]

... on https://www.json-generator.com/
*/

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
        drugFile: null
    }
    this.uploadDrugs = this.uploadDrugs.bind(this);
  }

  // CORS configuration requires data to be stringified
  uploadDrugs(e) {
    e.preventDefault();
    let data = JSON.stringify(fakeData);
    fetch(`${BACKEND}/uploadDrugs`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: data,
    }).then(
        async (res) => {
            if(res.status === 200) {
                let resolvedRes = await res.json();
                alert(resolvedRes.message)
            }
        }
    ).catch(
        error => alert(error) // Handle the error response object
    );
}
  render() {
    return (
      <Container>
        <Grid centered>
            <Grid.Row>
                {/* empty row to add top padding */}
            </Grid.Row>
                <Button 
                attached='left'
                onClick={this.props.testAPI}
                color='green'
                >
                    Test Server Connection...
                </Button>
                <Button
                color='purple'
                attached='right'
                onClick={this.uploadDrugs}
                >
                    Upload Test Drug Data...
                </Button>
            <Grid.Row>
                {/* empty row to add top padding */}                
            </Grid.Row>
        </Grid>
      </Container>
    )
  }
}