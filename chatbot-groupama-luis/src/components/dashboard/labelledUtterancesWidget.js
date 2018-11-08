import React from 'react';

const axios = require('axios');

const config = require('../../config/luis_config.js');

export default class LabelledUtterancesWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    axios.get(config.luisGetLabelsPerIntentUrl)
      .then(function (response) {
        /* handle success */
        const data = response.data;

        /* We get all the values (i.e. number of utterances associated to each intent) and calculate their sum */
        const values = Object.values(data);
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        return values.reduce(reducer);
      })
      .then(count => {
        this.setState({count: count});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div className='summary-cell summary-cell-row-2'>
        <div className='title'>Labelled utterances</div>
        <div>{this.state.count}</div>
      </div>
    );
  }
}
