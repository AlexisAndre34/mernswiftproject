import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest}) => {
    <Route {...}/>
}

PrivateRoute.propTypes = {

}
//Course 44
//have to modify this with isAdmin to allow visiting admin page
const mapStateToProps = state  => ({
    auth: PropTypes.object.isRequired
});

export default connectt(mapStateToProps)(PrivateRoute);
