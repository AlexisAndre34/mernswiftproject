import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost, addReport, removeReport } from '../../actions/post';

const PostItem = ({
    auth,
    addLike,
    removeLike,
    deletePost,
    addReport,
    removeReport,
    post: {_id, user, title, text, pseudo, date, tags, location, likes, comments, reports},
    showActions
}) => (
    <div className="post bg-white p-1 my-1">
        <div>
        {/*
        <a href="profile.html">
            <img
            className="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
            />
            <h4>John Doe</h4>
        </a>
        */}
        <h4>{pseudo}</h4>
        </div>
        <div>
        <h4 className="my-1">{title}</h4>
        <p className="my-1">
            {text}
        </p>
        <p className="post-location">
            <i className="far fa-compass"></i>{' '}
            {location}
        </p>
        <ul className="tags">
            {tags && tags.length>0 && tags.map(tag =>
            <li key={tag}>{tag}</li>
                )}
        </ul>
        <p className="post-date">
            Publié le <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        {/* auth.isAuthenticatd may be speareted */}
        {showActions && <Fragment>
        {auth.isAuthenticated && likes.filter(like  => like.user === auth.user._id).length > 0 ? (
        <button onClick={e => removeLike(_id)} type="button" className="btn btn-light">
        <i className="fas fa-thumbs-up"></i>{' '}
        <span>{likes.length}</span>
        </button> ) : (
        <button onClick={e => addLike(_id)} type="button" className="btn btn-light">
        <i className="fas fa-thumbs-up"></i>{' '}
        <span>{likes.length}</span>
        </button>
        )}
        {auth.isAuthenticated && reports.filter(report  => report.user === auth.user._id).length > 0 ? (
        <button onClick={e => removeReport(_id)} type="button" className="btn btn-light">
        <i className="fas fa-exclamation"></i>{' '}
        <span>{reports.length}</span>
        </button> ) : (
        <button onClick={e => addReport(_id)} type="button" className="btn btn-light">
        <i className="fas fa-exclamation"></i>{' '}
        <span>{reports.length}</span>
        </button>
        )}
        <Link to={`/posts/${_id}`} className="btn btn-primary">
            Réponses <span className='comment-count'>{comments.length}</span>
        </Link>
        {!auth.loading && user === auth.user._id && (
            <button onClick={e => deletePost(_id)}     
            type="button"
            className="btn btn-danger"
            >
            <i className="fas fa-times"></i>
            </button>
        )}
        </Fragment>}
        
        
        </div>
    </div>
);

PostItem.defaultProps = {
    showActions: true
}
PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    addReport: PropTypes.func.isRequired,
    removeReport: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost, addReport, removeReport })(PostItem);
