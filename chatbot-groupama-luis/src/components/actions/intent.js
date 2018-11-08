import React from 'react';

const axios = require('axios');

const config = require('../../config/luis_config.js');

export default class Intent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intents: []
    }
  }

  handleClick(value) {
    const body = {
      name: value
    }

    axios.post(config.luisPostIntentUrl, body, config.luisCallConfig)
      .then(function (response) {
        // handle success
        console.log(`Intent "${body.name}" created.`);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div className="intents action-element">
        <p className="title">Quelle entité souhaitez-vous créer?</p>
        <div className="intent-creation">
          <input type='text' id='entity-name-input' placeholder="Nom de l'entité"></input>
          <button type="button" onClick={() => this.handleClick(document.getElementById(`entity-name-input`).value)}>Créer l'entité</button>
        </div>
      </div>
    );
  }
}

// LIST OF INTENTS

// componentDidMount() {
//   axios.get('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/6a74e815-7edc-496d-a0ba-b66d4535bda6?subscription-key=9efa000497ce428893b193fc99c84f07&verbose=true&timezoneOffset=-360&q=jours')
//     .then(function (response) {
//       // handle success
//
//       let array = [];
//       for (let item of response.data.intents) {
//         array.push(item.intent);
//       }
//
//       return array;
//     })
//     .then(array => {
//       this.setState({intents: array});
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     });
// }

// render() {
//   return (
//     <div className="entities">
//       <p className="title">Quelle entité souhaitez-vous créer?</p>
//       <div>
//         <div>Entity name:</div>
//         <input type='text' name='entity-name-input' placeholder="Nom de l'entité"></input>
//       </div>
//       <select>{this.state.intents.map((value, key) => <option key={key} value={key}>{value}</option>)}</select>
//     </div>
//   );
// }
