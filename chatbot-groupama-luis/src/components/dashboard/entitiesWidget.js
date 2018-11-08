import React from 'react';

const axios = require('axios');

const config = require('../../config/luis_config.js');

export default class EntitiesWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    axios.get(config.luisGetEntitiesBaseUrl, config.luisCallConfig)
      .then(function (response) {
        /* handle success */
        const data = response.data;

        /* We got all entities, so we count them */
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
        <div className='title'>Entities</div>
        <div>{this.state.count}</div>
      </div>
    );
  }
}
