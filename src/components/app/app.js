import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

import Login from '../auth/login';
import Sidebar from '../sidebar/sidebar';
import Terminals from '../terminals/terminals';
import Buyers from '../buyers/buyers';
import BuyerInfo from '../buyers/buyer-info';
import NotFound from '../not-found/not-found'


import './app.css';
import { connect } from 'react-redux';


const App = ({auth}) => {
  if(auth.user === null) {
    return (
      <Switch>
        <Route path="/" component={ Login } exact/>
        <Route path="/404" component={NotFound}/>
        <Route render={() => <NotFound />}/>
      </Switch>
    )
  }
  return (
    <Switch>
      <div className="container">
        <div className="row">
          <Sidebar />
          <Route path="/terminals" component={Terminals} exact/>
          <Route path="/buyers/:id" component={BuyerInfo} exact/>
          <Route path="/404" component={NotFound}/>
        </div>
          <Route path="/buyers" component={Buyers} exact/> 
      </div>
      <Redirect to="/404"/>
    </Switch>
  )
};

App.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps)(App);
