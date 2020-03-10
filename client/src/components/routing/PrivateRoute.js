import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
    <Route {...rest} render={props =>
        !isAuthenticated && !loading ? (
        <Redirect to='/login' />
        ) : (
        <Component {...props} />
        )
    } />
)
PrivateRoute.propTypes = {
    auth: PropTypes.func.isRequired
}
//Course 44
//have to modify this with isAdmin to allow visiting admin page
const mapStateToProps = state => ({
    auth: PropTypes.object.isRequired
});

export default connect(mapStateToProps)(PrivateRoute);
