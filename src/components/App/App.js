import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {injectGlobal} from 'styled-components'
import firebase from 'firebase'

import HomePage from '../pages/HomePage/HomePage'
import ComposePage from '../pages/ComposePage/ComposePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import SettingPage from '../pages/SettingPage/SettingPage'
import SelectAvatarPage from '../pages/SelectAvatarPage/SelectAvatarPage'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`;

const PublicRoute = ({component: Component, isAuthenticated, ...rest}) => (
        <Route
            {...rest}
            render={(props) => isAuthenticated === false
                ? <Component {...props} />
                : <Redirect to='/' />}
        />
);

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route
        {...rest}
        render={(props) => isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        }
    />
);

class App extends Component {
    constructor () {
        super();
        this.state = {
            isAuthenticated: false
        };
    }

    componentDidMount () {
        this.removeListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    isAuthenticated: true
                })
            } else {
                this.setState({
                    isAuthenticated: false
                })
            }
        })
    }
    componentWillUnmount () {
        this.removeListener()
    }

    render() {
        return (
            <Switch>
                <Route path="/" component={HomePage} exact/>
                <PublicRoute isAuthenticated={this.state.isAuthenticated} path="/login" component={LoginPage}/>
                <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/setting" component={SettingPage}/>
                <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/compose" component={ComposePage}/>
                <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/avatar" component={SelectAvatarPage}/>
                <Route component={HomePage}/>
            </Switch>
        )
    }
}

export default App
