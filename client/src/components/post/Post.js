import React, { Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import { Link } from 'react-router-dom';
import CommentItem from '../post/CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {

    const [filter, toggleFilter] = useState('0');

    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id, filter]);

    return loading || post === null ? ( <Spinner /> ) : ( <Fragment>
        <Link to='/posts' className='btn'>
            Retour au posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <button value={0} onClick={e => toggleFilter(e.target.value)} className="btn btn-dark">
            Commentaires les plus récents
        </button>
        <button value={1} onClick={e => toggleFilter(e.target.value)} className="btn btn-dark">
            Commentaires les plus aimés
        </button>
        {
            filter === '0' && <div className="comments">
            {post.comments && post.comments.length > 0 && post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
            </div>
        }
        {
            filter === '1' && <div className="comments">
            {post.comments && post.comments.length > 0 && post.comments.sort((a,b) => (a.likes < b.likes) ? 1 : -1).map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
            </div>
        }
        
    </Fragment>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
