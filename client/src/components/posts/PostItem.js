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
    post: {_id, user, title, text, pseudo, avatar, imagePost, date, tags, location, likes, comments, reports},
    showActions
}) => (
    <div className="post bg-white p-1 my-1">
        <div>
        <h4>{pseudo}</h4>
        <img className='round-img' src={avatar} alt='' />
        <Link to={`/profile/${user}`} className='btn btn-primary'>
          Voir le Profile
        </Link>
        </div>
        <div>
        <h4 className="my-1">{title}</h4>
        <div>
        <p className="my-1">
            {text}
        </p>
        {imagePost !== "" ? <div id="imagePost"><img src={imagePost} /></div> : "" }
        </div>
        
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
        {auth.isAuthenticated === true && likes.filter(like  => like.user === auth.user._id).length > 0 ? (
        <button onClick={e => removeLike(_id)} type="button" className="btn btn-light">
        <i class="fas fa-assistive-listening-systems"></i>{' '}
        <span>{likes.length}</span>
        </button> ) : (
        <button onClick={e => addLike(_id)} type="button" className="btn btn-light">
        <i className="fas fa-assistive-listening-systems"></i>{' '}
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
        {auth.user !== null && !auth.loading && (user === auth.user._id || auth.user.isAdmin === true) && (
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
