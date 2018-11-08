import React from 'react';

import Actions from './actions/actions.js';
import Dashboard from './dashboard/dashboard.js';

export default class Window extends React.Component {
  render() {
    return (
      <div className="window">
        <div className="window-header">
          <button type="button" className="window-header-button" onClick={() => toggleVisibilityForWindow("action")}>Actions</button>
          <button type="button" className="window-header-button" onClick={() => toggleVisibilityForWindow("dashboard")}>Dashboard</button>
        </div>
        <div className="window-body">
          <Actions />
          <Dashboard />
        </div>
      </div>
    );
  }
}

function toggleVisibilityForWindow(element) {
  if (element === 'action') {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('action').style.display = 'flex';
  } else if (element === 'dashboard') {
    document.getElementById('action').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
  }
}
