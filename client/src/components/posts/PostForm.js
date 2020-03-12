import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { Link, withRouter } from 'react-router-dom';

const PostForm = ({ addPost, history }) => {
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        tags: '',
        location: ''
    });

    const {
        title,
        text,
        tags,
        location
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addPost(formData, history)
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
