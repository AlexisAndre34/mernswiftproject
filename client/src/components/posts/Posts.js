import React, { Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import CommentItem from '../post/CommentItem';

const Posts = ({ getPosts, post: { posts, loading }, auth: {auth, user} }) => {

    const [filter, toggleFilter] = useState('0');

    useEffect(() => {
        getPosts();
    }, [getPosts, filter]);

    const normalFilter = (
        <div>
            <button value={0} onClick={e => toggleFilter(e.target.value)} className="btn btn-dark">
                Post les plus récents
            </button>
            <button value={1} onClick={e => toggleFilter(e.target.value)} className="btn btn-dark">
                Post les plus aimés
            </button>
        </div>
    )

    const adminFilter = (
        <div>
            <button value={2} onClick={e => toggleFilter(e.target.value)} className="btn btn-danger">
                Post reportés
            </button>
            <button value={3} onClick={e => toggleFilter(e.target.value)} className="btn btn-danger">
                Commentaires reportés
            </button>
        </div>
    )

    
    return loading ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
            <i className="fas fa-user"></i>Bienvenue sur NOTRESITE
        </p>
        <Link to={'/post/create'} className="btn btn-primary my-2">
            Nouveau poste
        </Link>
        { (<Fragment>{ user !== null && user.isAdmin ? adminFilter : normalFilter }</Fragment>) }

        { filter === '2' && <Fragment >
                {posts.sort((a,b) => (a.reports < b.reports) ? 1 : -1).map(post => (
                <PostItem key={post._id} post={post} />
            ))}
            </Fragment> 
        }

        { filter === '1' && <Fragment >
                {posts.sort((a,b) => (a.likes < b.likes) ? 1 : -1).map(post => (
                <PostItem key={post._id} post={post} />
            ))}
            </Fragment> 
        }

        { filter === '0' && <Fragment >
                {posts.map(post => (
                <PostItem key={post._id} post={post} />
            ))} </Fragment>
        }

        { filter === '3' && <Fragment >
                {posts.map(post => (
                post.comments.sort((a,b) => (a.reports < b.reports) ? 1 : -1).map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))
            ).sort((a,b) => (a < b)))}
            </Fragment> 
        }
        
    </Fragment>
}




Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, { getPosts })(Posts);
