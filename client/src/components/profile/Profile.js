import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import { getPosts, getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import { deleteAccount } from '../../actions/profile';


const Profile = ({ getProfileById, deleteAccount, profile: { profile, loading }, auth, match, getPosts, post: { posts } }) => {
    useEffect(() => {
        getProfileById(match.params.id);
        getPosts();
    }, [getProfileById, match.params.id, getPosts, deleteAccount]);
    return (
        <Fragment>
            { profile === null || loading ? <Spinner /> : <Fragment>
                    
                    <Link to='/posts' className='btn btn-light'>
                        Retour aux posts
                    </Link>
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                    </div>
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => deleteAccount()}>
                            <i className="fas fa-user-minus"></i>
                        </button>
                    </div>
                    <p className="lead my-2"> Ses posts :</p>
                    {posts.map(post => (post.user === profile.user._id) ?
                            <PostItem key={post._id} post={post} /> :
                            <p></p>
                    )}
                </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {

}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps, { getProfileById, getPosts, deleteAccount})(Profile);
