import React from 'react';

const axios = require('axios');
const Chart = require('chart.js');
const setTimer = require('../../utils.js').setTimer

const config = require('../../config/luis_config.js');

export default class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      utterances: []
    }
  }

  componentDidMount() {
    setTimer(1000)
      .then(function() {
        return axios.get(config.luisGetLabelsPerIntentUrl)
      })
      .then(function (response) {
        /* handle success */
        const data = response.data;

        /* We get all the keys from the response, which are the intents' GUID
         * Then we create an array with the keys and values, to replace the Object from the response */
        const keys = Object.keys(data);

        const array = [];
        keys.forEach((key) => array.push([key, data[key]]));

        return array;
      })
      .then(array => {
        /* For each key-value pair in our array, we call the API to get the intents' names instead of the GUID, and return them */
        const promises = array.map(function(value, key) {
          return axios.get(`${config.luisGetIntentsBaseUrl}/${value[0]}`, config.luisCallConfig)
            .then(function (result) {
              return result.data.name;
            });
        })

        /* Here we create an Array by resolving the Promises we got above, with the intents' names as keys, and their associated values */
        const newArray = Promise.all(promises).then(function(results) {
            return results;
          })
          .then(function (results) {
            return array.map((value, key) => [results[key], value[1]]);
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
    /* We prepare the data for our pie chart
     * Keys of this.state.utterances are the array's indexes, so value[0] is the intent's name, and value[1] are the intent's associated utterances */
    const data = {
      datasets: [{
        data: this.state.utterances.map((value, key) => value[1]),
        backgroundColor: this.state.utterances.map((value, key) => getRandomColor())
      }],
      labels: this.state.utterances.map((value, key) => value[0])
    }

    /* The syntax need by chart.js to create our pie chart: it will map the html element with "myChart" id to the configuration we just created */
    new Chart('myChart',{
      type: 'pie',
      data: data
    });

    return (
        <div id='pie'>
          <div className='title'>Répartition des occurences par intention</div>
          <canvas id='myChart'></canvas>
        </div>
    );
  }
}

/* Get a random Hexadecimal color */
function getRandomColor() {
  const letters = '0123456789ABCDEF';

  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
