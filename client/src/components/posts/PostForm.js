import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { Link, withRouter } from 'react-router-dom';
import storage from '../../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { setAlert } from '../../actions/alert';

const PostForm = ({ addPost, history }) => {
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        tags: '',
        location: '',
        imagePost: ''
    });

    const {
        title,
        text,
        tags,
        location,
        imagePost
    } = formData;

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addPost(formData, history)
    }

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
            setFormData({...formData, imagePost: urldownload});
            setUrl(urldownload);
            console.log(urldownload)
        } else {
            setAlert('Veuillez choisir une image');
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
            Créer un poste
            </h1>
            <small>* = required field</small>
            <form className="form" onSubmit={(e => onSubmit(e))}>
                <div className="form-group">
                    <input type="text" placeholder="title" name="title" value={title} onChange={e => onChange(e)} />
                    <small className="form-text">Titre de votre poste.</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="text" name="text" value={text} onChange={e => onChange(e)} />
                    <small className="form-text">Que vous est-il arrivé ?</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="tags" name="tags" value={tags} onChange={e => onChange(e)} />
                    <small className="form-text">S'il vous plaît, utilisé des virgules pour séparer les tags.</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* location" name="location" value={location} onChange={e => onChange(e)} />
                    <small className="form-text">Où est ce que cela c'est produit ?</small>
                </div>
                <div>
                    <input type="file" onChange={handChange} />{' '}
                    <button type="button" className="btn btn-primary" onClick={handleUpdate} >Button</button>
                </div>
                { url ? <img src={imagePost} /> : <p>choisir une image de profile</p>}

                
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}
export default connect(null, { addPost })(withRouter(PostForm));
