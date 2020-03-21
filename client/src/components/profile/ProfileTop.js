import React from 'react';
import PropTypes from 'prop-types';


export const ProfileTop = ({profile: { bio, user:{ pseudo } }}) => {
    return (
        <div class="profile-top bg-primary p-2">
        {/* 
          <img
            class="round-img my-1"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          /> */}
          <h1 class="large">{pseudo}</h1>
          <p class="lead">{bio}</p>
        </div>
    )
}

ProfileTop.prototypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop;