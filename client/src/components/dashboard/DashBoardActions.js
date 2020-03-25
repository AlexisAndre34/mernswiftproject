import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


const DashBoardActions = props => {
    return (
        <Fragment>
            <div className="dash-buttons">
                <Link to='/edit-profile' className="btn btn-light">
                <i className="fas fa-user-circle text-primary" />
                Modifier Profile
                </Link>

            </div>
            <div className="dash-buttons">
                <Link to='/edit-password' className="btn btn-light">
                <i className="fas fa-unlock-alt"></i>
                Modifier mot de passe
                </Link>
            </div>
        </Fragment>

    
        
    )
}



export default DashBoardActions
