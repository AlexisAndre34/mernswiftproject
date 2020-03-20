import React from 'react';
import { Link } from 'react-router-dom';

const DashBoardActions = props => {
    return (
        <div className="dash-buttons">
            <Link to='/edit-profile' className="btn btn-light">
            <i className="fas fa-user-circle text-primary" />
            Modifier Profile
            </Link>

        </div>
    )
}



export default DashBoardActions