import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updatePassword } from '../../actions/profile';
import { setAlert } from '../../actions/alert';

const EditPassword = ({ auth, updatePassword }) => {
    const [formData, setFormData] = useState({
        oldpassword: '',
        password: '',
        password2: ''
    });

    const { oldpassword, password, password2 } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if((password !== password2) && (oldpassword === auth.user.password)) {
            setAlert('les mots de passe ne correspondent pas', 'danger');
        }
        else {
            console.log('true')
            console.log(password)
            updatePassword(password);
        }
    };



    return (
        <Fragment>
            <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="mot de passe actuel"
                    name="oldpassword"
                    value={oldpassword} 
                    onChange={e => onChange(e)}
                    //minLength="6"
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="nouveau mot de passe"
                    name="password"
                    value={password} 
                    onChange={e => onChange(e)}
                    //minLength="6"
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="confirmer nouveau mot de passe"
                    name="password2"
                    value={password2} 
                    onChange={e => onChange(e)}
                    //minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to='/dashboard'>Retour</Link>
            </form>
        </Fragment>
    )
}

EditPassword.propTypes = {
    auth: PropTypes.object.isRequired,
    updatePassword: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    
    auth: state.auth
});

export default connect(mapStateToProps, { updatePassword })(EditPassword);
