import React from 'react';

import AppStatus from './appstatus.js';
import Entities from './entitiesWidget.js';
import Intents from './intentsWidget.js';
import LabelledUterrances from './labelledUtterancesWidget.js';
import ListEntities from './listEntitiesWidget.js';
import Pie from './pie.js';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div id='dashboard' className='dashboard'>
        <div id='summary'>
          <div className='summary-row'>
            <AppStatus />
          </div>
          <div className='summary-row'>
            <Intents />
            <Entities />
            <ListEntities />
            <LabelledUterrances />
          </div>
        </div>
        <Pie />
      </div>
    );
  }
}
