import React from 'react';

import Intent from './intent.js';
import Logs from './logs.js';

export default class Actions extends React.Component {
  render() {
    return (
      <div id="action" className="action">
        <Intent />
        <Logs />
      </div>
    );
  }
}
