import React from 'react';

const axios = require('axios');

const config = require('../../config/luis_config.js');

export default class AppStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastTrained: null,
      lastPublished: null
    }
  }

  componentDidMount() {
    axios.get(config.luisGetAppStatusUrl, config.luisCallConfig)
      .then(function (response) {
        /* handle success */
        const data = response.data;
        const lastVersionData = data[data.length-1];

        return lastVersionData;
      })
      .then(lastVersionData => {
        this.setState({lastTrained: lastVersionData.lastTrainedDateTime, lastPublished: lastVersionData.lastPublishedDateTime});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div className='summary-cell summary-cell-row-1'>
        <div className='title'>Appstatus</div>
        <div id='status-content'>
          <div className='title'>Last trained:</div>
          <div>{this.state.lastTrained}</div>
          <div className='title'>Last published:</div>
          <div>{this.state.lastPublished}</div>
        </div>
      </div>
    );
  }
}
