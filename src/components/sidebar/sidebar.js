import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/auth'

import './sidebar.css'

const Sidebar = ({auth, logout}) => {
  return (
            
            <div className="col-md-4 m-3">
                <div className="profile-sidebar">
                    <div className="profile-userpic ">
                        <img src={auth.user.avatarUrl} style={{width: '100px'}} className="img-responsive" alt="" />
                    </div>
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name">
                            {auth.user.username}
                        </div>
                    </div>
                    <div className="profile-userbuttons">
                        <Link type="button" to="/terminals" className="btn btn-dark btn-block">Terminals</Link>
                        <Link type="button" to="/buyers" className="btn btn-dark btn-block">Buyers</Link>
                        <button type="button" onClick={() => logout()} className="btn btn-dark btn-block">Log out</button>
                    </div>
                    <div className="profile-sidebar-footer">
                        <div className="profile-sidebar-footer-title">
                            Copyright © 2020
                        </div>
                    </div>
                </div>
            </div>
       
  )
};

Sidebar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { logout })(Sidebar)
