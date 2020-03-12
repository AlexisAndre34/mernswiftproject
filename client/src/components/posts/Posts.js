import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

const Posts = ({ getPosts, post: { posts, loading }, check }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    
    return loading ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
            <i className="fas fa-user"></i>Bienvenue sur NOTRESITE
        </p>
        <Link to={'/post/create'} className="btn btn-primary">
            Nouveau poste
        </Link>
        <button onClick={() => this.setState({check: false})}>
            Post les plus récents
        </button>
        <button onClick={() => this.setState({check: true})}>
            Post les plus aimés
        </button>

        
        <div className="posts">
            {check ? ( <Fragment>
                {posts.sort((a,b) => (a.likes < b.likes) ? 1 : -1).map(post => (
                <PostItem key={post._id} post={post} />
            ))}
            </Fragment>
            ) : ( <Fragment>
                {posts.map(post => (
                <PostItem key={post._id} post={post} />
            ))} </Fragment>
            )
            }
        </div>
    </Fragment>
}


Posts.defaultProps = {
    check: false
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);
