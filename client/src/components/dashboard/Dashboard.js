import React, { useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashBoardActions from './DashBoardActions';
import { getPosts } from '../../actions/post';
import PostItem from '../posts/PostItem';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading}, getPosts, post: { posts } }) => {
    useEffect(() => {
        getCurrentProfile();
        getPosts();
    }, [getCurrentProfile, getPosts]);
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Mon profile</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Bienvenue {user && user.pseudo }
        </p>
        {profile !== null ? (
        <Fragment>
            <DashBoardActions />
            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i>
                </button>
            </div>
            <p className="lead my-2">Description :</p>
            <p className="m-1">{profile.bio}</p>
            <p className="lead my-2">Mes posts :</p>

            {posts.map(post => (post.user === user._id) ?
                    <PostItem key={post._id} post={post} /> :
                    <p></p>

            )}

        </Fragment>
         ) : ( 
         <Fragment>
             <p>Votre profile n'a pas encore été créé, veuillez ajouter vos informations.</p>
            <Link to='/create-profile' className="btn btn-primary my-1">
                Créer Profile
            </Link>
         </Fragment> 
         )} 
        </Fragment>
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, getPosts })(Dashboard);
