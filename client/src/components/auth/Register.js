import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import storage from '../../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';



const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        pseudo: '',
        email: '',
        password: '',
        password2: '',
        avatar: ''

    });

    const {pseudo, email, password, password2, avatar} = formData;
    
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    


    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('les mots de passe ne correspondent pas', 'danger');
        }
        else {
            register({ pseudo, email, password, avatar });
        }
    };

    const handChange = e => {
        const file = e.target.files[0];
        if(file) {
            const fileType = file["type"]
            const validImageTypes=["image/jpeg","image/png"]
            if (validImageTypes.includes(fileType)) {
                setImage(file);

            } else {
                setAlert('Veuillez choisir une image', 'danger');
            }
        }
    }

    const handleUpdate = async () => {
        if(image) {
            const metadata = {contentType: 'image/jpeg'}
            const imageName = uuidv4() + 'jpeg';
            const imageRef = storage.ref(`images/${imageName}`);
            const uploadTask = await imageRef.put(image, metadata);
            const urldownload = await imageRef.getDownloadURL().catch((error) => console.log(error));
            setFormData({...formData, avatar: urldownload});
            setUrl(urldownload);
        } else {
            setAlert('Veuillez choisir une image');
        }
    }

    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Créer votre compte</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    name="pseudo" 
                    value={pseudo} 
                    onChange={e => onChange(e)}
                    //required 
                />    
                </div>
                <div className="form-group">
                <input 
                    type="email"
                    placeholder="Adresse Email" 
                    name="email"
                    value={email} 
                    onChange={e => onChange(e)}
                    //required 
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    value={password} 
                    onChange={e => onChange(e)}
                    //minLength="6"
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirmer mot de passe"
                    name="password2"
                    value={password2} 
                    onChange={e => onChange(e)}
                    //minLength="6"
                />
                </div>
                <Fragment>
                    <div>
                    <input type="file" onChange={handChange} />{' '}
                    <button type="button" className="btn btn-primary" onClick={handleUpdate} >valider image</button>
                    </div>
                    { url ? <img src={avatar} /> : <p>choisir une image de profile</p>}
                </Fragment>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Vous avez déjà un compte ? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
