import React from 'react';

const axios = require('axios');

const config = require('../../config/luis_config.js');

export default class Log extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      utterance: props.utterance[0],
      weights: props.utterance[1]
    }
  }

  handleClick(utterance, intent) {
    /* Warning: will not work with entities, only to associate utterances to intents! */
    const body = {
    	text: `${utterance}`,
    	intentName: `${intent}`,
    	entityLabels: []
    }

    console.log(intent + ' ... ' + utterance);

    axios.post(config.luisPostUtteranceToIntentUrl, body, config.luisCallConfig)
    .then(function (response) {
      // handle success
      //document.getElementById(`log-${utterance}`).style.display = 'none';
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  /* Render a dropdown list
   * The utterance is the sentence we received and which needs to be sorted and associated to the correct intent
   * The weights array follows this pattern: [[intent, weight], [intent, weight], [intent, weight], ...]
   *   As such,
   *    value[0] of an item is one of the intents of our app
   *    value[1] is the confidence score that LUIS associates to the fact that this utterance is linked to the intent
   * The button validates the chosen intent
   */
  render() {
    const utterance = this.state.utterance;

    return (
      <div className="log" id={`log-${utterance}`}>
        <div className="log-label">{utterance}</div>
        <div className="log-select">
          <select id={`selected-log-${utterance}`}>
            {this.state.weights.map((value, index) => <option key={value[0]} value={value[0]}>{value[0] + " " + value[1]}</option>)}
          </select>
        </div>
        <div className="log-button">
          <button type="button" onClick={() => this.handleClick(utterance, document.getElementById(`selected-log-${utterance}`).value)}>Choose</button>
        </div>
      </div>
    );
  }
}
