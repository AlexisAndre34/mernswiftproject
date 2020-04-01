import React from 'react';
import PropTypes from 'prop-types';


export const ProfileTop = ({profile: { bio, user:{ pseudo, avatar } }}) => {
    return (
        <div class="profile-top bg-primary p-2">
        <img className='round-img' src={avatar} alt='' />
          <h1 class="large">{pseudo}</h1>
          <p class="lead">{bio}</p>
        </div>
    )
}

ProfileTop.prototypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop;