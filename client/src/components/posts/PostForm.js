import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
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

    return (
        <Fragment>
            <h1>test</h1>
        </Fragment>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}
export default connect(null, { addPost })(PostForm);
