import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/post';

const PostItem = ({
    auth,
    addLike,
    removeLike,
    post: {_id, user, title, text, pseudo, date, tags,likes, comments, reports}
}) => (
    <div class="post bg-white p-1 my-1">
        <div>
        {/*
        <a href="profile.html">
            <img
            class="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
            />
            <h4>John Doe</h4>
        </a>
        */}
        <h4>{pseudo}</h4>
        </div>
        <div>
        <h4 class="my-1">{title}</h4>
        <p class="my-1">
            {text}
        </p>
            <p class="post-date">
            Publié le <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        <button type="button" class="btn btn-light">
            <i class="fas fa-thumbs-up"></i>{' '}
            <span>{likes.length}</span>
        </button>
        <button type="button" class="btn btn-light">
            <i class="fas fa-thumbs-down"></i>{' '}
        </button>
        <Link to={`/post/${_id}`} class="btn btn-primary">
            Réponses <span class='comment-count'>{comments.length}</span>
        </Link>
        {!auth.loading && user.id === auth.user_id && (
            <button      
            type="button"
            class="btn btn-danger"
            >
            <i class="fas fa-times"></i>
            </button>
        )}
        
        </div>
    </div>
)
PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
