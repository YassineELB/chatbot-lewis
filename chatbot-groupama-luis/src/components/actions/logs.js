import React from 'react';

import Log from './log.js';

const axios = require('axios');
const setTimer = require('../../utils.js').setTimer

const config = require('../../config/luis_config.js');

export default class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      utterances: []
    }
  }

  componentWillMount() {
    /* Unfortunately it seems there is no API GET call that lets us get all recent utterances without specifying an intent's ID
     * Since all utterances get pre-associated, we'll have to do one call per intent to get all the sentences */
    setTimer(2000)
      .then(function() {
        return axios.get(config.luisGetLabelsPerIntentUrl);
      })
      .then(function (response) {
        /* handle success */
        /* We get all the keys from the response, which are the intents' GUID */
        return Object.keys(response.data);
      })
      .then(guids => {
        /* For each GUID, we call the API to get the utterances pre-associated to said intent */
        const promises = guids.map(function(guid) {
          return axios.get(`${config.luisGetIntentsBaseUrl}/${guid}/suggest`, config.luisCallConfig)
            .then(function (response) {

              let array = [];
              for (let item of response.data) {

                let values = []
                for (let intents of item.intentPredictions) {
                  values.push([`${intents.name}`, `${intents.score}`])
                }

                array.push([item.text, values]);
              }

              return array;
            })
        })

        /* Here we create an Array by resolving the Promises we got above, and flatten the result to get all utterances that need to be sorted */
        const newArray = Promise.all(promises)
          .then(function(results) {
            return results;
          })
          .then(function(array) {
            return array.flat(1);
          })

        return newArray;
      })
      .then(array => {
        this.setState({utterances: array});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div className="logs-array action-element">
        <div className="title">Reclassement des occurences</div>
        {Array.from(this.state.utterances).map(utterance => <Log utterance={utterance}/>)}
      </div>
    );
  }
}
