import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''

    });

    const { email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }

    if(isAuthenticated) {
        return <Redirect to='/posts' />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Connecter-vous</h1>
            <p className="lead"><i className="fas fa-user"></i> Connecter-vous à votre compte</p>
            <form className="form" onSubmit={e => onSubmit(e)}>  
                <div className="form-group">
                <input 
                    type="email"
                    placeholder="Adresse Email" 
                    name="email"
                    value={email} 
                    onChange={e => onChange(e)}
                    required 
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Mot De Passe"
                    name="password"
                    value={password} 
                    onChange={e => onChange(e)}
                    minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Vous n'avez pas de compte ? <Link to="Register">Sign up</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
