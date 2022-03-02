import React from 'react';
import Nav from './Nav.js';
import '../Styles/Profile.css';

import { useNavigate } from 'react-router';

function Profile() {

    let navigate = useNavigate();
    const onLogout = event => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div>
            <Nav />
            <div className="nothing"></div>
            My Profile
            <div className="logout" onClick={onLogout}>Logout</div>
        </div>
    );
}

export default Profile;