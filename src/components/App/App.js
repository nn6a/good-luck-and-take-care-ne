import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {injectGlobal} from 'styled-components'

import HomePage from '../pages/HomePage/HomePage'
import ComposePage from '../pages/ComposePage/ComposePage'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`;

const App = () => {
    return (
        <Switch>
            <Route path="/" component={HomePage} exact/>
            <Route path="/compose" component={ComposePage}/>
            <Route component={HomePage}/>
        </Switch>
    )
};

export default App
