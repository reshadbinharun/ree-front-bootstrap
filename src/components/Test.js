import React, { Component } from 'react'
import { Container, Grid, Button, Label, Form } from 'semantic-ui-react'
import { BACKEND } from '../App'
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
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleUpload(e) {
    e.preventDefault();
    let file = e.target.files[0];
    this.setState({
        drugFile: file
    })
  }
  uploadDrugs(e) {
    e.preventDefault();
    let data = new FormData();
    data.append('file', this.state.drugFile);
    console.log(data)
    fetch(`${BACKEND}/uploadDrugs`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: 
        {
            data
        }
    }).then(
        success => {
            console.log(success, "Successfully uploaded drug data!"); // Handle the success response object
        }
    ).catch(
        error => console.log(error) // Handle the error response object
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
              onClick={this.props.testAPI}
            >
              Test API
            </Button>
            <Grid.Row>
                <Form 
                    onSubmit={this.uploadDrugs}
                >
                    <Form.Field>
                        <Label pointing='down'>Upload drug information .json file...</Label>
                        <Grid.Row>
                            {/* empty row to add top padding */}                
                        </Grid.Row>
                        <input type="file" onChange={this.handleUpload} class="ui big purple center floated button"/>
                    </Form.Field>
                    <Button 
                        color="green" 
                        type='submit'
                    >
                        Upload
                    </Button>
                </Form>            
            </Grid.Row>
            <Grid.Row>
                {/* empty row to add top padding */}                
            </Grid.Row>
        </Grid>
      </Container>
    )
  }
}