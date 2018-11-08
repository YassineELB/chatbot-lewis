import React from 'react';

const axios = require('axios');

const config = require('../../config/luis_config.js');

export default class IntentsWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    axios.get(config.luisGetIntentsBaseUrl, config.luisCallConfig)
      .then(function (response) {
        /* handle success */
        const data = response.data;

        /* We got all intents, so we count them */
        return data.length;
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
        <div className='title'>Intents</div>
        <div>{this.state.count}</div>
      </div>
    );
  }
}
