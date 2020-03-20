import React, { useState, Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';


const EditProfile = ({ profile: { profile, loading },createProfile, getCurrentProfile, history }) => {
    const [formData, setFormData] = useState({
        bio: ''
    });

    useEffect(() => {
        if(!profile) getCurrentProfile();
        setFormData({
            bio: loading || !profile.bio ? '' : profile.bio
        });

    }, [loading, getCurrentProfile, profile]);

    const { bio } = formData;
    
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
            Créer votre Profile
            </h1>
            <form className="form" onSubmit={(e => onSubmit(e))}>
                <div className="form-group">
                    <input type="text" placeholder="bio" name="bio" value={bio} onChange={e => onChange(e)} />
                    <small className="form-text">Ajouter une description</small>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to='/dashboard'>Retour</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});


export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
