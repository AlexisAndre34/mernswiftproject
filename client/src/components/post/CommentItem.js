import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { addLikeComment, removeLikeComment, deleteComment, addReportComment, removeReportComment } from '../../actions/post';


const CommentItem = ({
    postId,
    comment: {_id, text, pseudo, user, avatar, date, likes, reports},
    auth,
    addLikeComment,
    removeLikeComment,
    deleteComment,
    addReportComment,
    removeReportComment
}) => (
        <div className="post bg-white p-1 my-1">
         
          <div>
          <img className='round-img' src={avatar} alt='' />
            <h4>{pseudo}</h4>
          </div>
         
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Publié le <Moment format='DD/MM/YYYY'>{date}</Moment>
            </p>
          </div>
          
          {auth.isAuthenticated && likes.filter(like  => like.user === auth.user._id).length > 0 ? (
            <button onClick={e => removeLikeComment(postId, _id)} type="button" className="btn btn-light">
                <i className="fas fa-thumbs-up"></i>{' '}
                <span>{likes.length}</span>
            </button> ) : (
            <button onClick={e => addLikeComment(postId, _id)} type="button" className="btn btn-light">
                <i className="fas fa-thumbs-up"></i>{' '}
                <span>{likes.length}</span>
            </button>
            )}
            {auth.isAuthenticated && reports.filter(report  => report.user === auth.user._id).length > 0 ? (
            <button onClick={e => removeReportComment(postId, _id)} type="button" className="btn btn-light">
            <i className="fas fa-exclamation"></i>{' '}
            <span>{reports.length}</span>
            </button> ) : (
            <button onClick={e => addReportComment(postId, _id)} type="button" className="btn btn-light">
            <i className="fas fa-exclamation"></i>{' '}
            <span>{reports.length}</span>
            </button>
            )}
          
          {auth.isAuthenticated && !auth.loading && user === auth.user._id && (
          <button
          onClick={() => deleteComment(postId, _id)}
          type='button'
          className='btn btn-danger'
          >
          <i className='fas fa-times' />
          </button>
          )}
            
        </div>
        
    );


CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLikeComment: PropTypes.func.isRequired,
    removeLikeComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    addReportComment: PropTypes.func.isRequired,
    removeReportComment: PropTypes.func.isRequired

}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addLikeComment, removeLikeComment, deleteComment, addReportComment, removeReportComment })(CommentItem);
